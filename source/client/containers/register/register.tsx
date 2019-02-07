import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

// Import dynamically rendered Form
import Form from '../../components/form';

// Imports for Actions and Types
import * as Actions from './registerActions';
import * as Types from './registerTypes';

// Imports for Application State (based on the reducer)
import { MainState } from '../../reducers';
import { RegisterState } from './registerReducer';

// Import constants for Register
import { RegisterFields } from '../../components/constants';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';

// Interface for what we want to pass as props from the parent component
interface ParentProps extends RouteComponentProps<{}> {}

// Combined Props Type for Register Compoinent (Dispatch and State)
export type RegisterProps = Actions.DispatchProps & ParentProps & RegisterState;

class Register extends React.Component<RegisterProps> {
    constructor(props: RegisterProps) {
        super(props);
        this.submitRegistration = this.submitRegistration.bind(this);
        this.logThis = this.logThis.bind(this);
    }

    componentDidMount() {
        this.props.initializeRegister();
    }

    logThis() {
        console.log(this);
    }

    submitRegistration(registrationInfo: Types.RegisterInformation) {
        this.props.testRegister(registrationInfo);
    }

    render() {
        return (
            <React.Fragment>
                <h1>Register!</h1>
                <Form
                    fields={RegisterFields}
                    submitMethod={this.submitRegistration}
                />
                <button onClick={this.logThis}>Log Register.</button>
            </React.Fragment>
        );
    }
}

// This gives the component access to the store (state)
const mapStateToProps = (state: MainState) => {
    return {
        ...state.register
    };
};

// This gives the component access to dispatch / the actions
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): Actions.DispatchProps => {
    return bindActionCreators({
        initializeRegister: Actions.initializeRegister,
        registerFail: Actions.registerFail,
        registerSuccess: Actions.registerSuccess,
        testRegister: Actions.testRegister,
        attemptRegister: Actions.attemptRegister
    }, dispatch);
};

// This method wraps the component with the store and dispatch!!!
export default connect<any, Actions.DispatchProps, any, MainState>(mapStateToProps, mapDispatchToProps)(Register);

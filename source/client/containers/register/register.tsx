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

interface StateProps extends RouteComponentProps<{}> {
    // What we want to add to the state!
}

// Interface for Dispatchable Methods (they invoke the store!)
interface DispatchProps {
    initializeRegister: () => void,
    attemptRegister: (loginInformation: Types.RegisterInformation) => void;
    registerFail: (username: Types.RegisterUsername) => void;
    registerSuccess: (username: Types.RegisterUsername) => void;
    testRegister: (registerInformation: Types.RegisterInformation) => void;
}

type RegisterProps = DispatchProps & StateProps;

class Register extends React.Component<RegisterProps, RegisterState> {
    constructor(props: RegisterProps) {
        super(props);
        this.submitRegistration = this.submitRegistration.bind(this);
    }

    componentDidMount() {
        this.props.initializeRegister();
    }

    submitRegistration(registrationInfo: Types.RegisterInformation) {
        this.props.testRegister(registrationInfo);
    }

    render() {
        return (
            <React.Fragment>
                <h1>Register!</h1>
                <Form fields={RegisterFields} submitMethod={this.submitRegistration}/>
            </React.Fragment>
        );
    }
}

// This gives the component access to the store (state)
const mapStateToProps = (state: MainState) => {
    return {
        storeState: state.register
    };
};

// This gives the component access to dispatch / the actions
const mapDispatchToProps = (dispatch: React.Dispatch<any>) => {
    return {
        initializeRegister: () => { dispatch(Actions.initializeRegister()); },
        registerFail: (username: Types.RegisterUsername) => { dispatch(Actions.registerFail(username)); },
        registerSuccess: (username: Types.RegisterUsername) => { dispatch(Actions.registerSuccess(username)); },
        attemptRegister: (regInfo: Types.RegisterInformation) => { dispatch(Actions.attemptRegister(regInfo)); },
        testRegister: (registerInfo: Types.RegisterInformation) => { dispatch(Actions.testRegister(registerInfo)); }
    };
};

// This method wraps the component with the store and dispatch!!!
export default connect(mapStateToProps, mapDispatchToProps)(Register);

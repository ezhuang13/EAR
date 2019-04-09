import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Link } from 'react-router-dom';

// Import shared components
import Form from '../../components/form';
import * as Schemas from '../../utility/schemas';
import { ModalNotify } from '../../utility/shared';

// Imports for Actions and Types
import * as Actions from './registerActions';
import * as Types from './registerTypes';

// Imports for Application State (based on the reducer)
import { MainState } from '../../reducers';
import { RegisterState } from './registerReducer';

// Import constants for Register
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';

// Interface for what we want to pass as props from the parent component
interface ParentProps extends RouteComponentProps<{}> {}

// Combined Props Type for Register Compoinent (Dispatch and State)
export type RegisterProps = Actions.DispatchProps & ParentProps & RegisterState;

class Register extends React.Component<RegisterProps> {
    constructor(props: RegisterProps) {
        super(props);

        this.onAcceptRegister = this.onAcceptRegister.bind(this);
        this.submitRegistration = this.submitRegistration.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem('user') !== null) {
            this.props.history.push(`/projects/${localStorage.getItem('user')}`);
        }
        else {
            this.props.initializeRegister();
        }
    }

    onAcceptRegister() {
        this.props.history.push('/login');
    }

    submitRegistration(registrationInfo: Types.RegisterInformation) {
        const validResult = Schemas.performValidation(registrationInfo, 'Register');
        if (validResult.error === null) {
            // No error, thus login information passed client-side validation!
            // Allow login fetch to actually happen...
            this.props.performRegister(registrationInfo);
        } else {
            // Login failed! Dispatch loginFail, find correct error therein!
            this.props.registerFail(validResult.mappedError);
        }
    }

    render() {
        return (
            <React.Fragment>
                <h1>Register!</h1>
                <Link to={'/login'}>Login</Link>
                <Form
                    type='Register'
                    submitMethod={this.submitRegistration}
                />
                {this.props.notify ? (
                <ModalNotify
                    msg={this.props.notify}
                    onAccept={this.onAcceptRegister}
                />
                ) : null}
            </React.Fragment>
        );
    }
}

// This gives the component access to the store (state)
const mapStateToProps = (state: MainState) => {
    return {
        registerError: state.register.registerError,
        notify: state.register.notify,
    };
};

// This gives the component access to dispatch / the actions
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): Actions.DispatchProps => {
    return bindActionCreators({
        performRegister: Actions.performRegister,
        registerFail: Actions.registerFail,
        initializeRegister: Actions.initializeRegister,
    }, dispatch);
};

// This method wraps the component with the store and dispatch!!!
export default connect<any, Actions.DispatchProps, any, MainState>(mapStateToProps, mapDispatchToProps)(Register);

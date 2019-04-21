import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

// Import custom components
import Form from '../../components/form';
import {
    performValidation
} from '../../utility/schemas';

// Imports for Actions and Types
import {
    initializeLogin,
    performLogin,
    loginFail,
    DispatchProps as LoginDispatchProps
} from './loginActions';
import {
    setUser,
    DispatchProps as AppDispatchProps
} from '../app/appActions';
import * as Types from './loginTypes';

// Imports for Application State (based on the reducer)
import { MainState } from '../../reducers';
import { LoginProps } from './loginReducer';
import { AppProps } from '../app/appReducer';

// Import constants for Login
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';

// shared parts
import { StyledPlainPaper, ModalNotify, SharedWithStyles, formStyles } from '../../utility/shared';


// Interface for what we want to pass as props from the parent component
interface ParentProps extends RouteComponentProps<{}> {}

// Combined Props Type for Register Compoinent (Dispatch and State)
export type ComboProps = LoginDispatchProps & AppDispatchProps & ParentProps & LoginProps & AppProps;

class Login extends React.Component<ComboProps> {
    constructor(props: ComboProps) {
        super(props);

        this.onAcceptLogin = this.onAcceptLogin.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }

    componentDidMount() {
        this.props.initializeLogin();
    }

    onAcceptLogin() {
        this.props.setUser(this.props.attemptedUser);
        this.props.history.push(`/projects/${this.props.attemptedUser}`);
    }

    submitLogin(loginInformation: Types.LoginInformation) {
        // Validate result against Login Schema Joi
        const validationStuff = performValidation(loginInformation, 'Login');

        // Check the appropriate error codes and what not
        if (validationStuff.error === null) {
            // No error, thus login information passed client-side validation!
            // Allow login fetch to actually happen...
            this.props.performLogin(loginInformation);
        } else {
            // Login failed! Dispatch loginFail, find correct error therein!
            this.props.loginFail(validationStuff.mappedError);
        }
    }

    render() {
        return (
            <React.Fragment>
                    <StyledPlainPaper className={this.props.classes.paper}>
                        <Form
                            type='Login'
                            submitMethod={this.submitLogin}
                        />
                        {this.props.notify ? (
                        <ModalNotify
                            msg={this.props.notify}
                            onAccept={this.onAcceptLogin}
                        />
                        ) : null}
                    </StyledPlainPaper>
            </React.Fragment>
        );
    }
}

// This gives the component access to the store (state)
const mapStateToProps = (state: MainState) => {
    return {
        loginError: state.login.loginError,
        notify: state.login.notify,
        attemptedUser: state.login.attemptedUser,
    };
};

// This gives the component access to dispatch / the actions
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): LoginDispatchProps & AppDispatchProps => {
    return bindActionCreators({
        initializeLogin,
        performLogin,
        loginFail,
        setUser
    }, dispatch);
};

// This method wraps the component with the store and dispatch!!!
export default connect<any, LoginDispatchProps, any, MainState>(mapStateToProps,
    mapDispatchToProps)(SharedWithStyles()(formStyles)(Login));

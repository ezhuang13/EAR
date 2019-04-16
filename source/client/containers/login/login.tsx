import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Link } from 'react-router-dom';

// Import custom components
import Form from '../../components/form';
import * as Schemas from '../../utility/schemas';

// Imports for Actions and Types
import * as Actions from './loginActions';
import * as AppActions from '../app/appActions';
import * as Types from './loginTypes';

// Imports for Application State (based on the reducer)
import { MainState } from '../../reducers';
import { LoginState } from './loginReducer';
import { AppState } from '../app/appReducer';

// Import constants for Login
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

// Import styling-related components
import { StyledPaper, firstTheme, ModalNotify } from '../../utility/shared';

// Interface for what we want to pass as props from the parent component
interface ParentProps extends RouteComponentProps<{}> {}

// Combined Props Type for Register Compoinent (Dispatch and State)
export type LoginProps = Actions.DispatchProps & AppActions.DispatchProps & ParentProps & LoginState & AppState;

class Login extends React.Component<LoginProps> {
    constructor(props: LoginProps) {
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
        const validationStuff = Schemas.performValidation(loginInformation, 'Login');

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
                <MuiThemeProvider theme={firstTheme}>
                    <StyledPaper>
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
                    </StyledPaper>
                </MuiThemeProvider>
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
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): Actions.DispatchProps & AppActions.DispatchProps => {
    return bindActionCreators({
        initializeLogin: Actions.initializeLogin,
        performLogin: Actions.performLogin,
        loginFail: Actions.loginFail,
        setUser: AppActions.setUser
    }, dispatch);
};

// This method wraps the component with the store and dispatch!!!
export default connect<any, Actions.DispatchProps, any, MainState>(mapStateToProps, mapDispatchToProps)(Login);

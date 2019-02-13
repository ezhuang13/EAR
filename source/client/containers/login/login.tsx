import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

// Import dynamically rendered Form
import Form from '../../components/form';

// Imports for Actions and Types
import * as Actions from './loginActions';
import * as Types from './loginTypes';

// Imports for Application State (based on the reducer)
import { MainState } from '../../reducers';
import { LoginState } from './loginReducer';

// Import constants for Login
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';

// Interface for what we want to pass as props from the parent component
interface ParentProps extends RouteComponentProps<{}> {}

// Combined Props Type for Register Compoinent (Dispatch and State)
export type LoginProps = Actions.DispatchProps & ParentProps & LoginState;

class Login extends React.Component<LoginProps> {
    constructor(props: LoginProps) {
        super(props);
        this.submitLogin = this.submitLogin.bind(this);
        this.logThis = this.logThis.bind(this);
    }

    logThis() {
        console.log(this);
    }

    componentDidMount() {
        this.props.initializeLogin();
    }

    submitLogin(loginInformation: Types.LoginInformation) {

        // Attempt to login using dispatch!
        this.props.attemptLogin(loginInformation);

        return;
    }

    render() {
        return (
            <React.Fragment>
                <h1>Login Header!</h1>
                <Form
                    type='Login'
                    submitMethod={this.submitLogin}
                />
                <button onClick={this.logThis}>Click!</button>
            </React.Fragment>
        );
    }
}

// This gives the component access to the store (state)
const mapStateToProps = (state: MainState) => {
    return {
        ...state.login
    };
};

// This gives the component access to dispatch / the actions
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): Actions.DispatchProps => {
    return bindActionCreators({
        initializeLogin: Actions.initializeLogin,
        attemptLogin: Actions.attemptLogin
    }, dispatch);
};

// This method wraps the component with the store and dispatch!!!
export default connect<any, Actions.DispatchProps, any, MainState>(mapStateToProps, mapDispatchToProps)(Login);

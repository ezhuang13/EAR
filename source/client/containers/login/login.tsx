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
import { LoginFields } from '../../components/constants';
import { RouteComponentProps } from 'react-router';

// Interface for what we want to pass as props from the parent component
interface StateProps extends RouteComponentProps<{}> {}

// Interface for Dispatchable Methods (they invoke the store!)
interface DispatchProps {
    initializeLogin: () => void;
    attemptLogin: (loginInformation: Types.LoginInformation) => void;
    loginFail: (username: Types.LoginUsername) => void;
    loginSuccess: (username: Types.LoginUsername) => void;
    testLogin: (loginInformation: Types.LoginInformation) => void;
}

// Combined Props Type for Register Compoinent (Dispatch and State)
type LoginProps = DispatchProps & StateProps;

class Login extends React.Component<LoginProps, LoginState> {
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
        // this.props.attemptLogin(loginInformation);
        this.props.testLogin(loginInformation);
        return;
    }

    render() {
        return (
            <React.Fragment>
                <h1>Login Header!</h1>
                <Form
                    fields={LoginFields}
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
        storeState: state.login
    };
};

// This gives the component access to dispatch / the actions
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): DispatchProps => {
    return {
        initializeLogin: () => { dispatch(Actions.initializeLogin()); },
        loginFail: (username: Types.LoginUsername) => { dispatch(Actions.loginFail(username)); },
        loginSuccess: (username: Types.LoginUsername) => { dispatch(Actions.loginSuccess(username)); },
        attemptLogin: (loginInfo: Types.LoginInformation) => { dispatch(Actions.attemptLogin(loginInfo)); },
        testLogin: async (loginInfo: Types.LoginInformation) => { await dispatch(Actions.testLogin(loginInfo)); }
    };
};

// This method wraps the component with the store and dispatch!!!
export default connect(mapStateToProps, mapDispatchToProps)(Login);

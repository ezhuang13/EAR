import * as React from 'react';
import { Fragment, Component } from 'react';

import { connect } from 'react-redux';

import Form from '../../components/form';
import { Login_Fields } from '../../components/constants';

interface LoginProps {
    // Nothing in here yet!
};

interface LoginState {
    // Nothing in here yet!
}
class Login extends Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
        this.submitLogin = this.submitLogin.bind(this);
    }

    submitLogin(loginInformation: Object) {
        console.log(loginInformation);
        console.log("Submitting log in!");
        this.props.history.push('/homepage');
        return;
    }

    render() {
        return (
            <Fragment>
                <h1>Login Header!</h1>
                <Form 
                fields={Login_Fields}
                submitMethod={this.submitLogin}/>
            </Fragment>
        );
    }
}

// This method wraps the component with the store and dispatch!!!
export default Login;
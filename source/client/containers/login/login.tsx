import * as React from 'react';
import { Fragment, Component } from 'react';

import { connect } from 'react-redux';

import LoginForm from './login_form';

class Login extends Component<any, any> {
    constructor(props) {
        super(props);
        this.submitLogin = this.submitLogin.bind(this);
    }

    submitLogin(loginInformation: Object) {
        console.log(loginInformation);
        console.log("Submitting log in!");
        return;
    }

    render() {
        return (
            <Fragment>
            <h1>Login Header!</h1>
            <LoginForm submitLogin={this.submitLogin}/>
            </Fragment>
        );
    }
}


// This gives the component access to the store (state)
const mapStateToProps = state => {
    return {
        store: {
            ...state
        }
    };
}

// This gives the component access to dispatch / the actions
const mapDispatchToProps = dispatch => {
    return {
        initializeApplication: () => { dispatch(Actions.initializeApplication()); }
    }
}

// This method wraps the component with the store and dispatch!!!
export default connect(mapStateToProps, mapDispatchToProps)(Login);
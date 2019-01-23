import * as React from 'react';
import { Component } from 'react';

import {Input, Label} from '../../components/entry';

// Form Fields
interface LoginState {
    username: string;
    password: string;
};

interface LoginProps {
    submitLogin(event: any): void;
}

class LoginForm extends Component<LoginProps, LoginState> {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }

    submitLogin(event: any) {
        event.preventDefault();
        const loginInformation = JSON.parse(JSON.stringify(this.state));
        this.props.submitLogin(loginInformation);
    }

    handleChange(event: any) {
        // Obtain variables from event change
        const target = event.target;
        const value = target.value;
        const name = target.name;

        // Create the change object, set state
        let change = {};
        change[name] = value;
        this.setState(change);
    }

    render() {
        return (
            <form onSubmit={this.submitLogin}>
            <Label labelText={'Username: '}/>
               <Input
                    name="username"
                    type="text"
                    value={this.state.username}
                    onChange={this.handleChange}/>
               <br/>
               <Label labelText={'Password: '}/>
               <Input
                    name="password"
                    type="text"
                    value={this.state.password}
                    onChange={this.handleChange}/>
                <br/>
                <button>Submit!</button>
            </form>
        );
    }
}

export default LoginForm;
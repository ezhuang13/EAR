import * as React from 'react';
import { Component } from 'react';

import {Input, Label} from '../../components/entry';

// Form Fields
interface RegisterState {
    first_name: string;
    last_name: string;
    username: string;
    password: string;
    email: string;
}

// Prop fields
interface RegisterProps {
    submitRegistration(registrationInfo: Object): void;
}

class RegisterForm extends Component<RegisterProps, RegisterState> {
    constructor(props) {
        super(props);
        
        this.state = {
            first_name: "",
            last_name: "",
            username: "",
            password: "",
            email: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitRegistration = this.submitRegistration.bind(this);
    }

    handleChange(event) {
        // Obtain variables from event change
        const target = event.target;
        const value = target.value;
        const name = target.name;

        // Create the change object, set state
        let change = {};
        change[name] = value;
        this.setState(change);
    }

    submitRegistration(event: any) {
        event.preventDefault();
        const registrationInfo = JSON.parse(JSON.stringify(this.state));
        this.props.submitRegistration(registrationInfo);
    }

    render() {
        return (
               <form onSubmit={this.submitRegistration}>
               <Label labelText={'First Name: '}/>
               <Input
                    name="first_name"
                    type="text"
                    value={this.state.first_name}
                    onChange={this.handleChange}/>
               <br/>
               <Label labelText={'Last Name: '}/>
               <Input
                    name="last_name"
                    type="text"
                    value={this.state.last_name}
                    onChange={this.handleChange}/>
                <br/>   
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
                <Label labelText={'Email: '}/>
                <Input
                    name="email"
                    type="text"
                    value={this.state.email}
                    onChange={this.handleChange}/>
                <br/>
                    <input type="submit" value="Submit" />
              </form>
        )
    }
}

// This method wraps the component with the store and dispatch!!!
export default RegisterForm;
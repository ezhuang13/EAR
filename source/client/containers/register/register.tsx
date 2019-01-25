import * as React from 'react';
import { Fragment, Component } from 'react';

import { connect } from 'react-redux';

import Form from '../../components/form';
import { Register_Fields } from '../../components/constants';


class Register extends Component<any, any> {
    constructor(props) {
        super(props);
        this.submitRegistration = this.submitRegistration.bind(this);
    }

    submitRegistration(registrationInfo: any) {
        console.log(registrationInfo);
        /*
        fetch("/user/" + registrationInfo.username, {
            method: "POST",
            body: JSON.stringify(registrationInfo),
            credentials: "include",
            headers: {
              "content-type": "application/json"
            }
        });*/
    }

    render() {
        return (
            <Fragment>
                <h1>Register!</h1>
                <Form fields={Register_Fields} submitMethod={this.submitRegistration}/>
            </Fragment>
        )
    }
}

// This method wraps the component with the store and dispatch!!!
export default Register;
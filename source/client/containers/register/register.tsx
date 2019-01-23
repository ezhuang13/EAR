import * as React from 'react';
import { Fragment, Component } from 'react';

import { connect } from 'react-redux';

import RegisterForm from './register_form';


class Register extends Component<any, any> {
    constructor(props) {
        super(props);
        this.submitRegistration = this.submitRegistration.bind(this);
    }

    submitRegistration(registrationInfo: Object) {
        console.log(registrationInfo);
        console.log("Registration has been submitted!");
        return;
    }

    render() {
        return (
            <Fragment>
                <h1>Register!</h1>
                <RegisterForm submitRegistration={this.submitRegistration}/>
            </Fragment>
        )
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
export default connect(mapStateToProps, mapDispatchToProps)(Register);
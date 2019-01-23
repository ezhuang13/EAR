import * as React from 'react';
import { Fragment, Component } from 'react';

import * as Actions from './actions';
import { connect } from 'react-redux';

import RegisterForm from './registerForm';


class Register extends Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <h1>Register!</h1>
                <RegisterForm/>
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
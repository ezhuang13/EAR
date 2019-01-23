import * as React from 'react';
import { Fragment, Component } from 'react';

import * as Actions from './actions';
import { connect } from 'react-redux';


class Login extends Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <h1>Login Header!</h1>
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
export default connect(mapStateToProps, mapDispatchToProps)(Login);
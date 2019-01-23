import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router';
import { Fragment, Component } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

import * as Actions from './actions';
import { connect } from 'react-redux';

import Register from '../register/register';
import Login from '../login/login';

class Application extends Component<any, any> {
    constructor(props) {
        super(props);

        // Binding "this" object to the different methods
        this.logApp = this.logApp.bind(this);
    }

    logApp() {
        console.log(this);
    }

    componentDidMount() {
        return;
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                <Route exact path="/" render={props => (
                    <Fragment>
                        <h1>Ear</h1>
                        <Link to="/login">Login</Link>
                        <div></div>
                        <Link to="/register">Register</Link>
                    </Fragment>
                )}/>
                <Route path="/login" render={props => (
                    <Login/>
                )}/>
                <Route path="/register" render={props => (
                    <Register/>
                )}/>
                </Switch>
            </BrowserRouter>
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
export default connect(mapStateToProps, mapDispatchToProps)(Application);
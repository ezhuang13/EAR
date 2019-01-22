import * as React from 'react';
import { Fragment, Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import * as Actions from './actions';
import { connect } from 'react-redux';


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
                <Route path="/" render={props => (
                    <Fragment>
                        <h1>Header One!</h1>
                    </Fragment>
                )}/>
            </BrowserRouter>
        )
    }
}

/*
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
*/
export default Application;
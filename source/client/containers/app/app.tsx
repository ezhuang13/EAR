import * as React from 'react';
import { Route, Switch, RouteComponentProps } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';

// Imports for Actions and Types
import * as Actions from './appActions';
import * as Types from './appTypes';

// Imports for Application State (based on the reducer)
import { MainState } from '../../reducers';
import { AppState } from './appReducer';

// Importing the Smart components / Routes
import Register from '../register/register';
import Login from '../login/login';
import HomePage from '../homepage/homepage';

interface StateProps extends RouteComponentProps<{}> {
    // What we want to add to the state!
}

// This defines the typing for dispatching actions (in mapDispatchToProps).
interface DispatchProps {
    initializeApplication: () => void
}

// Combined Application Props Typing
type AppProps = DispatchProps & StateProps;

class Application extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        // Binding "this" object to the different methods
        this.logApp = this.logApp.bind(this);
        this.createIndex = this.createIndex.bind(this);
    }

    logApp() {
        console.log(this);
    }

    createIndex() {
        return (
            <React.Fragment>
                    <h1>Ear</h1>
                    <Link to='/login'>Login</Link>
                    <div/>
                    <Link to='/register'>Register</Link>
                    <button onClick={this.logApp}>Log this!</button>
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.props.initializeApplication();
        return;
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                <Route
                    exact={true}
                    path='/'
                    component={this.createIndex}
                />
                <Route
                    path='/login'
                    component={Login}
                />
                <Route
                    path='/register'
                    component={Register}
                />
                <Route
                    path='/homepage'
                    component={HomePage}
                />
                </Switch>
            </BrowserRouter>
        );
    }
}

// This gives the component access to the store (state)
const mapStateToProps = (state: MainState) => {
    return {
        storeState: state.app
    };
};

// This gives the component access to dispatch / the actions
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): DispatchProps => {
    return {
        initializeApplication: () => { dispatch(Actions.initializeApplication()); }
    };
};

// This method wraps the component with the store and dispatch!!!
export default connect<any, DispatchProps, any, MainState>
(mapStateToProps, mapDispatchToProps)(Application);

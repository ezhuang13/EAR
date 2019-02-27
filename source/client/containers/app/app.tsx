import * as React from 'react';
import { Route, Switch, RouteComponentProps } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';

// Imports for Actions and Types
import * as Actions from './appActions';

// Imports for Application State (based on the reducer)
import { MainState } from '../../reducers';
import { AppState } from './appReducer';

// Importing the Smart components / Routes
import Register from '../register/register';
import Login from '../login/login';
import Workstation from '../workstation/workstation';
import CreateProject from '../projects/createProject';
import Projects from '../projects/projects';
import { bindActionCreators } from 'redux';

interface ParentProps extends RouteComponentProps<{}> {}

// Combined Props Type for App Compoinent (Dispatch and State)
export type AppProps = Actions.DispatchProps & ParentProps & AppState;

class Application extends React.Component<AppProps> {
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
                    <h1>EAR!</h1>
                    <Link to='/login'>Login</Link>
                    <div/>
                    <Link to='/register'>Register</Link>
                    <div/>
                    <Link to='/create_project'>Create Project</Link>
                    <div/>
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
                    path='/workstation'
                    component={Workstation}
                />
                <Route
                    path='/create_project'
                    component={CreateProject}
                />
                <Route
                    path='/projects'
                    component={Projects}
                />
                </Switch>
            </BrowserRouter>
        );
    }
}

// This gives the component access to the store (state)
const mapStateToProps = (state: MainState) => {
    return {
        ...state.app
    };
};

// This gives the component access to dispatch / the actions
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): Actions.DispatchProps => {
    return bindActionCreators({
        initializeApplication: Actions.initializeApplication
    }, dispatch);
};

// This method wraps the component with the store and dispatch!!!
export default connect<any, Actions.DispatchProps, any, MainState>
(mapStateToProps, mapDispatchToProps)(Application);

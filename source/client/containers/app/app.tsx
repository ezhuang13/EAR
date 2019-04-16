import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
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
import Homepage from '../homepage/homepage';
import Info from '../info/info';
import { bindActionCreators } from 'redux';

import AppBar from '../../components/appBar';

interface ParentProps extends RouteComponentProps<{}> {}

// Combined Props Type for App Compoinent (Dispatch and State)
export type AppProps = Actions.DispatchProps & ParentProps & AppState;

class Application extends React.Component<AppProps> {
    constructor(props: AppProps) {
        super(props);

        // Binding "this" object to the different methods
        this.logApp = this.logApp.bind(this);
    }

    logApp() {
        console.log(this);
    }

    componentDidMount() {
        // Initialize the application.
        this.props.initializeApplication();
    }

    render() {
        return (
            <BrowserRouter>
                    <div style={{width: '100%'}}>
                        <Route
                            exact={false}
                            path='/'
                            component={AppBar}
                        />
                        <Route
                            exact={true}
                            path='/'
                            component={Homepage}
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
                    </div>
                </BrowserRouter>
        );
    }
}

// This gives the component access to the store (state)
const mapStateToProps = (state: MainState) => {
    return {
        app: state.app
    };
};

// This gives the component access to dispatch / the actions
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): Actions.DispatchProps => {
    return bindActionCreators({
        initializeApplication: Actions.initializeApplication,
        setUser: Actions.setUser
    }, dispatch);
};

// This method wraps the component with the store and dispatch!!!
export default connect<any, Actions.DispatchProps, any, MainState>
(mapStateToProps, mapDispatchToProps)(Application);

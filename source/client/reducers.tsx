import { combineReducers } from 'redux';

import * as App from './containers/app/appReducer';
import * as Login from './containers/login/loginReducer';
import * as Register from './containers/register/registerReducer';
import * as Workstation from './containers/workstation/workstationReducer';
import * as CreateProject from './containers/createProject/createProjectReducer';

export const rootReducer = combineReducers({
    app: App.appReducer,
    login: Login.loginReducer,
    register: Register.registerReducer,
    workstation: Workstation.workstationReducer,
    createProject: CreateProject.createProjectReducer
});

export type MainState = ReturnType<typeof rootReducer>;

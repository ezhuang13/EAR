import { combineReducers } from 'redux';

import * as App from './containers/app/appReducer';
import * as Login from './containers/login/loginReducer';
import * as Register from './containers/register/registerReducer';

export const rootReducer = combineReducers({
    app: App.appReducer,
    login: Login.loginReducer,
    register: Register.registerReducer
});

export type MainState = ReturnType<typeof rootReducer>;

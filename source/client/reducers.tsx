import { combineReducers } from 'redux';
import { appReducer } from './containers/app/appReducer';

const rootReducer = combineReducers({
    app: appReducer
});

export default rootReducer;
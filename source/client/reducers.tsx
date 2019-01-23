import { combineReducers } from 'redux';
import { appReducer } from './containers/app/reducer';

const rootReducer = combineReducers({
    app: appReducer
});

export default rootReducer;
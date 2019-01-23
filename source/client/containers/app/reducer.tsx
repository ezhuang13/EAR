import {
    APPLICATION_INITIALIZED
} from './actions';

const initialState = {
    started: false
};

export const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case APPLICATION_INITIALIZED:
            return Object.assign({}, state, {
                started: true
            });
        default:
            return state;
    }
}
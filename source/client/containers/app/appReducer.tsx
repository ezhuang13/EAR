import * as Types from './appTypes';

// Describes the shape of Login's slice of state for the Reducer
interface AppStateLocal {
    loggedIn: boolean;
    pastUsername: string;
    status: string;
    appInitialized: boolean;
}

export const initialAppState: AppStateLocal = {
    appInitialized: false,
    status: '',
    pastUsername: '',
    loggedIn: false
};

export const appReducer = (state = initialAppState, action: Types.AppActionTypes) => {
    switch (action.type) {
        case Types.APPLICATION_INITIALIZED:
            return Object.assign({}, state, {
                appInitialized: true
            });

        default:
            return state;
    }
};

export type AppState = ReturnType<typeof appReducer>;

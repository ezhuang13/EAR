import * as Types from './createProjectTypes';

/********** Local State Interface and Initial State Constant **********/
interface CreateProjectStateInterface {
    url: string
}

export const initialCreateProjectState: CreateProjectStateInterface = {
    url: ''
};

// TODO(ezhuang): figure out exact semantics of Object.assign, how to modify parts of state
/********** CreateProject Reducer **********/
export const createProjectReducer = (state = initialCreateProjectState, action: Types.CreateProjectActionTypes) => {
    switch (action.type) {
        case Types.SET_AUDIO:
            return Object.assign({}, state, {
                url: action.url
            });
        default:
            return state;
    }
};

// Exports the CreateProject Reducer as the CreateProject's State
export type CreateProjectState = ReturnType<typeof createProjectReducer>;

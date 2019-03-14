import * as Types from './projectsTypes';

/********** Local State Interface and Initial State Constant **********/
interface ProjectsStateInterface {
    projects?: any,
    currentProject?: string,
    currentUser?: Types.UserInfo,
}

export const initialProjectsState: ProjectsStateInterface = {
    projects: {},
    currentProject: null,
    currentUser: null,
};

/********** Projects Reducer **********/
export const projectsReducer = (state = initialProjectsState, action: Types.ProjectsActionTypes) => {
    switch (action.type) {
        case Types.SET_USER:
            return Object.assign({}, state, {
               currentUser: action.user
            });
        case Types.CREATE_PROJECT:
            return Object.assign({}, state, {
                projects: Object.assign({}, state.projects, action.newProject),
            });
        case Types.SET_PROJECT:
            return Object.assign({}, state, {
               currentProject: action.projectName
            });
        case Types.DELETE_PROJECT:
            const newProjects = Object.assign({}, state.projects);
            delete newProjects[action.projectName];
            return Object.assign({}, state, {
                projects: newProjects,
            });
        default:
            return state;
    }
};

// Exports the Projects Reducer as the Projects's State
export type ProjectsState = ReturnType<typeof projectsReducer>;

import * as Types from './projectsTypes';

/********** Local State Interface and Initial State Constant **********/
interface ProjectsStateInterface {
    projects?: any,
    currentProject?: Blob,
    currentUser?: Types.UserInfo,
    createSuccess?: boolean,
    currentProjectName?: string,
}

export const initialProjectsState: ProjectsStateInterface = {
    projects: [],
    currentProject: null,
    currentUser: null,
    createSuccess: false,
    currentProjectName: null,
};

/********** Projects Reducer **********/
export const projectsReducer = (state = initialProjectsState, action: Types.ProjectsActionTypes) => {
    switch (action.type) {
        case Types.SET_USER:
            return Object.assign({}, state, {
               currentUser: action.user,
            });
        case Types.CREATE_PROJ_STATUS:
            return Object.assign({}, state, {
                createSuccess: action.status,
            });
        case Types.SET_PROJECT:
            return Object.assign({}, state, {
               currentProject: action.project,
            });
        case Types.SET_PROJECTS:
            // Show most recently created first
            action.projects.reverse();
            return Object.assign({}, state, {
                projects: action.projects,
            });
        case Types.SET_PROJECT_NAME:
            return Object.assign({}, state, {
                currentProjectName: action.name,
            });
        default:
            return state;
    }
};

// Exports the Projects Reducer as the Projects's State
export type ProjectsState = ReturnType<typeof projectsReducer>;

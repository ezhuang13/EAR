import * as Types from './projectsTypes';

/********** Local State Interface and Initial State Constant **********/
interface ProjectsPropsInterface {
    projects?: any,
    currentProject?: Blob,
    currentUserInfo?: Types.UserInfo,
    createSuccess?: boolean,
    currentProjectName?: string,
}

export const initialProjectsProps: ProjectsPropsInterface = {
    projects: [],
    currentProject: null,
    currentUserInfo: null,
    createSuccess: false,
    currentProjectName: null,
};

/********** Projects Reducer **********/
export const projectsReducer = (state = initialProjectsProps, action: Types.ProjectsActionTypes) => {
    switch (action.type) {
        case Types.SET_USERZ:
            return Object.assign({}, state, {
                currentUserInfo: action.user,
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
export type ProjectsProps = ReturnType<typeof projectsReducer>;

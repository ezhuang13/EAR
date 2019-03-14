import * as Types from './projectsTypes';

/********** List of Actions for Dispatch Props **********/
export interface DispatchProps {
    createProject?: typeof createProject;
    setProject?: typeof setProject;
    deleteProject?: typeof deleteProject;
    setUser?: typeof setUser;
}

/********** Action Creators for the Synchronous Typed Actions **********/
export const createProject = (newProject: Types.ProjectKV) => {
    return ({
        type: Types.CREATE_PROJECT,
        newProject
    });
};

export const setProject = (projectName: string) => {
    return ({
        type: Types.SET_PROJECT,
        projectName
    });
};

export const deleteProject = (projectName: string) => {
    return ({
        type: Types.DELETE_PROJECT,
        projectName
    });
};

export const setUser = (user: Types.UserInfo) => {
    return ({
        type: Types.SET_USER,
        user
    });
};

/********** Action Creators for Asynchronous Typed Actions **********/

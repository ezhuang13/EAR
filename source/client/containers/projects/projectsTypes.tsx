/********** Describe the Action Types in Strings **********/
export const CREATE_PROJECT = 'CREATE_PROJECT';
export const SET_PROJECT = 'SET_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const SET_USER = 'SET_USER';
export const CREATE_PROJ_STATUS = 'CREATE_PROJ_STATUS';
export const SET_PROJECTS = 'SET_PROJECTS';
export const SET_PROJECT_NAME = 'SET_PROJECT_NAME';

/********** Interfaces for the Actions Creators **********/
interface CreateProject {
    type: typeof CREATE_PROJECT;
    newProject: ProjectInfo
}

interface SetProject {
    type: typeof SET_PROJECT;
    project: Blob;
}

interface DeleteProject {
    type: typeof DELETE_PROJECT;
    projectName: string;
}

interface SetUser {
    type: typeof SET_USER;
    user: UserInfo;
}

interface CreateProjStatus {
    type: typeof CREATE_PROJ_STATUS;
    status: boolean;
}

interface SetProjects {
    type: typeof SET_PROJECTS;
    projects: any;
}

interface SetProjectName {
    type: typeof SET_PROJECT_NAME;
    name: string;
}

/********** Interfaces for Arguments to and from Component **********/
export interface ProjectInfo {
    name: string;
    audio: Blob;
    dateCreated: string;
    filetype: string;
    id: number;
}

export interface UserInfo {
    createdAt: string;
    emailAddress: string;
    firstName: string;
    lastName: string;
    id: number;
    username: string;
}

/********** Combination of all Redux Actions **********/
export type ProjectsActionTypes = CreateProject | SetProject | DeleteProject | SetUser | CreateProjStatus
                                    | SetProjects | SetProjectName;

/********** Describe the Action Types in Strings **********/
export const CREATE_PROJECT = 'CREATE_PROJECT';
export const SET_PROJECT = 'SET_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const SET_USERZ = 'SET_USERZ';
export const CREATE_PROJ_STATUS = 'CREATE_PROJ_STATUS';
export const SET_PROJECTS = 'SET_PROJECTS';
export const SET_PROJECT_NAME = 'SET_PROJECT_NAME';
export const OBTAIN_PROJECT_DATA = 'OBTAIN_PROJECT_DATA';
export const OBTAIN_USER = 'OBTAIN_USER';
export const GET_PROJECT_BLOB = 'GET_PROEJCT_BLOB';

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
    currentUser: string;
}

interface SetUserz {
    type: typeof SET_USERZ;
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

interface ObtainProjectData {
    type: typeof OBTAIN_PROJECT_DATA;
    user: string;
}

interface ObtainUser {
    type: typeof OBTAIN_USER;
    user: string;
}

interface GetProjectBlob {
    type: typeof GET_PROJECT_BLOB;
    user: string;
    projectName: string;
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
    createdAt?: string;
    emailAddress?: string;
    firstName?: string;
    lastName?: string;
    id?: number;
    username?: string;
    currentUser?: string;
}

/********** Combination of all Redux Actions **********/
export type ProjectsActionTypes = CreateProject | SetProject | DeleteProject | SetUserz | CreateProjStatus
                                    | SetProjects | SetProjectName | ObtainProjectData | ObtainUser | GetProjectBlob;
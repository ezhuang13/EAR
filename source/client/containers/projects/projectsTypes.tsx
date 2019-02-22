/********** Describe the Action Types in Strings **********/
export const CREATE_PROJECT = 'CREATE_PROJECT';
export const SET_PROJECT = 'SET_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';

/********** Interfaces for the Actions Creators **********/
interface CreateProject {
    type: typeof CREATE_PROJECT;
    newProject: ProjectKV
}

interface SetProject {
    type: typeof SET_PROJECT;
    projectName: string;
}

interface DeleteProject {
    type: typeof DELETE_PROJECT;
    projectName: string;
}

/********** Interfaces for Arguments to and from Component **********/
export interface ProjectInfo {
    audio: Blob;
    dateCreated: string;
    filetype: string;
}

export interface ProjectKV {
    [name: string]: ProjectInfo;
}

/********** Combination of all Redux Actions **********/
export type ProjectsActionTypes = CreateProject | SetProject | DeleteProject;

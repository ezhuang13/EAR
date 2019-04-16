import * as Types from './projectsTypes';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { clientIP } from '../../utility/constants';

/********** List of Actions for Dispatch Props **********/
export interface DispatchProps {
    createProject?: typeof createProject;
    setProject?: typeof setProject;
    deleteProject?: typeof deleteProject;
    setUserz?: typeof setUserz;
    createProjStatus?: typeof createProjStatus;
    setProjects?: typeof setProjects;
    setProjectName?: typeof setProjectName;
    obtainProjectData?: typeof obtainProjectData;
    obtainUser?: typeof obtainUser;
    getProjectBlob?: typeof getProjectBlob;
}

/********** Action Creators for the Synchronous Typed Actions **********/
export const setProject = (project: Blob) => {
    return ({
        type: Types.SET_PROJECT,
        project,
    });
};

export const setUserz = (user: Types.UserInfo) => {
    return ({
        type: Types.SET_USERZ,
        user,
    });
};

export const createProjStatus = (status: boolean) => {
    return ({
        type: Types.CREATE_PROJ_STATUS,
        status,
    });
};

export const setProjects = (projects: any) => {
    return({
        type: Types.SET_PROJECTS,
        projects,
    });
};

export const setProjectName = (name: any) => {
    return({
        type: Types.SET_PROJECT_NAME,
        name,
    });
};

/********** Action Creators for Asynchronous Typed Actions **********/
type ThunkActionType = ThunkAction<Promise<void>, {}, {}, AnyAction>;

// Performs the AJAX request to the server for POSTing the login information.
export const createProject = (newProject: Types.ProjectInfo, currentUser: string): ThunkActionType => {
    return (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
            return new Promise<void>((resolve: any) => {
                const info = {
                    username: currentUser,
                    name: newProject.name,
                    dateCreated: newProject.dateCreated,
                    filetype: newProject.filetype,
                    audioSize: newProject.audio.size,
                };
                const projectInfo = new FormData();
                projectInfo.append('data', JSON.stringify(info));
                projectInfo.append('audio', newProject.audio);
                fetch(clientIP + '/project/', {
                    body: projectInfo,
                    mode: 'cors',
                    method: 'POST'
                })
                .then((response: any) => response.json()
                .then((responseData: any) => ({statusCode: response.status, body: responseData})))
                .then((responseData) => {
                    // Check the status code for appropriate action!
                    switch (responseData.statusCode) {
                        case 201:
                            dispatch(createProjStatus(true));
                            break;
                        case 400:
                            dispatch(createProjStatus(false));
                            break;
                        default:
                            break;
                    }
                    return resolve();
                })
                .catch((error) => {
                    // Can do whatever with the error?
                    dispatch(createProjStatus(false));
                });
            });
        };
};

export const deleteProject = (projectName: string, currentUser: string): ThunkActionType => {
    return (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
            return new Promise<void>((resolve: any) => {
                fetch(clientIP + '/project/' + currentUser + '/' + projectName, {
                    headers: {
                        'content-type': 'application/json'
                    },
                    mode: 'cors',
                    method: 'DELETE'
                })
                .then(() => {
                    fetch(clientIP + '/project/' + currentUser, {
                        mode: 'cors',
                        headers: {
                            'content-type': 'application/json'
                        },
                        method: 'GET'
                    })
                    .then((response: any) => response.json()
                    .then((projectResponseData: any) => {
                        dispatch(setProjects(projectResponseData));
                        return resolve();
                    }));
                })
                .catch((error) => {
                    // Can do whatever with the error?
                    console.log(`Error when deleting project: ${error}`);
                });
            });
        };
};

export const obtainProjectData = (user: string): ThunkActionType => {
    return (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>((resolve: any) => {
            fetch(clientIP + '/project/' + user, {
                mode: 'cors',
                headers: {
                    'content-type': 'application/json'
                },
                method: 'GET'
              })
              .then((response: any) => response.json()
              .then((projectResponseData: any) => {
                dispatch(setProjects(projectResponseData));
                return resolve();
              }))
              .catch((error) => {
                console.log(error);
              });
        });
    };
};

export const obtainUser = (user: string): ThunkActionType => {
    return (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>((resolve: any) => {
            fetch(clientIP + '/users/' + user, {
                mode: 'cors',
                headers: {
                    'content-type': 'application/json'
                },
                method: 'GET'
              })
              .then((response: any) => response.json()
              .then((userResponseData: any) => {
                    dispatch(setUserz(userResponseData));
                    return resolve();
              }))
              .catch((error) => {
                console.log(error);
              });
        });
    };
};

export const getProjectBlob = (user: string, projectName: string): ThunkActionType => {
    return (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>((resolve: any) => {
            fetch(`${clientIP}/project/${user}/${projectName}`, {
                mode: 'cors',
                headers: {
                    'content-type': 'application/json'
                },
                method: 'GET'
              }).then((response: any) => response.blob()
              .then((projectResponseData: Blob) => {
                dispatch(setProject(projectResponseData));
                resolve();
              }))
              .catch((error) => {
                console.log(error);
              });
        });
    };
};
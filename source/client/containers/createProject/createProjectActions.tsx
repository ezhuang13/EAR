import * as Types from './createProjectTypes';

/********** List of Actions for Dispatch Props **********/
export interface DispatchProps {
    setAudio: typeof setAudio
}

/********** Action Creators for the Synchronous Typed Actions **********/
export const setAudio = (url: string) => {
    return ({
        type: Types.SET_AUDIO,
        url
    });
};

/********** Action Creators for Asynchronous Typed Actions **********/

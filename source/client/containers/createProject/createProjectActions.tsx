import * as Types from './createProjectTypes';

/********** List of Actions for Dispatch Props **********/
export interface DispatchProps {
    setAudio
}

/********** Action Creators for the Synchronous Typed Actions **********/
export const setAudio = (url: string) => {
    return ({
        type: Types.SET_AUDIO,
        url: url
    });
};

/********** Action Creators for Asynchronous Typed Actions **********/

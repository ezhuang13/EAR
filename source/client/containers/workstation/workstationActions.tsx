import * as Types from './workstationTypes';

/********** List of Actions for Dispatch Props **********/
export interface DispatchProps {
    volumeChange?,
    toggleEffect?,
    createSound?,
    setPlay?,
    setRecording?,
    setDownload?
}

/********** Action Creators for the Synchronous Typed Actions **********/
export const volumeChange = (volume: number) => {
    return ({
        type: Types.VOLUME_CHANGE,
        volume
    });
};

export const toggleEffect = (effect: string) => {
    return ({
        type: Types.TOGGLE_EFFECT,
        effect
    });
};

export const createSound = (url: string) => {
    return ({
        type: Types.CREATE_SOUND,
        url
    });
};

export const setPlay = (isPlaying: boolean) => {
    return ({
        type: Types.SET_PLAY,
        isPlaying
    });
};

export const setRecording = (isRecording: boolean) => {
    return ({
        type: Types.SET_RECORDING,
        isRecording
    });
};

export const setDownload = (url: string) => {
    return ({
        type: Types.SET_DOWNLOAD,
        url
    });
};

/********** Action Creators for Asynchronous Typed Actions **********/

import * as Types from './workstationTypes';

/********** List of Actions for Dispatch Props **********/
export interface DispatchProps {
    volumeChange?: typeof volumeChange;
    toggleEffect?: typeof toggleEffect;
    createSound?: typeof createSound;
    setPlay?: typeof setPlay;
    setRecording?: typeof setRecording;
    setDownload?: typeof setDownload;
    removeEffects?: typeof removeEffects;
}

/********** Action Creators for the Synchronous Typed Actions **********/
export const volumeChange = (volume: number) => {
    return ({
        type: Types.VOLUME_CHANGE,
        volume
    });
};

export const toggleEffect = (effect: string, wave: any) => {
    return ({
        type: Types.TOGGLE_EFFECT,
        effect,
        wave
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

export const setDownload = (download: Blob) => {
    return ({
        type: Types.SET_DOWNLOAD,
        download
    });
};

export const removeEffects = () => {
    return ({
        type: Types.REMOVE_EFFECTS
    });
};

/********** Action Creators for Asynchronous Typed Actions **********/

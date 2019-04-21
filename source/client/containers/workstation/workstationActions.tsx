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
    togglePlay?: typeof togglePlay;
    addCheckedEffects?: typeof addCheckedEffects;
    resetEffects?: typeof resetEffects;
    selectEffect?: typeof selectEffect;
    modifyEffect?: typeof modifyEffect;
    deleteRegion?: typeof deleteRegion;
    selectRegion?: typeof selectRegion;
    setWorkstation?: typeof setWorkstation;
}

/********** Action Creators for the Synchronous Typed Actions **********/
export const volumeChange = (volume: number) => {
    return ({
        type: Types.VOLUME_CHANGE,
        volume
    });
};

export const toggleEffect = (effect: string, wave: any, audio: any, currentKey: string) => {
    return ({
        type: Types.TOGGLE_EFFECT,
        effect,
        wave,
        audio,
        currentKey
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

export const togglePlay = () => {
    return ({
        type: Types.TOGGLE_PLAY
    });
};

export const addCheckedEffects = (currentKey: string) => {
    return ({
        type: Types.ADD_CHECKED_EFFECTS,
        currentKey
    });
};

export const resetEffects = () => {
    return ({
        type: Types.RESET_EFFECTS
    });
};

export const selectEffect = (selectedEffect: string) => {
    return ({
        type: Types.SELECT_EFFECT,
        selectedEffect,
    });
};

export const deleteRegion = (currentKey: string) => {
    return  ({
        type: Types.DELETE_REGION,
        currentKey
    });
};

export const modifyEffect = (effectName: string, effectOption: string, value: number) => {
    return ({
        type: Types.MODIFY_EFFECT,
        effectName,
        effectOption,
        value,
    });
};

export const selectRegion = (waveKey: string) => {
    return ({
        type: Types.SELECT_REGION,
        waveKey,
    });
};

export const setWorkstation = () => {
    return ({
        type: Types.SET_WORKSTATION
    });
};

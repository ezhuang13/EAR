/********** Describe the Action Types in Strings **********/
export const VOLUME_CHANGE = 'VOLUME_CHANGE';
export const TOGGLE_EFFECT = 'TOGGLE_EFFECT';
export const CREATE_SOUND = 'CREATE_SOUND';
export const SET_PLAY = 'SET_PLAY';
export const SET_RECORDING = 'SET_RECORDING';
export const SET_DOWNLOAD = 'SET_DOWNLOAD';
export const REMOVE_EFFECTS = 'REMOVE_EFFECTS';

/********** Interfaces for the Actions Creators **********/
interface VolumeChange {
    type: typeof VOLUME_CHANGE;
    volume: number;
}

interface ToggleEffect {
    type: typeof TOGGLE_EFFECT;
    effect: string;
}

interface CreateSound {
    type: typeof CREATE_SOUND;
    url: string;
}

interface SetPlay {
    type: typeof SET_PLAY;
    isPlaying: boolean;
}

interface SetRecording {
    type: typeof SET_RECORDING;
    isRecording: boolean;
}

interface SetDownload {
    type: typeof SET_DOWNLOAD;
    download: Blob;
}

interface RemoveEffects {
    type: typeof REMOVE_EFFECTS;
}

/********** Combination of all Redux Actions **********/
export type WorkstationActionTypes = VolumeChange | ToggleEffect | CreateSound |
                                    RemoveEffects | SetPlay | SetRecording | SetDownload;

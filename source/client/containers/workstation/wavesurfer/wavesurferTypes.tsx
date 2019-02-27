/********** Describe the Action Types in Strings **********/
export const WAVE_INITIALIZED = 'WAVESURFER_INITIALIZED';
export const CHANGE_WAVE_COLOR = 'CHANGE_WAVE_COLOR';
export const CHANGE_PROGRESS_COLOR  = 'CHANGE_PROGRESS_COLOR';
export const ADD_PLUGIN = 'ADD_PLUGIN';
export const SET_OPTIONS = 'SET_OPTIONS';
export const SET_WAVE = 'SET_WAVE';
export const REPLACE_AUDIO = 'REPLACE_AUDIO';
export const REMOVE_PLUGIN = 'REMOVE_PLUGIN';
export const CLIP_AUDIO = 'CLIP_AUDIO';
export const PLAY_REGION = 'PLAY_REGION';

/********** Interfaces for Redux Actions for the Register Component **********/
interface InitializeWave {
    type: typeof WAVE_INITIALIZED;
    payload: CommonArguments;
}

interface SetWave {
    type: typeof SET_WAVE;
    payload: CommonArguments;
}

interface ChangeWaveColor {
    type: typeof CHANGE_WAVE_COLOR;
    payload: CommonArguments;
}

interface ChangeProgressColor {
    type: typeof CHANGE_PROGRESS_COLOR;
    payload: CommonArguments;
}

interface AddPlugin {
    type: typeof ADD_PLUGIN;
    payload: CommonArguments;
}

interface RemovePlugin {
    type: typeof REMOVE_PLUGIN;
    payload: CommonArguments;
}

interface SetOptions {
    type: typeof SET_OPTIONS;
    payload: Options;
}

interface ReplaceAudio {
    type: typeof REPLACE_AUDIO;
    payload: CommonArguments;
}

interface ClipAudio {
    type: typeof CLIP_AUDIO,
    payload: CommonArguments
}

interface PlayRegion {
    type: typeof PLAY_REGION;
    payload: CommonArguments
}

/********** Interfaces for Objects in the Component **********/

export interface CommonArguments {
    waveInitialized: boolean;
    ourWave: object | Blob;
    color?: string;
    pluginType?: string;
    audio?: any;
    wave: any;
}

export interface Options {
    songDuration: number;
    formattedTime: {
        minutes: number;
        seconds: number;
    }
}

/********** Combination of all Redux Actions **********/
export type WaveActionTypes =   InitializeWave | ChangeWaveColor | ChangeProgressColor |
                                AddPlugin | SetOptions | SetWave | ReplaceAudio | RemovePlugin |
                                ClipAudio | PlayRegion;

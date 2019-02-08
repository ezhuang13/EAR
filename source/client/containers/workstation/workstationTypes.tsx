/********** Describe the Action Types in Strings **********/
export const VOLUME_CHANGE = 'VOLUME_CHANGE';
export const TOGGLE_EFFECT = 'TOGGLE_EFFECT';
export const CREATE_SOUND = 'CREATE_SOUND';

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

/********** Interfaces for Objects in the Login Component**********/
export interface TremoloOptions {
    on: boolean,
    speed: number,
    depth: number,
    mix: number
}

/********** Combination of all Redux Actions **********/
export type WorkstationActionTypes = VolumeChange | ToggleEffect | CreateSound;

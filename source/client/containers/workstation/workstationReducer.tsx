import * as Types from './workstationTypes';
import * as Constants from './effects/effectConstants';

import Pizzicato from 'pizzicato';

/********** Local State Interface and Initial State Constant **********/
// TODO: create an interface for effects and audio
interface WorkstationStateInterface {
    volume?: number,
    checkedEffects?: any,
    effects?: any,
    audio?: Pizzicato.Sound,
    audioUrl?: string,
    isPlaying?: boolean,
    isRecording?: boolean,
    downloadBlob?: Blob
}

export const initialWorkstationState: WorkstationStateInterface = {
    volume: .5,
    checkedEffects: {
        [Constants.COMPRESSOR]: false,
        [Constants.DELAY]: false,
        [Constants.DISTORTION]: false,
        [Constants.DUB]: false,
        [Constants.FLANGER]: false,
        [Constants.PING_PONG]: false,
        [Constants.QUADRAFUZZ]: false,
        [Constants.REVERB]: false,
        [Constants.RING_MOD]: false,
        [Constants.STEREO_PANNER]: false,
        [Constants.TREMOLO]: false
    },
    effects: {
        [Constants.COMPRESSOR]: null,
        [Constants.DELAY]: null,
        [Constants.DISTORTION]: null,
        [Constants.DUB]: null,
        [Constants.FLANGER]: null,
        [Constants.PING_PONG]: null,
        [Constants.QUADRAFUZZ]: null,
        [Constants.REVERB]: null,
        [Constants.RING_MOD]: null,
        [Constants.STEREO_PANNER]: null,
        [Constants.TREMOLO]: null
    },
    audio: null,
    audioUrl: '',
    isPlaying: false,
    isRecording: false,
    downloadBlob: null
};

/********** Effects Reducer **********/
const effectsReducer = (checkedEffect: string) => {
    let newEffect = null;
    switch (checkedEffect) {
        case Constants.COMPRESSOR:
            newEffect = new Pizzicato.Effects.Compressor();
            break;
        case Constants.DELAY:
            newEffect = new Pizzicato.Effects.Delay({options: {detached: true}});
            break;
        case Constants.DISTORTION:
            newEffect = new Pizzicato.Effects.Distortion({options: {detached: true}});
            break;
        case Constants.DUB:
            newEffect = new Pizzicato.Effects.DubDelay();
            break;
        case Constants.FLANGER:
            newEffect = new Pizzicato.Effects.Flanger();
            break;
        case Constants.PING_PONG:
            newEffect = new Pizzicato.Effects.PingPongDelay();
            break;
        case Constants.QUADRAFUZZ:
            newEffect = new Pizzicato.Effects.Quadrafuzz();
            break;
        case Constants.REVERB:
            newEffect = new Pizzicato.Effects.Reverb();
            break;
        case Constants.RING_MOD:
            newEffect = new Pizzicato.Effects.RingModulator();
            break;
        case Constants.STEREO_PANNER:
            newEffect = new Pizzicato.Effects.StereoPanner();
        case Constants.TREMOLO:
            newEffect = new Pizzicato.Effects.Tremolo();
            break;
        default:
            break;
    }

    return newEffect;
};

/********** Workstation Reducer **********/
export const workstationReducer = (state = initialWorkstationState, action: Types.WorkstationActionTypes) => {
    switch (action.type) {
        case Types.VOLUME_CHANGE:
            state.audio.volume = action.volume;
            return Object.assign({}, state, {
                volume: action.volume
            });
        case Types.TOGGLE_EFFECT:
            // Obtain New Effects from checkEffects array.
            let newEffect = effectsReducer(action.effect);
            // Check if the effect is on or off, add or remove effect!
            if (!state.checkedEffects[action.effect]) {
                state.audio.addEffect(newEffect);
            }
            else {
                newEffect = state.effects[action.effect];
                state.audio.removeEffect(newEffect);
                newEffect = null;
            }

            // Assign the payload!
            return Object.assign({}, state, {
                checkedEffects: {
                    ...state.checkedEffects,
                    [action.effect]: !state.checkedEffects[action.effect]
                },
                effects: {
                    ...state.effects,
                    [action.effect]: newEffect
                }
            });
        case Types.REMOVE_EFFECTS:
            const noEffects = Object.assign({}, state.checkedEffects);
            Object.keys(noEffects).forEach((effect) => {
                noEffects[effect] = false;
            });
            return Object.assign({}, state, {
                checkedEffects: noEffects,
            });
        case Types.CREATE_SOUND:
            const newSound = new Pizzicato.Sound({
                source: 'file',
                options: { path: action.url }
            });
            return Object.assign({}, state, {
                audio: newSound
            });
        case Types.SET_PLAY:
            return Object.assign({}, state, {
                isPlaying: action.isPlaying
            });
        case Types.SET_RECORDING:
            return Object.assign({}, state, {
                isRecording: action.isRecording
            });
        case Types.SET_DOWNLOAD:
            return Object.assign({}, state, {
                downloadBlob: action.download
            });
        default:
            return state;
    }
};

// Exports the Workstation Reducer as the Workstation's State
export type WorkstationState = ReturnType<typeof workstationReducer>;

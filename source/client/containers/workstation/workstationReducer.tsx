import * as Types from './workstationTypes';
import * as Constants from './better_effects/effectConstants';

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
    downloadBlob?: Blob,
    selectedEffect?: string,
    // Effect options
    [Constants.COMPRESSOR]?: any,
    [Constants.DELAY]?: any,
    [Constants.DISTORTION]?: any,
    [Constants.DUB]?: any,
    [Constants.FLANGER]?: any,
    [Constants.PING_PONG]?: any,
    [Constants.QUADRAFUZZ]?: any,
    [Constants.REVERB]?: any,
    [Constants.RING_MOD]?: any,
    [Constants.STEREO_PANNER]?: any,
    [Constants.TREMOLO]?: any
}

export const generateCheckedEffects = () => {
    return {
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
    };
};

export const generateEffects = () => {
    return {
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
    };
};

export const initialWorkstationState: WorkstationStateInterface = {
    volume: .5,
    checkedEffects: {},
    effects: {},
    audio: null,
    audioUrl: '',
    isPlaying: false,
    isRecording: false,
    downloadBlob: null,
    selectedEffect: null,
    [Constants.COMPRESSOR]: {
        threshold: -24,
        knee: 30,
        attack: .003,
        release: .025,
        ratio: 12,
        mix: .5,
    },
    [Constants.DELAY]: {
        feedback: .5,
        time: .3,
        mix: .5,
    },
    [Constants.DISTORTION]: {
        gain: .5,
    },
    [Constants.DUB]: {
        feedback: .5,
        time: .3,
        cutoff: 700,
        mix: .5,
    },
    [Constants.FLANGER]: {
        lowGain: .6,
        midLowGain: .8,
        midHighGain: .5,
        highGain: .6,
    },
    [Constants.PING_PONG]: {
        feedback: .5,
        time: .3,
        mix: .5,
    },
    [Constants.QUADRAFUZZ]: {
        lowGain: .6,
        midLowGain: .8,
        midHighGain: .5,
        highGain: .6,
    },
    [Constants.REVERB]: {
        time: .01,
        decay: .01,
        reverse: true,
        mix: .5,
    },
    [Constants.RING_MOD]: {
        speed: 30,
        distortion: 1,
        mix: .5,
    },
    [Constants.STEREO_PANNER]: {
        pan: 0,
    },
    [Constants.TREMOLO]: {
        speed: 4,
        depth: 1,
        mix: .5,
    },
};

/********** Effects Reducer **********/
const effectsReducer = (checkedEffect: string, options: any) => {
    let newEffect = null;
    switch (checkedEffect) {
        case Constants.COMPRESSOR:
            newEffect = new Pizzicato.Effects.Compressor(options);
            break;
        case Constants.DELAY:
            options[options] = {detached: true};
            newEffect = new Pizzicato.Effects.Delay(options);
            break;
        case Constants.DISTORTION:
            options[options] = {detached: true};
            newEffect = new Pizzicato.Effects.Distortion(options);
            break;
        case Constants.DUB:
            newEffect = new Pizzicato.Effects.DubDelay(options);
            break;
        case Constants.FLANGER:
            newEffect = new Pizzicato.Effects.Flanger(options);
            break;
        case Constants.PING_PONG:
            newEffect = new Pizzicato.Effects.PingPongDelay(options);
            break;
        case Constants.QUADRAFUZZ:
            newEffect = new Pizzicato.Effects.Quadrafuzz(options);
            break;
        case Constants.REVERB:
            newEffect = new Pizzicato.Effects.Reverb(options);
            break;
        case Constants.RING_MOD:
            newEffect = new Pizzicato.Effects.RingModulator(options);
            break;
        case Constants.STEREO_PANNER:
            newEffect = new Pizzicato.Effects.StereoPanner(options);
        case Constants.TREMOLO:
            newEffect = new Pizzicato.Effects.Tremolo(options);
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
            const newEffect = effectsReducer(action.effect, state[action.effect]);

            // Obtain other constants.
            if (action.wave.initialisedPluginList.regions) {
                const regionStart = action.wave.regions.list[action.currentKey].start;
                const regionEnd = action.wave.regions.list[action.currentKey].end;
                const currentTime = action.wave.getCurrentTime();

                // If we're already in the region, add the effect!
                if (regionStart < currentTime && regionEnd > currentTime) {
                    if (!state.checkedEffects[action.currentKey][action.effect]) {
                        action.audio.addEffect(newEffect);
                    }
                }
            }

            // Check if the effect is checked and that it exists in effects.
            const removeFlag = state.checkedEffects[action.currentKey][action.effect] &&
                state.effects[action.currentKey][action.effect];

            // Remove the effect if it's there!
            if (removeFlag) {
                const effectToRemove = state.effects[action.currentKey][action.effect];
                action.audio.removeEffect(effectToRemove);
            }

            // Assign the payload!
            return Object.assign({}, state, {
                checkedEffects: {
                    ...state.checkedEffects,
                    [action.currentKey]: {
                        ...state.checkedEffects[action.currentKey],
                        [action.effect]: !(state.checkedEffects[action.currentKey][action.effect])
                    }
                },
                effects: {
                    ...state.effects,
                    [action.currentKey]: {
                        ...state.effects[action.currentKey],
                        [action.effect]: removeFlag ? null : newEffect
                    }
                }
            });
        case Types.REMOVE_EFFECTS:
            const noEffects = Object.assign({}, state.checkedEffects);
            Object.keys(noEffects).forEach((effect) => {
                noEffects[effect] = false;
            });
            return Object.assign({}, state, {
                checkedEffects: noEffects
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
        case Types.TOGGLE_PLAY:
            return Object.assign({}, state, {
                isPlaying: !state.isPlaying
            });
        case Types.ADD_CHECKED_EFFECTS:
            const newCheckedEffects = generateCheckedEffects();
            const newEffects = generateEffects();
            return Object.assign({}, state, {
                checkedEffects: {
                    ...state.checkedEffects,
                    [action.currentKey]: newCheckedEffects
                },
                effects: {
                    ...state.effects,
                    [action.currentKey]: newEffects
                }
            });
        case Types.RESET_EFFECTS:
            return Object.assign({}, state, {
                checkedEffects: {},
                effects: {}
            });
        case Types.SELECT_EFFECT:
            return Object.assign({}, state, {
                selectedEffect: action.selectedEffect,
            });
        case Types.MODIFY_EFFECT:
            const optionsCopy = Object.assign({}, state[action.effectName], {
                [action.effectOption]: action.value,
            });
            return Object.assign({}, state, {
                [action.effectName]: optionsCopy,
            });
        case Types.DELETE_REGION:
            delete state.checkedEffects[action.currentKey];
            delete state.effects[action.currentKey];
            return Object.assign({}, state, {});
        default:
            return state;
    }
};

// Exports the Workstation Reducer as the Workstation's State
export type WorkstationState = ReturnType<typeof workstationReducer>;

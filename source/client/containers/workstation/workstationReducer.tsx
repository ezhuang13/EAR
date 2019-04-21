import * as Types from './workstationTypes';
import {
    COMPRESSOR,
    DELAY,
    DISTORTION,
    DUB,
    FLANGER,
    PING_PONG,
    QUADRAFUZZ,
    REVERB,
    RING_MOD,
    STEREO_PANNER,
    TREMOLO
} from './better_effects/effectConstants';

import Pizzicato from 'pizzicato';

/********** Interfaces for the Workstation **********/
interface EffectsInterface {
    [COMPRESSOR]?: any,
    [DELAY]?: any,
    [DISTORTION]?: any,
    [DUB]?: any,
    [FLANGER]?: any,
    [PING_PONG]?: any,
    [QUADRAFUZZ]?: any,
    [REVERB]?: any,
    [RING_MOD]?: any,
    [STEREO_PANNER]?: any,
    [TREMOLO]?: any
}
export interface WorkstationState {
    regionsInfo?: object,
    highlightedRegion?: string,
    selectorOptions?: any[]
}
interface WorkstationPropsInterface extends EffectsInterface {
    volume?: number,
    checkedEffects?: object,
    effects?: object,
    audio?: Pizzicato.Sound,
    audioUrl?: string,
    isPlaying?: boolean,
    isRecording?: boolean,
    downloadBlob?: Blob,
    selectedEffect?: string,
    selectedRegion?: string,
    classes?: any
}

const generateCheckedEffects = () => {
    return {
        [COMPRESSOR]: false,
        [DELAY]: false,
        [DISTORTION]: false,
        [DUB]: false,
        [FLANGER]: false,
        [PING_PONG]: false,
        [QUADRAFUZZ]: false,
        [REVERB]: false,
        [RING_MOD]: false,
        [STEREO_PANNER]: false,
        [TREMOLO]: false
    };
};

const generateEffects = () => {
    return {
        [COMPRESSOR]: null,
        [DELAY]: null,
        [DISTORTION]: null,
        [DUB]: null,
        [FLANGER]: null,
        [PING_PONG]: null,
        [QUADRAFUZZ]: null,
        [REVERB]: null,
        [RING_MOD]: null,
        [STEREO_PANNER]: null,
        [TREMOLO]: null
    };
};

const initialWorkstationProps: WorkstationPropsInterface = {
    volume: .5,
    checkedEffects: {},
    effects: {},
    audio: null,
    audioUrl: '',
    isPlaying: false,
    isRecording: false,
    downloadBlob: null,
    selectedEffect: null,
    selectedRegion: null,
    [COMPRESSOR]: {
        threshold: -24,
        knee: 30,
        attack: .003,
        release: .025,
        ratio: 12,
        mix: .5,
    },
    [DELAY]: {
        feedback: .5,
        time: .3,
        mix: .5,
    },
    [DISTORTION]: {
        gain: .5,
    },
    [DUB]: {
        feedback: .5,
        time: .3,
        cutoff: 700,
        mix: .5,
    },
    [FLANGER]: {
        lowGain: .6,
        midLowGain: .8,
        midHighGain: .5,
        highGain: .6,
    },
    [PING_PONG]: {
        feedback: .5,
        time: .3,
        mix: .5,
    },
    [QUADRAFUZZ]: {
        lowGain: .6,
        midLowGain: .8,
        midHighGain: .5,
        highGain: .6,
    },
    [REVERB]: {
        time: .01,
        decay: .01,
        reverse: true,
        mix: .5,
    },
    [RING_MOD]: {
        speed: 30,
        distortion: 1,
        mix: .5,
    },
    [STEREO_PANNER]: {
        pan: 0,
    },
    [TREMOLO]: {
        speed: 4,
        depth: 1,
        mix: .5,
    },
};

/********** Effects Reducer **********/
const effectsReducer = (checkedEffect: string, options: any) => {
    let newEffect = null;
    switch (checkedEffect) {
        case COMPRESSOR:
            newEffect = new Pizzicato.Effects.Compressor(options);
            break;
        case DELAY:
            options[options] = {detached: true};
            newEffect = new Pizzicato.Effects.Delay(options);
            break;
        case DISTORTION:
            options[options] = {detached: true};
            newEffect = new Pizzicato.Effects.Distortion(options);
            break;
        case DUB:
            newEffect = new Pizzicato.Effects.DubDelay(options);
            break;
        case FLANGER:
            newEffect = new Pizzicato.Effects.Flanger(options);
            break;
        case PING_PONG:
            newEffect = new Pizzicato.Effects.PingPongDelay(options);
            break;
        case QUADRAFUZZ:
            newEffect = new Pizzicato.Effects.Quadrafuzz(options);
            break;
        case REVERB:
            newEffect = new Pizzicato.Effects.Reverb(options);
            break;
        case RING_MOD:
            newEffect = new Pizzicato.Effects.RingModulator(options);
            break;
        case STEREO_PANNER:
            newEffect = new Pizzicato.Effects.StereoPanner(options);
        case TREMOLO:
            newEffect = new Pizzicato.Effects.Tremolo(options);
            break;
        default:
            break;
    }

    return newEffect;
};

/********** Workstation Reducer **********/
export const workstationReducer = (state = initialWorkstationProps, action: Types.WorkstationActionTypes) => {
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
        case Types.SELECT_REGION:
            return Object.assign({}, state, {
                selectedRegion: action.waveKey,
            });
        case Types.MODIFY_EFFECT:
            const optionsCopy = Object.assign({}, state[action.effectName], {
                [action.effectOption]: action.value,
            });
            const replaceEffect = state.selectedRegion && state.checkedEffects[state.selectedRegion][action.effectName];
            let replacedEffect = null;
            if (replaceEffect) {
                replacedEffect = effectsReducer(action.effectName, optionsCopy);
                state.audio.removeEffect(state.effects[state.selectedRegion][action.effectName]);
                state.audio.addEffect(replacedEffect);
            }
            return Object.assign({}, state, {
                [action.effectName]: optionsCopy,
                effects: {
                    ...state.effects,
                    [state.selectedRegion]: {
                        ...state.effects[state.selectedRegion],
                        [action.effectName]: replacedEffect,
                    }
                }
            });
        case Types.DELETE_REGION:
            delete state.checkedEffects[action.currentKey];
            delete state.effects[action.currentKey];
            return Object.assign({}, state, {});
        case Types.SET_WORKSTATION:
            return Object.assign({}, state, initialWorkstationProps);
        default:
            return state;
    }
};

// Exports the Workstation Reducer as the Workstation's State
export type WorkstationProps = ReturnType<typeof workstationReducer>;

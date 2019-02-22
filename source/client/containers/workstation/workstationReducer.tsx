import * as Types from './workstationTypes';
import * as Constants from './effectConstants';

import Pizzicato from 'pizzicato';
import { bindActionCreators } from 'redux';

/********** Local State Interface and Initial State Constant **********/
// TODO: create an interface for effects and audio
interface WorkstationStateInterface {
    volume?: number,
    checkedEffects?: any,
    effects?: any,
    audio?: Pizzicato.Sound,
    isPlaying?: boolean,
    isRecording?: boolean,
    download?: Blob,
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
        [Constants.COMPRESSOR]: new Pizzicato.Effects.Compressor(),
        [Constants.DELAY]: new Pizzicato.Effects.Delay(),
        [Constants.DISTORTION]: new Pizzicato.Effects.Distortion(),
        [Constants.DUB]: new Pizzicato.Effects.DubDelay(),
        [Constants.FLANGER]: new Pizzicato.Effects.Flanger(),
        [Constants.PING_PONG]: new Pizzicato.Effects.PingPongDelay(),
        [Constants.QUADRAFUZZ]: new Pizzicato.Effects.Quadrafuzz(),
        [Constants.REVERB]: new Pizzicato.Effects.Reverb(),
        [Constants.RING_MOD] : new Pizzicato.Effects.RingModulator({
            speed: 30,
            distortion: 1,
            mix: 0.5
        }),
        [Constants.STEREO_PANNER]: new Pizzicato.Effects.StereoPanner(),
        [Constants.TREMOLO] : new Pizzicato.Effects.Tremolo({
            speed: 15,
            depth: 1,
            mix: 0.8
        }),
    },
    audio: null,
    isPlaying: false,
    isRecording: false,
    download: null,
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
            const newEffects = Object.assign({}, state.checkedEffects);
            newEffects[action.effect] = !newEffects[action.effect];
            newEffects[action.effect] ?
                state.audio.addEffect(state.effects[action.effect]) :
                state.audio.removeEffect(state.effects[action.effect]);
            return Object.assign({}, state, {
                checkedEffects: newEffects
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
                download: action.download
            });
        default:
            return state;
    }
};

// Exports the Workstation Reducer as the Workstation's State
export type WorkstationState = ReturnType<typeof workstationReducer>;

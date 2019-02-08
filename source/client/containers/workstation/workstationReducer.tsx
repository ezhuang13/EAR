import * as Types from './workstationTypes';
import * as Constants from './effectConstants';

import Pizzicato from 'pizzicato';

/********** Local State Interface and Initial State Constant **********/
// TODO: create an interface for effects and audio
interface WorkstationStateInterface {
    volume?: number,
    checkedEffects?: any,
    effects?: any,
    audio?: Pizzicato.Sound
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
    audio: null
};

// TODO(ezhuang): figure out exact semantics of Object.assign, how to modify parts of state
/********** Workstation Reducer **********/
export const workstationReducer = (state = initialWorkstationState, action: Types.WorkstationActionTypes) => {
    switch (action.type) {
        case Types.VOLUME_CHANGE:
            state.audio.volume = action.volume;
            return Object.assign({}, state, {
                volume: action.volume
            });
        case Types.TOGGLE_EFFECT:
            let newEffects = Object.assign({}, state.checkedEffects);
            newEffects[action.effect] = !newEffects[action.effect];
            newEffects[action.effect] ?
                state.audio.addEffect(state.effects[action.effect]) :
                state.audio.removeEffect(state.effects[action.effect])
            return Object.assign({}, state, {
                checkedEffects: newEffects
            });
        case Types.CREATE_SOUND:
            let newSound = new Pizzicato.Sound({ 
                source: 'file',
                options: { path: action.url }
            });
            return Object.assign({}, state, {
                audio: newSound
            });
        default:
            return state;
    }
};

// Exports the Workstation Reducer as the Workstation's State
export type WorkstationState = ReturnType<typeof workstationReducer>;

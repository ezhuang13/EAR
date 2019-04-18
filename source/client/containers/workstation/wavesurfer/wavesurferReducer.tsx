import * as Types from './wavesurferTypes';
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js';

/********** Local State Interface and Initial State Constant **********/
interface WaveStateLocal {
    waveInitialized?: boolean;
    wave?: any;
    waveColor?: string;
    progressColor?: string;
    songData?: Types.Options;
}

export const initialWaveState: WaveStateLocal = {
    waveInitialized: false,
    wave: {},
    waveColor: 'purple',
    progressColor: 'blue',
    songData: {
        songDuration: 0,
        formattedTime: {
            minutes: 0,
            seconds: 0
        }
    }
};

/********** Application Reducer **********/
export const waveReducer = (state = initialWaveState, action: Types.WaveActionTypes) => {
    switch (action.type) {
        case Types.WAVE_INITIALIZED:
            return Object.assign({}, state, {
                waveInitialized: action.payload.waveInitialized,
                wave: action.payload.ourWave
            });
        case Types.CHANGE_WAVE_COLOR:
            return Object.assign({}, state, {
                waveColor: action.payload.color,
                wave: action.payload.wave
            });
        case Types.CHANGE_PROGRESS_COLOR:
            return Object.assign({}, state, {
                progressColor: action.payload.color,
                wave: action.payload.wave
            });
        case Types.ADD_PLUGIN:
            // Return the new wave (with a new plugin or without changing)
            return Object.assign({}, state, {
                wave: action.payload.wave
            });
        case Types.REMOVE_PLUGIN:

            // Obtain the Plugin Type and Wavesurfer
            const inputtedPluginType = action.payload.pluginType;
            const theWave = action.payload.wave;

            // Loop through the Wavesurfer plugin list to find the right plugin.
            theWave.params.plugins.forEach((plugin: any) => {

                if (plugin.name === inputtedPluginType) {
                    // If the plugin was initialized, destroy it and pop the plugin
                    theWave.destroyPlugin(plugin.name);
                    theWave.params.plugins.pop();
                }
            });

            return Object.assign({}, state, {
                wave: theWave
            });
        case Types.SET_OPTIONS:
            return Object.assign({}, state, {
                songData: {
                    ...action.payload
                }
            });
        case Types.SET_WAVE:
            return Object.assign({}, state, {
                waveInitialized: true,
                wave: action.payload.ourWave
            });
        case Types.REPLACE_AUDIO:
            return Object.assign({}, state, {
                wave: action.payload.ourWave
            });
        case Types.CLIP_AUDIO:
            return Object.assign({}, state, {
                wave: action.payload.wave
            });
        case Types.PLAY_REGION:
            return Object.assign({}, state, {
                wave: action.payload.wave,
                audio: action.payload.audio
            });
        default:
            return state;
    }
};

// Exports the Application Reducer as the Application's State
export type WaveState = ReturnType<typeof waveReducer>;

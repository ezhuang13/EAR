import * as Types from './wavesurferTypes';
import { initialWaveState } from './wavesurferReducer';
import WaveSurfer from 'wavesurfer.js';
import Pizzicato from 'pizzicato';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js';

/********** List of Actions for Dispatch Props **********/
export interface DispatchProps {
    initializeWave: typeof initializeWave,
    changeWaveColor: typeof changeWaveColor,
    changeProgressColor: typeof changeProgressColor,
    addPlugin: typeof addPlugin,
    setOptions: typeof setOptions,
    replaceAudio: typeof replaceAudio,
    removePlugin: typeof removePlugin,
    clipAudio: typeof clipAudio,
    playRegion: typeof playRegion
}

/********** Action Creators for the Synchronous Typed Actions **********/
export const changeWaveColor = (color: string, wave: any) => {
    wave.setProgressColor(color);
    return ({
        type: Types.CHANGE_WAVE_COLOR,
        payload: {
            color,
            wave
        }
    });
};

export const changeProgressColor = (color: string, wave: any) => {
    wave.setWaveColor(color);
    return ({
        type: Types.CHANGE_PROGRESS_COLOR,
        payload: {
            color,
            wave
        }
    });
};

export const addPlugin = (pluginType: string, wave: any) => {
    return ({
        type: Types.ADD_PLUGIN,
        payload: {
            pluginType,
            wave
        }
    });
};

export const setOptions = (options: object) => {
    return ({
        type: Types.SET_OPTIONS,
        payload: {
            options
        }
    });
};

export const setWave = (wave: any) => {
    return({
        type: Types.SET_WAVE,
        payload: {
            ourWave: wave
        }
    });
};

export const replaceAudio = (newBlob: Blob, currentWave: any) => {

    // Load the New Blob and Re-Draw the Wavesurfer
    currentWave.loadBlob(newBlob);
    currentWave.drawBuffer();

    // Return the Action for the Reducer
    return ({
        type: Types.REPLACE_AUDIO,
        payload: {
            ourWave: currentWave
        }
    });
};

export const removePlugin = (pluginType: string, currentWave: any) => {
    return ({
        type: Types.REMOVE_PLUGIN,
        payload: {
            pluginType,
            wave: currentWave
        }
    });
};

export const clipAudio = (audio: any, currentWave: any, duration?: number) => {
    return ({
        type: Types.CLIP_AUDIO,
        payload: {
            audio,
            wave: currentWave
        }
    });
};

export const playRegion = (audio: any, wave: any, isPlaying: boolean) => {

    // Check if the Region is initialized!
    if (typeof wave.initialisedPluginList.regions !== 'undefined') {

        // Always pause the audio before performing a waveform or audio change.
        audio.pause();

        // Obtain the list of keys for the waveform regions.
        const keys = Object.keys(wave.regions.list);

        // Obtain the start of the first region (time).
        const regionStart = wave.regions.list[keys[0]].start;

        // Set the audio's offsetTime.
        audio.offsetTime = regionStart;

        // Set the waveform's currentTime.
        wave.setCurrentTime(regionStart);

        // Check if we should continue playing.
        if (isPlaying) {
            audio.play();
            wave.play();
        } else {
            wave.pause();
            audio.pause();
        }
    } else {
        console.log('Tried to play a non-existent region!');
    }

    return ({
        type: Types.PLAY_REGION,
        payload: {
            audio,
            wave
        }
    });
};

/********** Action Creators for Asynchronous Typed Actions **********/
type ThunkActionType = ThunkAction<Promise<void>, {}, {}, AnyAction>;

// Initializes the Wave based on the inputted audioBlob
export const initializeWave = (audioBlob: Blob): ThunkActionType => {
        return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
            return new Promise<void>((resolve: any) => {

                // Create the WaveSurfer waveform.
                const ourWave = WaveSurfer.create({
                    container: '#wavesurfer',
                    waveColor: initialWaveState.waveColor,
                    progressColor: initialWaveState.progressColor,
                    audioContext: Pizzicato.context,
                    plugins: [
                        CursorPlugin.create({
                            showTime: true,
                            opacity: 1,
                            customShowTimeStyle: {
                                'background-color': '#000',
                                'color': '#fff',
                                'padding': '2px',
                                'font-size': '10px'
                            }
                        })
                    ]
                });

                // Load the Audio
                ourWave.loadBlob(audioBlob);

                // Turn off the WaveSurfer's internal audio player.
                ourWave.toggleMute();

                // Return and resolve the promise
                ourWave.on('ready', () => {
                    dispatch(setWave(ourWave));
                    return resolve();
                });
            });
        };
};

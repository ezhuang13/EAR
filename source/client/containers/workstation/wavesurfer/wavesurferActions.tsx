import * as Types from './wavesurferTypes';
import { initialWaveState } from './wavesurferReducer';
import WaveSurfer from 'wavesurfer.js';
import Pizzicato from 'pizzicato';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js';
import * as EffectsConstants from '../better_effects/effectConstants';
import { toggleEffect } from '../workstationActions';
import interact from 'interactjs';

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
    playRegion: typeof playRegion,
    addRegionOptions: typeof addRegionOptions
}

const generatePlugin = (pluginType: string, wave: any) => {
    let ourPlugin: any = null;
    switch (pluginType) {
        case 'regions':
            ourPlugin = RegionsPlugin.create({
                    regions: [
                        {
                            start: 0.2 * wave.backend.buffer.duration,
                            end: 0.3 * wave.backend.buffer.duration,
                            color: 'hsla(400, 100%, 30%, 0.5)'
                        }
                    ],
                    dragSelection: {
                        slop: 5
                    }
                });
            break;
        case 'cursor':
            ourPlugin = CursorPlugin.create({
                showTime: true,
                opacity: 1
            });
            break;
        default:
            break;
    }
    return ourPlugin;
};

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

export const addPlugin = (pluginType: string, wave: any): ThunkActionType => {
    return async (): Promise<void> => {
        return new Promise<void>((resolve: any) => {

            // Obtain the payload's wave, then generate the appropriate Wavesurfer Plugin
            const ourPlugin = generatePlugin(pluginType, wave);

            // Check the Wavesurfer's Initialized Plugin List
            // Assign "null" if initialized already, ourPlugin if not
            const pluginToAdd = (wave.initialisedPluginList[pluginType]) ? null : ourPlugin;

            if (pluginToAdd !== null) {
                // Add and initialize the Wavesurfer plugin, add it to the params!
                wave.addPlugin(pluginToAdd);
                wave.initPlugin(pluginToAdd.name);
                wave.params.plugins.push(pluginToAdd);
                wave.disableDragSelection();
            } else {
                wave.addRegion({start: 5, end: 10});
            }
            return resolve();
        });
    };
};

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

export const addRegionOptions = (currentKey: string, numberID: string, wave: any,
                                 audio: any, checkedEffects: object): ThunkActionType => {
    return (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>((resolve: any) => {
            // Obtains the region for the currentKey.
            const region = document.querySelector('[data-id="' + currentKey + '"]');

            // Create and append the region label if it doesn't exist yet.
            // TODO: Figure out a way to not have to modify the DOM (though it won't be that easy).
            if (region.getAttribute('data-exist') !== 'true') {
                region.setAttribute('data-exist', 'true');
                const headerElem = document.createElement('h1');
                const textNode = document.createTextNode(numberID);
                headerElem.appendChild(textNode);
                headerElem.style.cssText = 'margin-top: 5px; margin-left: 5px;';
                region.appendChild(headerElem);
            }

            // Obtain a list of effects as HTML ID's (for the dropzone handling)
            const effectsListIds = EffectsConstants.EffectList.map((element) => {
                return '#' + element;
            });
            const singleStringEffects = effectsListIds.join(', ');

            // Attach to the wavesurfer region and add a dropzone handler for effects.
            const dropTarget = interact(region);
            dropTarget.dropzone({
                ondrop: (event) => {
                    const effectType = event.relatedTarget.title;
                    if (!checkedEffects[currentKey][effectType]) {
                        dispatch(toggleEffect(effectType, wave, audio, currentKey));
                    }
                },
                accept: singleStringEffects
            });
            return resolve();
        });
    };
};
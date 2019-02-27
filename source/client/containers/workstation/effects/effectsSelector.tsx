import * as React from 'react';

import * as Constants from './effectConstants';
import EffectsCheckbox from './effectsCheckbox';

class EffectsSelector extends React.Component<any> {

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    render() {
        const checkBoxValues = {
            'Compressor': Constants.COMPRESSOR,
            'Delay': Constants.DELAY,
            'Distortion': Constants.DISTORTION,
            'Dub': Constants.DUB,
            'Flanger': Constants.FLANGER,
            'Ping-Pong': Constants.PING_PONG,
            'Quadrafuzz': Constants.QUADRAFUZZ,
            'Reverb': Constants.REVERB,
            'Ring Modulator': Constants.RING_MOD,
            'Stereo Panner': Constants.STEREO_PANNER,
            'Tremolo': Constants.TREMOLO
        };

        const effectsCheckbox = [];
        for (const key in checkBoxValues) {
            if (checkBoxValues.hasOwnProperty(key)) {
                const currentValue = checkBoxValues[key];

                // Key attribute is necessary to make different checkboxes distinct!
                const currentBox =
                        <EffectsCheckbox
                            inputName={key}
                            identifier={currentValue}
                            key={key}
                        />;
                effectsCheckbox.push(currentBox);
            }
        }
        return (
            <React.Fragment>
                {effectsCheckbox}
            </React.Fragment>
        );
    }
}

// This method wraps the component with the store and dispatch!!!
export default EffectsSelector;

import * as React from 'react';

import * as Constants from './effectConstants';
import EffectCheckbox from './effectCheckbox';

const EffectsSelector = (props: {}) => {
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
    const checkBoxes = [];
    for (const key of Object.keys(checkBoxValues)) {
        checkBoxes.push(<EffectCheckbox name={key} identifier={checkBoxValues[key]} key={key}/>);
    }

    return (
        <React.Fragment>
            <div>Add Effects: </div>
            {checkBoxes}
        </React.Fragment>
    );
};

// This method wraps the component with the store and dispatch!!!
export default EffectsSelector;

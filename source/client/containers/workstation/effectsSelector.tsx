import * as React from 'react';
import { Fragment, Component } from 'react';

import * as Constants from './effectConstants';
import EffectCheckbox from './effectCheckbox';

// Combined Props Type for EffectsSelector Component (Dispatch and State)
export type EffectsSelectorProps = {}

// TODO: Make this stateless
class EffectsSelector extends Component<EffectsSelectorProps> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
            	<div>Add Effects: </div>
                <EffectCheckbox name="Compressor" identifier={Constants.COMPRESSOR}/>
                <EffectCheckbox name="Delay" identifier={Constants.DELAY}/>
                <EffectCheckbox name="Distortion" identifier={Constants.DISTORTION}/>
                <EffectCheckbox name="Dub" identifier={Constants.DUB}/>
                <EffectCheckbox name="Flanger" identifier={Constants.FLANGER}/>
                <EffectCheckbox name="Ping-Pong" identifier={Constants.PING_PONG}/>
                <EffectCheckbox name="Quadrafuzz" identifier={Constants.QUADRAFUZZ}/>
                <EffectCheckbox name="Reverb" identifier={Constants.REVERB}/>
                <EffectCheckbox name="Ring Modulator" identifier={Constants.RING_MOD}/>
                <EffectCheckbox name="Stereo Panner" identifier={Constants.STEREO_PANNER}/>
                <EffectCheckbox name="Tremolo" identifier={Constants.TREMOLO}/>
            </Fragment>
        );
    }
}

// This method wraps the component with the store and dispatch!!!
export default EffectsSelector;
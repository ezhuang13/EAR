import * as React from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Utility from '../../../utility/shared';
import * as Constants from './effectConstants';

// Imports for Application State
import { MainState } from '../../../reducers';
import * as WorkstationActions from './../workstationActions';
import { WorkstationState } from './../workstationReducer';

import MusicSlider from '../../../components/slider';

export type EffectCustomizerProps = WorkstationActions.DispatchProps & WorkstationState;

class EffectCustomizer extends React.Component<EffectCustomizerProps> {

    constructor(props: EffectCustomizerProps) {
        super(props);

        this.onSliderChange = this.onSliderChange.bind(this);
    }

    onSliderChange(value: number, effectOption: string) {
        this.props.modifyEffect(this.props.selectedEffect, Constants.optionLabelToParam[effectOption], value);
    }

    render() {
        let effectName = '';
        const sliders = [];
        if (this.props.selectedEffect) {
            effectName = Constants.toDisplayString(this.props.selectedEffect);
            const sliderOptions = Constants.sliderOptions[this.props.selectedEffect];
            sliderOptions.forEach((options: any, index: number) => {
                const currentSlider = (
                    <MusicSlider
                        {...options}
                        onAfterChange={this.onSliderChange}
                        key={index + effectName}
                    />
                );
                sliders.push(currentSlider);
            });
        }
        return (
            <React.Fragment>
                <div>Customize your Effects!!</div>
                {effectName}
                {sliders}
            </React.Fragment>
        );
    }
}

// This gives the component access to the store (state)
const mapStateToProps = (state: MainState) => {
    return {
        selectedEffect: state.workstation.selectedEffect,
    };
};

// This gives the component access to dispatch / the actions
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>):
    WorkstationActions.DispatchProps => {
    return bindActionCreators({
        modifyEffect: WorkstationActions.modifyEffect,
    }, dispatch);
};

// This method wraps the component with the store and dispatch!!!
export default connect(mapStateToProps, mapDispatchToProps)(EffectCustomizer);

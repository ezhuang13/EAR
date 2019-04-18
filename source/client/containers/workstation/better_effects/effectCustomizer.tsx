import * as React from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { optionLabelToParam, sliderOptions, toDisplayString } from './effectConstants';

// Imports for Application State
import { MainState } from '../../../reducers';
import * as WorkstationActions from './../workstationActions';
import { WorkstationState } from './../workstationReducer';

import MusicSlider from '../../../components/slider';
import { SliderGrids, EffectBox, UnderlineText } from '../../../utility/shared';

export type EffectCustomizerProps = WorkstationActions.DispatchProps & WorkstationState;

class EffectCustomizer extends React.Component<EffectCustomizerProps> {

    constructor(props: EffectCustomizerProps) {
        super(props);

        this.onSliderChange = this.onSliderChange.bind(this);
    }

    onSliderChange(value: number, effectOption: string) {
        this.props.modifyEffect(this.props.selectedEffect,
            optionLabelToParam[effectOption],
            value);
    }

    render() {
        let effectName = '';
        const sliders = [];
        if (this.props.selectedEffect) {
            effectName = toDisplayString(this.props.selectedEffect);
            const sliderOption = sliderOptions[this.props.selectedEffect];
            sliderOption.forEach((options: any, index: number) => {
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
        const col1Sliders = sliders.slice(0, 3);
        const col2Sliders = sliders.slice(3);
        return (
            <EffectBox
                colStart={5}
                colEnd={11}
            >
                <UnderlineText>Customize the {effectName} effect</UnderlineText>
                <SliderGrids
                    col1={col1Sliders}
                    col2={col2Sliders}
                />
            </EffectBox>
        );
    }
}

// This gives the component access to the store (state)
const mapStateToProps = (state: MainState) => {
    return {
        selectedEffect: state.workstation.selectedEffect,
        checkedEffects: state.workstation.checkedEffects,
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

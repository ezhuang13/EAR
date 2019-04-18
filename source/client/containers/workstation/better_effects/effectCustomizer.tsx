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
import styled from 'styled-components';
import { SliderGrids } from '../../../utility/shared';

const EffectBox = styled.div`
    grid-column-start: 5;
    grid-column-end: 11;
    padding: 5px;
    margin-left: 1em;
    border: 2px black solid;
`;

export type EffectCustomizerProps = WorkstationActions.DispatchProps & WorkstationState;

class EffectCustomizer extends React.Component<EffectCustomizerProps> {

    constructor(props: EffectCustomizerProps) {
        super(props);

        this.onSliderChange = this.onSliderChange.bind(this);
        this.makeRow = this.makeRow.bind(this);
    }

    onSliderChange(value: number, effectOption: string) {
        this.props.modifyEffect(this.props.selectedEffect,
            Constants.optionLabelToParam[effectOption],
            value);

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
        const col1Sliders = sliders.slice(0, 3);
        const col2Sliders = sliders.slice(3);
        return (
            <EffectBox>
                <div>Customize the {effectName} effect</div>
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

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
import Grid from '@material-ui/core/Grid';

const EffectBox = styled.div`
    grid-column-start: 5;
    grid-column-end: 11;
    padding: 5px;
    margin-left: 1em;
    border: 2px black solid;
`;

const EndSliders = styled.div`
    margin-left: 1.5em;
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
            // this.props.checkedEffects[this.props.region][this.props.selectedEffect],
            // this.props.region);
    }

    makeRow(sliders: list) {
        return (<React.Fragment>
                    <Grid item xs={4}>
                        {sliders[0]}
                    </Grid>
                    <Grid item xs={4}>
                        {sliders[1]}
                    </Grid>
                    <Grid item xs={4}>
                        {sliders[2]}
                    </Grid>
                </React.Fragment>
          )
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
        const row1Sliders = sliders.slice(0, 3);
        const row2Sliders = sliders.slice(3);
        return (
            <EffectBox>
                <div>Customize the {effectName} effect</div>
                <Grid container spacing = {32}>
                    <Grid item md={4}>
                        {row1Sliders}
                    </Grid>
                    <Grid item md={4}>
                        <EndSliders>
                            {row2Sliders}
                        </EndSliders>
                    </Grid>
                </Grid>
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

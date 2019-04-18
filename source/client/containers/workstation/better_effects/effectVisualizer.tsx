import * as React from 'react';
import * as Utility from '../../../utility/shared';
import * as Constants from './effectConstants';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { MainState } from '../../../reducers';
import * as WorkstationActions from '../workstationActions';
import styled from 'styled-components';

const EffectBox = styled.div`
    grid-column-start: 3;
    grid-column-end: 5;
    padding: 5px;
    margin-left: 1em;
    border: 2px black solid;
`;

const UnderlineText = styled.div`
    text-decoration: underline;
`;

class EffectVisualizer extends React.Component<any> {
    constructor(props: any) {
        super(props);
        this.createEffects = this.createEffects.bind(this);
        this.removeEffect = this.removeEffect.bind(this);
    }

    removeEffect(event) {
        const clickedEffect = event.target.value;
        if (this.props.checkedEffects[this.props.currentKey][clickedEffect]) {
            this.props.toggleEffect(clickedEffect, this.props.wave, this.props.audio, this.props.currentKey);
        }
    }

    createEffects() {
        const effectVisualizer = [];
        Constants.EffectList.forEach((effectName, index) => {
            if (this.props.currentKey) {
                const effectText = this.props.checkedEffects[this.props.currentKey][effectName] ? '(checked)' : '';
                const checkedEffect = <div style={{display: 'inline-block', marginLeft: '1em'}}>{effectText}</div>;
                const currentEffect = (
                    <React.Fragment key={index}>
                        <button
                            style={{display: 'inline-block'}}
                            onClick={this.removeEffect}
                            value={effectName}
                        >
                        -X-
                        </button>
                        <div
                            id={effectName + '-remove'}
                            title={effectName}
                            style={{display: 'inline-block', marginLeft: '1em'}}
                        >
                        {effectName.toLocaleLowerCase()}
                        </div>
                        {checkedEffect}
                        <br/>
                    </React.Fragment>
                );
                effectVisualizer.push(currentEffect);
            }
        });
        return effectVisualizer;
    }

    render() {
        const ourEffects = this.createEffects();
        return (
            <EffectBox>
                <UnderlineText>Remove Effects {this.props.regionNumber}</UnderlineText>
                {ourEffects}
            </EffectBox>
        );
    }
}

// This gives the component access to the store (state)
const mapStateToProps = (state: MainState) => {
    return {
        checkedEffects: state.workstation.checkedEffects,
        effects: state.workstation.effects,
        audio: state.workstation.audio,
        wave: state.wave.wave
    };
};

// This gives the component access to dispatch / the actions
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>):
    WorkstationActions.DispatchProps => {
    return bindActionCreators({
        toggleEffect: WorkstationActions.toggleEffect,
        removeEffects: WorkstationActions.removeEffects,
    }, dispatch);
};

// This method wraps the component with the store and dispatch!!!
export default connect(mapStateToProps, mapDispatchToProps)(EffectVisualizer);
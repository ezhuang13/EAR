import * as React from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dragMoveListener, EffectBox, UnderlineText } from '../../../utility/shared';
import { EffectList, toDisplayString } from './effectConstants';

// Imports for Application State
import { MainState } from '../../../reducers';
import * as WorkstationActions from './../workstationActions';
import { WorkstationState } from './../workstationReducer';

import interact from 'interactjs';

export type EffectSourceProps = WorkstationActions.DispatchProps & WorkstationState;

class EffectSource extends React.Component<EffectSourceProps> {

    constructor(props: EffectSourceProps) {
        super(props);

        this.createEffects = this.createEffects.bind(this);
        this.selectEffect = this.selectEffect.bind(this);
    }

    selectEffect(effectName: string) {
        this.props.selectEffect(effectName);
    }

    componentDidMount() {
        EffectList.forEach((effectName, index)  => {
            interact('#' + effectName).draggable({
                inertia: true,
                autoScroll: true,
                onmove: dragMoveListener,
                onend: (event) => {
                    // Obtain the event target.
                    const target = event.target;

                    // Translate / move the element.
                    target.style.webkitTransform =
                    target.style.transform =
                        'translate(' + 0 + 'px, ' + 0 + 'px)';

                    // Update the position attributes for interact.js.
                    target.setAttribute('data-x', 0);
                    target.setAttribute('data-y', 0);
                }
            });
        });
    }

    componentWillUnmount() {
        // Need to remove all interact.js objects before unmounting (resets positions
        // if we navigate back to the page).
        EffectList.forEach((effectName) => {
            interact('#' + effectName).unset();
        });
    }

    createEffects() {
        const effectSource = [];
        EffectList.forEach((effectName, index) => {
            const selectFnx = () => this.selectEffect(effectName);
            const selected = effectName === this.props.selectedEffect ? ' (selected)' : '';
            const displayName = toDisplayString(effectName) + selected;
            const currentEffect = (
            <div
                id={effectName}
                title={effectName}
                style={{touchAction: 'none', position: 'sticky', zIndex: 10}}
                key={index}
                onClick={selectFnx}
            >{displayName}
            </div>);
            effectSource.push(currentEffect);
        });
        return effectSource;
    }

    render() {
        const ourEffects = this.createEffects();
        return (
            <EffectBox
                colStart={1}
                colEnd={3}
            >
                <UnderlineText>Drag and Drop Effects</UnderlineText>
                {ourEffects}
            </EffectBox>
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
        selectEffect: WorkstationActions.selectEffect,
    }, dispatch);
};

// This method wraps the component with the store and dispatch!!!
export default connect(mapStateToProps, mapDispatchToProps)(EffectSource);

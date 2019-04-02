import * as React from 'react';
import Pizzicato from 'pizzicato';
import * as Utility from '../../../utility/shared';
import * as Constants from './effectConstants';

import interact from 'interactjs';
import styled from 'styled-components';

const EffectBox = styled.div`
    display: inline-block;
    border: 2px black solid;
    padding: 5px;
`;

const UnderlineText = styled.div`
    text-decoration: underline;
`;

class EffectSource extends React.Component {
    constructor(props: any) {
        super(props);
        this.createEffects = this.createEffects.bind(this);
    }

    componentDidMount() {
        Constants.EffectList.forEach((effectName, index)  => {
            interact('#' + effectName).draggable({
                inertia: true,
                autoScroll: true,
                onmove: Utility.dragMoveListener,
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
        Constants.EffectList.forEach((effectName) => {
            interact('#' + effectName).unset();
        });
    }

    createEffects() {
        const effectSource = [];
        Constants.EffectList.forEach((effectName, index) => {
            const moddedName = effectName.toLocaleLowerCase();
            const displayName = moddedName.charAt(0).toUpperCase() + moddedName.slice(1);
            const currentEffect = (
            <div
                id={effectName}
                title={effectName}
                style={{touchAction: 'none', position: 'sticky', zIndex: 10}}
                key={index}
            >{displayName}
            </div>);
            effectSource.push(currentEffect);
        });
        return effectSource;
    }

    render() {
        const ourEffects = this.createEffects();
        return (
            <EffectBox>
                <UnderlineText>Drag and Drop Effects!</UnderlineText>
                {ourEffects}
            </EffectBox>
        );
    }
}

export default EffectSource;

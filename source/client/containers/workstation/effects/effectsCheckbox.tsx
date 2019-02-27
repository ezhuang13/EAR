import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Imports for Actions and Types
import * as Actions from '../workstationActions';
import { ThunkDispatch } from 'redux-thunk';

// Imports for Application State (based on the reducer)
import { MainState } from '../../../reducers';

const Input = styled.input``;
const Label = styled.label`
    display: block;
`;

class EffectCheckbox extends React.Component<any> {
    constructor(props) {
        super(props);
        this.localToggleEffect = this.localToggleEffect.bind(this);
    }

    shouldComponentUpdate(nextProps: any) {
        const { checkedEffects } = this.props;
        const newEffects = nextProps.checkedEffects;

        for (const key in newEffects) {
            if (!newEffects.hasOwnProperty(key)) continue;
            const value = newEffects[key];
            if (checkedEffects[key] !== value) {
                return true;
            }
        }
        return false;
    }

    localToggleEffect() {
        this.props.toggleEffect(this.props.identifier, this.props.wave);
    }

    render() {
        const { checkedEffects, identifier, inputName } = this.props;
        const ourChecked = checkedEffects[identifier];

        return (
            <React.Fragment key={identifier}>
                <Label key={identifier}>
                    <Input
                        type='checkbox'
                        checked={ourChecked ? ourChecked : false}
                        onChange={this.localToggleEffect}
                        key={identifier}
                    />
                    {inputName}
                </Label>
            </React.Fragment>
        );
    }
}

// This gives the component access to the store (state)
const mapStateToProps = (state: MainState) => {
    return {
        checkedEffects: state.workstation.checkedEffects,
        wave: state.wave.wave,
        audio: state.workstation.audio
    };
};

// This gives the component access to dispatch / the actions
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): Actions.DispatchProps => {
    return bindActionCreators({
        toggleEffect: Actions.toggleEffect
    }, dispatch);
};

// This method wraps the component with the store and dispatch!!!
export default connect(mapStateToProps, mapDispatchToProps)(EffectCheckbox);

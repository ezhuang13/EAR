import * as React from 'react';
import { ThunkDispatch } from 'redux-thunk';

import { connect } from 'react-redux';

// Imports for Actions and Types
import * as Actions from './workstationActions';

// Imports for Application State (based on the reducer)
import { MainState } from '../../reducers';
import { WorkstationState } from './workstationReducer';

interface LocalProps {
    name: string;
    identifier: string;
}

// Combined Props Type for Register Component (Dispatch and State)
export type EffectCheckboxProps = LocalProps & Actions.DispatchProps & WorkstationState;

class EffectCheckbox extends React.Component<EffectCheckboxProps, any> {
    constructor(props: EffectCheckboxProps) {
        super(props);

        this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
    }

    // TODO(eric): fix this so it updates faster, perhaps make async?
    toggleCheckboxChange(effect: string) {
        this.props.toggleEffect(effect);
    }

    render() {
        return (
            <React.Fragment>
                <label>
                <input
                    type='checkbox'
                    checked={this.props.checkedEffects[this.props.identifier]}
                    onChange={() => this.toggleCheckboxChange(this.props.identifier)}
                />
                {this.props.name}
                </label>
                <br/>
            </React.Fragment>
        );
    }
}

// This gives the component access to the store (state)
const mapStateToProps = (state: MainState) => {
    return {
        checkedEffects: state.workstation.checkedEffects
    };
};

// This gives the component access to dispatch / the actions
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): Actions.DispatchProps => {
    return {
        toggleEffect: (effect: string) => { dispatch(Actions.toggleEffect(effect)); }
    };
};

// This method wraps the component with the store and dispatch!!!
export default connect(mapStateToProps, mapDispatchToProps)(EffectCheckbox);

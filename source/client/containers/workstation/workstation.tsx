import * as React from 'react';
import { Fragment, Component } from 'react';
import { ThunkDispatch } from 'redux-thunk';

import { connect } from 'react-redux';

// Imports for Actions and Types
import * as Actions from './workstationActions';

// Imports for Application State (based on the reducer)
import { MainState } from '../../reducers';
import { RouteComponentProps } from 'react-router';
import { WorkstationState } from './workstationReducer';
import { CreateProjectState } from '../createProject/createProjectReducer';

// Import custom components
import MusicSlider from '../../components/slider';
import EffectsSelector from './effectsSelector';

// Interface for what we want to pass as props from the parent component
interface ParentProps extends RouteComponentProps<{}> {}

// Combined Props Type for Workstation Component (Dispatch and State)
export type WorkstationProps = Actions.DispatchProps & ParentProps & WorkstationState & CreateProjectState;

// TODO(Eric): Look into react-soundplayer, soundcloud-audio,
// and react audio spectrum for visualization and playback tools
// TODO(all): css libraries (basecss, boostrap) for design and layout
// Ideas: change frequency, add effects, compressor, lowpass/highpass filter
class Workstation extends Component<WorkstationProps, any> {
    constructor(props: WorkstationProps) {
        super(props);

        this.state = {
            play: true
        };

        this.changeVolume = this.changeVolume.bind(this);
        this.togglePlay = this.togglePlay.bind(this);
    }

    componentDidMount() {
        this.props.createSound(this.props.url);
    }

    changeVolume(value: number) {
        // Volume is between 0 and 1
        this.props.volumeChange(value / 100);
    }

    togglePlay() {
        // workaround, figure out sound so that it stops playing current, starts playing new
        // this does cause a rerender!!
        if (this.state.play) {
            this.props.audio.play();
        }
        else {
            this.props.audio.pause();
        }
        this.setState({ play: !this.state.play });
    }
     
    render() {
        let buttonName = this.state.play ? "Play" : "Pause";
        
        return (
            <Fragment>
                <h1>Workshop your Audio</h1>
                <button onClick={this.togglePlay}>{buttonName}</button>
                <MusicSlider min={0} max={100} step={1} defaultValue={50} label={"Volume: " + Math.round(this.props.volume*100)}
                onAfterChange={this.changeVolume}/>
                <EffectsSelector/>
            </Fragment>
        );
    }
}


// This gives the component access to the store (state)
const mapStateToProps = (state: MainState) => {
    return {
        volume: state.workstation.volume,
        url: state.createProject.url,
        audio: state.workstation.audio
    };
}

// This gives the component access to dispatch / the actions
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): Actions.DispatchProps => {
    return {
        volumeChange: (volume: number) => { dispatch(Actions.volumeChange(volume)); },
        createSound: (url: string) => { dispatch(Actions.createSound(url)); }
    }
}

// This method wraps the component with the store and dispatch!!!
export default connect(mapStateToProps, mapDispatchToProps)(Workstation);
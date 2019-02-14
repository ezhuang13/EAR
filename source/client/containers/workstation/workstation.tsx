import * as React from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';

// Imports for Application State
import { MainState } from '../../reducers';
import { RouteComponentProps } from 'react-router';
import { WorkstationState } from './workstationReducer';
import { CreateProjectState } from '../createProject/createProjectReducer';
import * as Actions from './workstationActions';

// Import custom components and 3rd party libs
import MusicSlider from '../../components/slider';
import EffectsSelector from './effectsSelector';
import RecordButton from './recordButton';

// Interface for what we want to pass as props from the parent component
interface ParentProps extends RouteComponentProps<{}> {}

// Combined Props Type for Workstation Component (Dispatch and State)
export type WorkstationProps = Actions.DispatchProps & ParentProps & WorkstationState & CreateProjectState;

// TODO(Eric): Look into react-soundplayer, soundcloud-audio,
// and react audio spectrum for visualization and playback tools
// TODO(all): css libraries (basecss, boostrap) for design and layout
class Workstation extends React.Component<WorkstationProps, any> {

    constructor(props: WorkstationProps) {
        super(props);

        this.changeVolume = this.changeVolume.bind(this);
        this.stopAudio = this.stopAudio.bind(this);
        this.togglePlay = this.togglePlay.bind(this);
    }

    componentDidMount() {
        this.props.createSound(this.props.url);
    }

    changeVolume(value: number) {
        this.props.volumeChange(value / 100); // Volume is between 0 and 1
    }

    stopAudio() {
        this.props.audio.stop();
        this.props.setPlay(false);
    }

    togglePlay() {
        this.props.isPlaying ? this.props.audio.pause()
                             : this.props.audio.play();
        this.props.setPlay(!this.props.isPlaying);
    }

    render() {
        const playButton = this.props.isPlaying ? 'Pause' : 'Play';
        const downloadButton = this.props.downloadUrl === '' ? <div/> :
            <a href={this.props.downloadUrl} download='test'> Download </a>;

        return (
            <React.Fragment>
                <h1>Workshop your Audio!!</h1>
                <button onClick={this.togglePlay}>{playButton}</button>
                <button onClick={this.stopAudio}>Reset</button>
                <RecordButton/>
                <MusicSlider
                    min={0}
                    max={100}
                    step={1}
                    defaultValue={50}
                    label={'Volume: ' + Math.round(this.props.volume * 100)}
                    onAfterChange={this.changeVolume}
                />
                <EffectsSelector/>
                <br/>
                {downloadButton}
            </React.Fragment>
        );
    }
}

// This gives the component access to the store (state)
const mapStateToProps = (state: MainState) => {
    return {
        volume: state.workstation.volume,
        url: state.createProject.url,
        audio: state.workstation.audio,
        isPlaying: state.workstation.isPlaying,
        downloadUrl: state.workstation.downloadUrl,
    };
};

// This gives the component access to dispatch / the actions
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): Actions.DispatchProps => {
    return {
        volumeChange: (volume: number) => { dispatch(Actions.volumeChange(volume)); },
        createSound: (url: string) => { dispatch(Actions.createSound(url)); },
        setPlay: (isPlaying: boolean) => { dispatch(Actions.setPlay(isPlaying)); },
    };
};

// This method wraps the component with the store and dispatch!!!
export default connect(mapStateToProps, mapDispatchToProps)(Workstation);

import * as React from 'react';
import { Link } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Imports for Application State
import { MainState } from '../../reducers';
import { RouteComponentProps } from 'react-router';
import { WorkstationState } from './workstationReducer';
import { ProjectsState } from '../projects/projectsReducer';
import * as Actions from './workstationActions';
import * as ProjectsActions from '../projects/projectsActions';
import * as ProjectsTypes from '../projects/projectsTypes';

// Import custom components and 3rd party libs
import MusicSlider from '../../components/slider';
import EffectsSelector from './effectsSelector';
import RecordButton from './recordButton';
import RecorderButtons from './recorderButtons';

// Interface for what we want to pass as props from the parent component
interface ParentProps extends RouteComponentProps<{}> {}

// Combined Props Type for Workstation Component (Dispatch and State)
export type WorkstationProps = Actions.DispatchProps & ParentProps & ProjectsActions.DispatchProps
& WorkstationState & ProjectsState;

// TODO(Eric): Look into react-soundplayer, soundcloud-audio,
// and react audio spectrum for visualization and playback tools
// TODO(all): css libraries (basecss, boostrap) for design and layout
class Workstation extends React.Component<WorkstationProps, any> {

    constructor(props: WorkstationProps) {
        super(props);

        this.replaceAudio = this.replaceAudio.bind(this);
        this.changeVolume = this.changeVolume.bind(this);
        this.stopAudio = this.stopAudio.bind(this);
        this.togglePlay = this.togglePlay.bind(this);
    }

    componentDidMount() {
        const url = URL.createObjectURL(this.props.projects[this.props.currentProject].audio);
        this.props.createSound(url);
    }

    componentWillUnmount() {
        this.props.audio.stop();
        this.props.setPlay(false);
    }

    replaceAudio(project: ProjectsTypes.ProjectKV) {
        this.props.createProject(project);
        const url = URL.createObjectURL(this.props.download);
        this.props.createSound(url);
        this.props.removeEffects();
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

    // TODO: ask hemingway why I have to pass ...this.props to RecorderButtons
    render() {
        const playButton = this.props.isPlaying ? 'Pause' : 'Play';

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
                <RecorderButtons replaceAudio={this.replaceAudio} {...this.props}/>
                <br/>
                <Link to={`/projects/`}>My Projects</Link>
            </React.Fragment>
        );
    }
}

// This gives the component access to the store (state)
const mapStateToProps = (state: MainState) => {
    return {
        volume: state.workstation.volume,
        currentProject: state.projects.currentProject,
        projects: state.projects.projects,
        audio: state.workstation.audio,
        isPlaying: state.workstation.isPlaying,
        download: state.workstation.download,
    };
};

// This gives the component access to dispatch / the actions
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>):
    Actions.DispatchProps & ProjectsActions.DispatchProps => {
    return bindActionCreators({
        volumeChange: Actions.volumeChange,
        createSound: Actions.createSound,
        setPlay: Actions.setPlay,
        createProject: ProjectsActions.createProject,
        removeEffects: Actions.removeEffects,
    }, dispatch);
};

// This method wraps the component with the store and dispatch!!!
export default connect(mapStateToProps, mapDispatchToProps)(Workstation);

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
import { WaveState } from './wavesurfer/wavesurferReducer';
import * as WorkstationActions from './workstationActions';
import * as WaveActions from './wavesurfer/wavesurferActions';
import * as ProjectsActions from '../projects/projectsActions';
import * as ProjectsTypes from '../projects/projectsTypes';

// Import custom components and 3rd party libs
import MusicSlider from '../../components/slider';
import EffectsSelector from './effects/effectsSelector';
import RecordButton from './recording/recordButton';
import Wave from './wavesurfer/wavesurfer';
import RecorderButtons from './recording/recorderButtons';

// Interface for what we want to pass as props from the parent component
interface ParentProps extends RouteComponentProps<{}> {}

// Combined Props Type for Workstation Component (Dispatch and State)
export type WorkstationProps = WorkstationActions.DispatchProps & ProjectsActions.DispatchProps &
WaveActions.DispatchProps & WorkstationState & ProjectsState & WaveState & ParentProps;

// TODO(all): css libraries (basecss, boostrap) for design and layout
class Workstation extends React.Component<WorkstationProps, any> {

    constructor(props: WorkstationProps) {
        super(props);

        this.replaceAudio = this.replaceAudio.bind(this);
        this.changeVolume = this.changeVolume.bind(this);
        this.stopAudio = this.stopAudio.bind(this);
        this.togglePlay = this.togglePlay.bind(this);
        this.playRegion = this.playRegion.bind(this);
        this.deleteRegion = this.deleteRegion.bind(this);
        this.addPlugin = this.addPlugin.bind(this);
        this.clipAudio = this.clipAudio.bind(this);
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
        const url = URL.createObjectURL(this.props.downloadBlob);
        this.props.createSound(url);
        this.props.removeEffects();
    }

    changeVolume(value: number) {

        // Change the master volume.
        this.props.volumeChange(value / 100); // Volume is between 0 and 1
    }

    stopAudio() {

        // Stop the Audio and Wavesurfer when stopAudio() is called.
        this.props.audio.stop();
        this.props.wave.stop();

        // Turn off the isPlaying flag.
        this.props.setPlay(false);
    }

    togglePlay() {
        if (this.props.isPlaying) {

            // Pause the Audio and Wavesurfer.
            this.props.audio.pause();
            this.props.wave.pause();
        } else {

            // Play the Audio and Wavesurfer.
            this.props.audio.play();
            this.props.wave.play();
        }

        // Toggle the isPlaying flag.
        this.props.setPlay(!this.props.isPlaying);
    }

    playRegion() {
        this.props.playRegion(this.props.audio, this.props.wave, this.props.isPlaying);
    }

    deleteRegion() {
        this.props.removePlugin('regions', this.props.wave);
    }

    addPlugin() {
        this.props.addPlugin('regions', this.props.wave);
    }

    clipAudio() {
        // TODO: Only the waveform generation currently works, need to look into taking the Audio information
        // from this.props.audio!
        // Notes:
            // So, first probably want to grab the audio information for the buffer and segment
            // from the this.props.audio, and not the wavesurfer stuffs.
            // We'll also probably need to just replace the underlying source node for Pizzicato,
            // because the different effects are just connected to the output "speaker" (we need to figure
            // out how the different destination conenctions work when replacing the source but keeping the
            // effects intact).

        // Always pause the audio before performing a waveform or audio change.
        this.props.audio.pause();

        // Obtain the list of keys for the waveform regions.
        const keys = Object.keys(this.props.wave.regions.list);

        // Obtain the start of the first region (time).
        const regionStart = this.props.wave.regions.list[keys[0]].start;
        const regionEnd = this.props.wave.regions.list[keys[0]].end;

        // Create the Audio Clipping from the Region
        const originalBuffer = this.props.wave.backend.buffer;
        const emptySegment = this.props.wave.backend.ac.createBuffer(
            originalBuffer.numberOfChannels,
            (regionEnd - regionStart) * originalBuffer.sampleRate,
            originalBuffer.sampleRate
        );

        for (let i = 0; i < originalBuffer.numberOfChannels; i++) {
            const chanData = originalBuffer.getChannelData(i);
            const segmentChanData = emptySegment.getChannelData(i);
            for (let j = 0, len = chanData.length; j < len; j++) {
                segmentChanData[j] = chanData[j];
            }
        }

        // This loads the AudioBuffer into the Wavesurfer program to create a new Waveform!
        this.props.wave.loadDecodedBuffer(emptySegment);
        this.props.wave.drawBuffer();

        // Connect the New AudioBuffer to the Pizzicato
        // const source = Pizzicato.context.createBufferSource();
        // source.buffer = emptySegment;
        // source.connect(Pizzicato.context.destination);
        // source.start(0);
    }

    render() {
        const playButton = this.props.isPlaying ? 'Pause' : 'Play';

        return (
            <React.Fragment>
                <h1>Workshop your Audio!!</h1>
                <button onClick={() => console.log(this)}>Log Workstation!</button>
                <button onClick={this.togglePlay}>{playButton}</button>
                <button onClick={this.addPlugin}>Add Region!</button>
                <button onClick={this.playRegion}>Play Region!</button>
                <button onClick={this.deleteRegion}>Delete Region!</button>
                <button onClick={this.stopAudio}>Reset</button>
                <button onClick={this.clipAudio}>Clip Audio!</button>
                <RecordButton/>
                <MusicSlider
                    min={0}
                    max={100}
                    step={1}
                    defaultValue={50}
                    label={'Volume: ' + Math.round(this.props.volume * 100)}
                    onAfterChange={this.changeVolume}
                />
                <Wave/>
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
        checkedEffects: state.workstation.checkedEffects,
        effects: state.workstation.effects,
        downloadBlob: state.workstation.downloadBlob,
        audio: state.workstation.audio,
        isPlaying: state.workstation.isPlaying,

        currentProject: state.projects.currentProject,
        projects: state.projects.projects,

        wave: state.wave.wave,
        songData: state.wave.songData
    };
};

// This gives the component access to dispatch / the actions
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>):
    WorkstationActions.DispatchProps & ProjectsActions.DispatchProps => {
    return bindActionCreators({
        volumeChange: WorkstationActions.volumeChange,
        createSound: WorkstationActions.createSound,
        setPlay: WorkstationActions.setPlay,
        removeEffects: WorkstationActions.removeEffects,

        createProject: ProjectsActions.createProject,

        addPlugin: WaveActions.addPlugin,
        removePlugin: WaveActions.removePlugin,
        clipAudio: WaveActions.clipAudio,
        playRegion: WaveActions.playRegion
    }, dispatch);
};

// This method wraps the component with the store and dispatch!!!
export default connect(mapStateToProps, mapDispatchToProps)(Workstation);

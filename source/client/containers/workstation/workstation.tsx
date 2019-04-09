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
import RecordButton from './recording/recordButton';
import Wave from './wavesurfer/wavesurfer';
import RecorderButtons from './recording/recorderButtons';
import EffectSource from './better_effects/effectSource';
import EffectVisualizer from './better_effects/effectVisualizer';
import EffectCustomizer from './better_effects/effectCustomizer';
import interact from 'interactjs';
import * as Utility from '../../utility/shared';

// Interface for what we want to pass as props from the parent component
interface ParentProps extends RouteComponentProps<{}> {}

// Combined Props Type for Workstation Component (Dispatch and State)
export type WorkstationProps = WorkstationActions.DispatchProps & ProjectsActions.DispatchProps &
WaveActions.DispatchProps & WorkstationState & ProjectsState & WaveState & ParentProps;

// TODO(all): css libraries (basecss, boostrap) for design and layout
class Workstation extends React.Component<WorkstationProps, any> {

    constructor(props: WorkstationProps) {
        super(props);

        this.state = {
            regionsInfo: {},
            effectControllers: [],
            highlightedRegion: '',
        };

        this.replaceAudio = this.replaceAudio.bind(this);
        this.changeVolume = this.changeVolume.bind(this);
        this.stopAudio = this.stopAudio.bind(this);
        this.togglePlay = this.togglePlay.bind(this);
        this.playRegion = this.playRegion.bind(this);
        this.deleteRegion = this.deleteRegion.bind(this);
        this.addRegion = this.addRegion.bind(this);
    }

    async componentDidMount() {
        // Project exists, we can now create audio for it.
        if (localStorage.getItem('user') === null) {
            this.props.history.push('/login/');
        }
        else if (localStorage.getItem('project') === null) {
            this.props.history.push('/project/');
        }
        else {
            await this.props.getProjectBlob(localStorage.getItem('user'), localStorage.getItem('project'));
            const url = URL.createObjectURL(this.props.currentProject);
            this.props.createSound(url);
        }
    }

    componentDidUpdate(prevProps: WorkstationProps, prevState: any) {
        if (this.props.audio === null) {
            // Audio hasn't been initialized yet.
        } else {
            // Audio is now initialized in here.
        }

        if (Utility.isEmpty(this.props.wave)) {
            // Wave has not been initialized.
        } else {
            // Wave is now initialized in here.
        }

        // Finds the newly added region and adds the number identifier to the regions HTML.
        if (prevState.regionsInfo !== this.state.regionsInfo) {
            if (this.props.wave.regions) {
                const regionKeys = Object.keys(this.props.wave.regions.list);
                regionKeys.forEach((currentKey) => {
                    if (prevState.regionsInfo[currentKey] !== this.state.regionsInfo[currentKey]) {
                        // Adds a label to the region if necessary!
                        this.props.addRegionOptions(currentKey, this.state.regionsInfo[currentKey],
                                                    this.props.wave, this.props.audio, this.props.checkedEffects);
                    }
                });
            }
        }
    }

    componentWillUnmount() {
        localStorage.removeItem('project');

        // Disable the dropzone interact.js thingy!
        interact('.wavesurfer-region').unset();

        // Stop the audio and setPlay flag.
        if (this.props.audio !== null) {
            this.props.audio.stop();
            this.props.setPlay(false);
        }

        // Reset the effects and checkedEffects.
        this.props.resetEffects();
    }

    replaceAudio(project: ProjectsTypes.ProjectInfo) {
        this.props.createProject(project);
        const url = URL.createObjectURL(this.props.downloadBlob);
        this.props.createSound(url);
        this.props.removeEffects();
        this.deleteRegion();
    }

    changeVolume(value: number, label: string) {
        // Change the master volume.
        this.props.volumeChange(value / 100); // Volume is between 0 and 1
    }

    stopAudio() {
        // Stop the Audio and Wavesurfer when stopAudio() is called
        this.props.audio.stop();
        this.props.wave.pause();
        this.props.wave.seekTo(0);
        this.props.setPlay(false);
    }

    togglePlay() {
        // Stop or start the audio!
        if (this.props.isPlaying) {
            this.props.wave.pause();
            this.props.audio.pause();
        }
        else {
            this.props.audio.play();
            this.props.wave.play();
        }

        // Set the isPlaying flag.
        this.props.togglePlay();
    }

    playRegion() {
        this.props.playRegion(this.props.audio, this.props.wave, this.props.isPlaying);
    }

    deleteRegion() {
        this.props.removePlugin('regions', this.props.wave);
        this.props.resetEffects();
        this.setState({effectControllers: [], regionsInfo: {}});
    }

    addRegion() {
        // @ts-ignore
        this.props.addPlugin('regions', this.props.wave).then(() => {
            // Obtain the list of keys for the region.
            const regionKeys = Object.keys(this.props.wave.regions.list);

            // Declare list of keys and indexes for the state update.
            const returnObject = {};

            // Iterate through each region and assign the appropriate effects to that region.
            const listLength = this.state.effectControllers.length;
            const ourKey = regionKeys[listLength];
            this.props.wave.regions.list[ourKey].on('in', () => {
                for (const key in this.props.checkedEffects[ourKey]) {
                    if (this.props.checkedEffects[ourKey].hasOwnProperty(key)) {
                        const currentValue = this.props.checkedEffects[ourKey][key];
                        if (currentValue) {
                            this.props.audio.addEffect(this.props.effects[ourKey][key]);
                        }
                    }
                }
            });

            this.props.wave.regions.list[ourKey].on('out', () => {
                for (const key in this.props.checkedEffects[ourKey]) {
                    if (this.props.checkedEffects[ourKey].hasOwnProperty(key)) {
                        const currentValue = this.props.checkedEffects[ourKey][key];
                        if (currentValue) {
                            this.props.audio.removeEffect(this.props.effects[ourKey][key]);
                        }
                    }
                }
            });

            this.props.wave.regions.list[ourKey].on('click', async (clickedRegion: any) => {
                const regionKey = await clickedRegion.target.dataset.id; // Need to "await" for the stuff to settle.
                this.setState({highlightedRegion: regionKey});
                // Need to highlight the current region by changing its color.
                // i.e. Need to setState locally and in the Redux store.
            });

            returnObject[ourKey] = listLength;

            // Create the new effects controller.
            const newVisual = (
                    <EffectVisualizer
                        key={regionKeys[this.state.effectControllers.length]}
                        currentKey={regionKeys[this.state.effectControllers.length]}
                        regionNumber={this.state.effectControllers.length}
                    />);

            // Create the new checkedEffects
            this.props.addCheckedEffects(regionKeys[this.state.effectControllers.length]);
            this.setState({regionsInfo: {...this.state.regionsInfo, ...returnObject},
                effectControllers: [...this.state.effectControllers, newVisual]});
        });
    }

    render() {
        const playButton = this.props.isPlaying ? 'Pause' : 'Play';
        return (
            <React.Fragment>
                <h1>Workshop your Audio!!</h1>
                <Link to='/help'>Help</Link>
                <button onClick={() => console.log(this)}>Log Workstation!</button>
                <button onClick={this.togglePlay}>{playButton}</button>
                <button onClick={this.addRegion}>Add Region!</button>
                <button onClick={this.playRegion}>Play Region!</button>
                <button onClick={this.deleteRegion}>Delete Region!</button>
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
                <Wave/>
                <br/>
                <RecorderButtons replaceAudio={this.replaceAudio} {...this.props}/>
                <br/>
                <Link to={`/projects/`}>My Projects</Link>
                <br/>
                <EffectSource/>
                {this.state.effectControllers}
                <EffectCustomizer/>
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
        togglePlay: WorkstationActions.togglePlay,
        toggleEffect: WorkstationActions.toggleEffect,
        removeEffects: WorkstationActions.removeEffects,
        addCheckedEffects: WorkstationActions.addCheckedEffects,
        resetEffects: WorkstationActions.resetEffects,

        createProject: ProjectsActions.createProject,
        obtainProjectData: ProjectsActions.obtainProjectData,
        getProjectBlob: ProjectsActions.getProjectBlob,

        addPlugin: WaveActions.addPlugin,
        removePlugin: WaveActions.removePlugin,
        clipAudio: WaveActions.clipAudio,
        playRegion: WaveActions.playRegion,
        addRegionOptions: WaveActions.addRegionOptions
    }, dispatch);
};

// This method wraps the component with the store and dispatch!!!
export default connect(mapStateToProps, mapDispatchToProps)(Workstation);

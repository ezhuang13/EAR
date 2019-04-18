import * as React from 'react';
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
import RecordButton from './recording/recordButton';
import Wave from './wavesurfer/wavesurfer';
import RecorderButtons from './recording/recorderButtons';
import EffectSource from './better_effects/effectSource';
import EffectVisualizer from './better_effects/effectVisualizer';
import EffectCustomizer from './better_effects/effectCustomizer';
import interact from 'interactjs';
import * as Utility from '../../utility/shared';
import { AppState } from '../app/appReducer';
import Selector from '../../components/selector';
import withStyles from '@material-ui/core/styles/withStyles';

// Interface for what we want to pass as props from the parent component
interface ParentProps extends RouteComponentProps<{}> {}

// Combined Props Type for Workstation Component (Dispatch and State)
export type WorkstationProps = WorkstationActions.DispatchProps & ProjectsActions.DispatchProps &
WaveActions.DispatchProps & WorkstationState & ProjectsState & WaveState & ParentProps & AppState;

// TODO(all): css libraries (basecss, boostrap) for design and layout
class Workstation extends React.Component<WorkstationProps, any> {

    constructor(props: WorkstationProps) {
        super(props);

        this.state = {
            regionsInfo: {},
            highlightedRegion: '',
            selectorOptions: [],
        };

        this.replaceAudio = this.replaceAudio.bind(this);
        this.changeVolume = this.changeVolume.bind(this);
        this.stopAudio = this.stopAudio.bind(this);
        this.togglePlay = this.togglePlay.bind(this);
        this.deleteRegion = this.deleteRegion.bind(this);
        this.addRegion = this.addRegion.bind(this);
        this.changeSelectorType = this.changeSelectorType.bind(this);
        this.generateController = this.generateController.bind(this);
    }

    componentDidMount() {
        if (this.props.currentUser && this.props.currentProjectName) {
            this.props.getProjectBlob(this.props.currentUser, this.props.currentProjectName).then(() => {
                const url = URL.createObjectURL(this.props.currentProject);
                this.props.createSound(url);
            });
        } else {
            // We need to fetch and set the project here.
            this.props.history.push('/projects/' + this.props.currentUser);
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

    changeSelectorType(newType: string) {
        this.props.selectRegion(newType);
    }

    replaceAudio(project: ProjectsTypes.ProjectInfo) {
        this.props.createProject(project, this.props.currentUser);
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

    deleteRegion() {
        // If we've selected a region, delete it!
        if (this.props.selectedRegion !== '') {

            // Delete the regionsInfo stuffs.
            delete this.state.regionsInfo[this.props.selectedRegion];

            // Iterate through the selectorOptions and delete the respective selector option.
            this.state.selectorOptions.forEach((currentRegion, index) => {
                if (currentRegion.value === this.props.selectedRegion) {
                    this.state.selectorOptions.splice(index, 1);
                }
            });

            // Remove the Wave's Region
            this.props.wave.regions.list[this.props.selectedRegion].remove();

            // Call the deleteRegion props method to remove the Region from effects and checkedEffects
            this.props.deleteRegion(this.props.selectedRegion);

            // Change the selector type to nothing!
            this.changeSelectorType('');
        }
    }

    addRegion() {
        // @ts-ignore
        this.props.addPlugin('regions', this.props.wave).then(() => {
            // Obtain the list of keys for the region.
            const regionKeys = Object.keys(this.props.wave.regions.list);

            // Declare list of keys and indexes for the state update.
            const returnObject = {};

            // Iterate through each region and assign the appropriate effects to that region.
            const listLength = regionKeys.length - 1;
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

            // Add another option for the Selector!
            const newSelectorOption = {
                 value: ourKey,
                 label: 'Region ' + listLength
            };

            // Create the new checkedEffects
            this.props.addCheckedEffects(regionKeys[listLength]);
            this.setState({regionsInfo: {...this.state.regionsInfo, ...returnObject},
                selectorOptions: [...this.state.selectorOptions, newSelectorOption]});
        });
    }

    generateController() {
        if (this.props.selectedRegion === '')
            return '';
        else {
            return (
                <React.Fragment>
                    <EffectVisualizer
                        key={'visualizer'}
                        currentKey={this.props.selectedRegion}
                        regionNumber={this.props.selectedRegion ? this.state.regionsInfo[this.props.selectedRegion] : 0}
                    />
                </React.Fragment>
            );
        }
    }

    render() {
        const {classes} = this.props; 
        const buttons = [
            {
                method: this.togglePlay,
                text: this.props.isPlaying ? 'Pause' : 'Play'
            },
            {
                method: this.stopAudio,
                text: 'Reset Audio'
            },
            {
                method: this.addRegion,
                text: 'Add Region'
            },
            {
                method: this.deleteRegion,
                text: 'Delete Region'
            },
        ];

        const OurSelector = this.state.selectorOptions.length !== 0 ?
                            <Selector
                                key='selector'
                                changeType={this.changeSelectorType}
                                textOptions={this.state.selectorOptions}
                                labelText='Select a Region'
                                defaultValue='0'
                            /> : '';

        const buttonRow = [];
        buttons.forEach((value, index) => {
            buttonRow.push(
                <Utility.StyledButton
                    key={index}
                    onClick={value.method}
                    variant='contained'
                >{value.text}
                </Utility.StyledButton>
            );
        });
        buttonRow.push(OurSelector);
        const ourController = this.generateController();

        return (
            <React.Fragment>
                <Utility.StyledPlainPaper className = {this.props.classes.root} style={{margin: '0.5em', display: 'inline-block'}} >
                    <div>
                        {buttonRow}
                    </div>
                    <div>
                        <RecordButton/>
                        <RecorderButtons replaceAudio={this.replaceAudio} {...this.props}/>
                    </div>
                </Utility.StyledPlainPaper>
                <Wave/>
                <Utility.StyledPlainPaper className = {this.props.classes.root} style = {{margin: '0.5em', display: 'inline-grid'}}>
                    <EffectSource/>
                    {this.props.selectedRegion && ourController}
                    {this.props.selectedEffect && <EffectCustomizer/>}
                </Utility.StyledPlainPaper>
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
        selectedEffect: state.workstation.selectedEffect,
        selectedRegion: state.workstation.selectedRegion,

        currentProject: state.projects.currentProject,
        currentProjectName: state.projects.currentProjectName,

        wave: state.wave.wave,
        songData: state.wave.songData,

        currentUser: state.app.currentUser
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
        deleteRegion: WorkstationActions.deleteRegion,
        selectRegion: WorkstationActions.selectRegion,

        createProject: ProjectsActions.createProject,
        obtainProjectData: ProjectsActions.obtainProjectData,
        getProjectBlob: ProjectsActions.getProjectBlob,

        addPlugin: WaveActions.addPlugin,
        removePlugin: WaveActions.removePlugin,
        clipAudio: WaveActions.clipAudio,
        addRegionOptions: WaveActions.addRegionOptions
    }, dispatch);
};

// This method wraps the component with the store and dispatch!!!
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(Utility.otherPaperStyles)(Workstation));

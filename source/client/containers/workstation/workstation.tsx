import * as React from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Imports for Different States.
import { MainState } from '../../reducers';
import { AppProps } from '../app/appReducer';
import { RouteComponentProps } from 'react-router';
import { WorkstationProps, WorkstationState } from './workstationReducer';
import { ProjectsProps } from '../projects/projectsReducer';
import { WaveProps } from './wavesurfer/wavesurferReducer';

// Imports for Workstation Actions.
import {
    volumeChange,
    createSound,
    setPlay,
    togglePlay,
    toggleEffect,
    removeEffects,
    addCheckedEffects,
    resetEffects,
    deleteRegion,
    selectRegion,
    setWorkstation,
    DispatchProps as WorkstationDispatchProps
} from './workstationActions';

// Imports for Wavesurfer Actions.
import {
    addPlugin,
    removePlugin,
    clipAudio,
    addRegionOptions,
    DispatchProps as WaveDispatchProps
} from './wavesurfer/wavesurferActions';

// Imports for Project Actions.
import {
    createProject,
    obtainProjectData,
    getProjectBlob,
    DispatchProps as ProjectDispatchProps
} from '../projects/projectsActions';

// Import for Project Info.
import { ProjectInfo } from '../projects/projectsTypes';

// Import custom components and 3rd party libs
import RecordButton from './recording/recordButton';
import Wave from './wavesurfer/wavesurfer';
import RecorderButtons from './recording/recorderButtons';
import EffectSource from './better_effects/effectSource';
import EffectVisualizer from './better_effects/effectVisualizer';
import EffectCustomizer from './better_effects/effectCustomizer';
import interact from 'interactjs';
import {
    StyledButton,
    StyledPlainPaper,
    otherPaperStyles
} from '../../utility/shared';
import Selector from '../../components/selector';
import { withStyles } from '@material-ui/core';

// Interface for what we want to pass as props from the parent component
interface ParentProps extends RouteComponentProps<{}> { }

// Combined Props Type for Workstation Component (Dispatch and State)
export type ComboProps = WorkstationDispatchProps & ProjectDispatchProps &
    WaveDispatchProps & WorkstationProps & ProjectsProps & WaveProps & ParentProps & AppProps;

class Workstation extends React.Component<ComboProps, WorkstationState> {

    constructor(props: ComboProps) {
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
        this.resizeWave = this.resizeWave.bind(this);

        // Methods for generating components to be rendered.
        this.generateController = this.generateController.bind(this);
        this.generateButtons = this.generateButtons.bind(this);
    }

    componentDidMount() {
        this.props.setWorkstation();
        if (this.props.currentUser && this.props.currentProjectName) {

            // @ts-ignore Obtain the project blob, then create the URL and Audio.
            this.props.getProjectBlob(this.props.currentUser, this.props.currentProjectName).then(() => {
                const url = URL.createObjectURL(this.props.currentProject);
                this.props.createSound(url);
            });
            window.addEventListener('resize', (ev) => {
                // @ts-ignore Clear the timeout if we're still resizing!
                clearTimeout(window.resizedFinished);

                // @ts-ignore Set the timeout for calling the resizeWave function.
                window.resizedFinished = setTimeout(this.resizeWave, 250);
            });
        } else {
            // We need to fetch and set the project here.
            this.props.history.push('/projects/' + this.props.currentUser);
        }
    }

    componentDidUpdate(prevProps: WorkstationProps, prevState: any) {
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

    resizeWave() {
        this.props.wave.drawer.containerWidth = this.props.wave.drawer.container.clientWidth;
        this.props.wave.drawBuffer();
    }

    changeSelectorType(newType: string) {
        this.props.selectRegion(newType);
    }

    replaceAudio(project: ProjectInfo) {
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
                this.setState({ highlightedRegion: regionKey });
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
            this.setState({
                regionsInfo: { ...this.state.regionsInfo, ...returnObject },
                selectorOptions: [...this.state.selectorOptions, newSelectorOption]
            });
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

    generateButtons() {
        const ourButtons = [
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

        // Loop through the first button array and generate the appropriate row of buttons.
        const buttonRow = [];
        ourButtons.forEach((value, index) => {
            buttonRow.push(
                <StyledButton
                    key={index}
                    onClick={value.method}
                    variant='contained'
                >{value.text}
                </StyledButton>
            );
        });

        // Loop through the second button array, generate buttons
        buttonRow.push(OurSelector);
        buttonRow.push(<RecordButton key='record'/>);

        return buttonRow;
    }

    render() {
        let ourController = null;
        let ourButtons = null;
        if (this.props.waveInitialized) {
            ourButtons = this.generateButtons();
            ourController = this.generateController();
        }

        const paperStyle = {
            margin: '0.5em',
        };

        return (
            <React.Fragment>
                <StyledPlainPaper
                    className={this.props.classes.root}
                    style={{...paperStyle, display: 'inline-block'}}
                >
                    {ourButtons}
                    <RecorderButtons replaceAudio={this.replaceAudio} {...this.props} />
                </StyledPlainPaper>
                <Wave/>
                <StyledPlainPaper
                    className={this.props.classes.root}
                    style={{...paperStyle, display: 'inline-grid'}}
                >
                    <EffectSource />
                    {this.props.selectedRegion && ourController}
                    {this.props.selectedEffect && <EffectCustomizer />}
                </StyledPlainPaper>
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
        waveInitialized: state.wave.waveInitialized,

        currentUser: state.app.currentUser
    };
};

// This gives the component access to dispatch / the actions
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>):
    WorkstationDispatchProps & WaveDispatchProps & ProjectDispatchProps => {
    return bindActionCreators({

        // Workstation Actions!
        volumeChange,
        createSound,
        setPlay,
        togglePlay,
        toggleEffect,
        removeEffects,
        addCheckedEffects,
        resetEffects,
        deleteRegion,
        selectRegion,
        setWorkstation,

        // Create Project Actions!
        createProject,
        obtainProjectData,
        getProjectBlob,

        // Wavesurfer Actions!
        addPlugin,
        removePlugin,
        clipAudio,
        addRegionOptions
    }, dispatch);
};

// @ts-ignore Wraps the method with the store and actions, uses withStyles for styling.
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(otherPaperStyles)(Workstation));

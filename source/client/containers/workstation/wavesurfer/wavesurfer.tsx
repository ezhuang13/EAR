import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';

import {
    initializeWave,
    changeWaveColor,
    changeProgressColor,
    addPlugin,
    setOptions,
    replaceAudio,
    removePlugin,
    clipAudio,
    playRegion,
    addRegionOptions,
    DispatchProps as WaveDispatchProps
} from './wavesurferActions';
import {
    togglePlay,
    DispatchProps as WorkDispatchProps
} from '../workstationActions';

// Imports for Application State (based on the reducer)
import { MainState } from '../../../reducers';
import { WaveProps, WaveState } from './wavesurferReducer';
import { WorkstationProps } from '../workstationReducer';
import { ProjectsProps } from '../../projects/projectsReducer';

const StyledDiv = styled.div`
    display: block;
    position: relative;
    user-select: none;
    height: 128px;
    border: 5px solid;
    overflow: auto hidden;
`;

interface ParentProps extends RouteComponentProps<{}> {}

// Combined Props Type for App Compoinent (Dispatch and State)
export type ComboProps = WaveDispatchProps & WorkDispatchProps &
    ParentProps & WaveProps & WorkstationProps & ProjectsProps;

class Wavesurfer extends React.Component<ComboProps, WaveState> {
    constructor(props: ComboProps) {
        super(props);

        this.changeWaveColor = this.changeWaveColor.bind(this);
        this.changeProgressColor = this.changeProgressColor.bind(this);
    }

    componentDidMount() {
        return;
    }

    componentWillUpdate(nextProps: ComboProps) {
        if (nextProps.audio !== this.props.audio) {
                if (this.props.waveInitialized && this.props.downloadBlob) {
                    this.props.audio.pause();
                    const downloadBlob = this.props.downloadBlob;
                    this.props.replaceAudio(downloadBlob, this.props.wave);
                } else {
                    // Initialize the waveform with the current audio.
                    const projectBlob = this.props.currentProject;

                    // Initialize Wave, then set seeking options!
                    // @ts-ignore
                    this.props.initializeWave(projectBlob).then(() => {

                        // Once the waveform is initialized, set the appropriate callbacks.
                        this.props.wave.on('seek', (progressValue: number) => {

                            // Pause before any manipulation of the audio!
                            this.props.audio.pause();

                            // Obtain the songDuration, then calculate the seekedValue.
                            const songDuration = this.props.wave.getDuration();
                            const seekedValue = songDuration * progressValue;

                            // Set the audio's new time.
                            this.props.audio.offsetTime = seekedValue;

                            if (this.props.isPlaying) {
                                this.props.audio.play();
                            }
                        });

                        // Once the waveform hits the end, reset the start time
                        this.props.wave.on('finish', () => {

                            // Reset the audio and wave times.
                            this.props.audio.offsetTime = 0;

                            // Turn off the isPlaying workstation option.
                            this.props.togglePlay();
                        });
                    });
                }
        }
    }

    changeWaveColor(event: any) {
        this.props.changeWaveColor(event.target.name, this.props.wave);
    }

    changeProgressColor(event: any) {
        this.props.changeProgressColor(event.target.name, this.props.wave);
    }

    render() {
        return (
            <React.Fragment>
                <StyledDiv id={'wavesurfer'}/>
            </React.Fragment>
        );
    }
}

// This gives the component access to the store (state)
const mapStateToProps = (state: MainState) => {
    return {
        wave: state.wave.wave,
        waveInitialized: state.wave.waveInitialized,

        audio: state.workstation.audio,
        audioUrl: state.workstation.audioUrl,
        isPlaying: state.workstation.isPlaying,
        downloadBlob: state.workstation.downloadBlob,

        projects: state.projects.projects,
        currentProject: state.projects.currentProject
    };
};

// This gives the component access to dispatch / the actions
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): WaveDispatchProps &
WorkDispatchProps => {
    return bindActionCreators({
        initializeWave,
        changeWaveColor,
        changeProgressColor,
        addPlugin,
        setOptions,
        replaceAudio,
        removePlugin,
        clipAudio,
        playRegion,
        togglePlay,
        addRegionOptions
    }, dispatch);
};

// This method wraps the component with the store and dispatch!!!
export default connect<any, WaveDispatchProps, any, MainState>
(mapStateToProps, mapDispatchToProps)(Wavesurfer);

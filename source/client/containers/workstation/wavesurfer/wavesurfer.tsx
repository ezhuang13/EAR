import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';

import * as WaveActions from './wavesurferActions';
import * as WorkActions from '../workstationActions';

// Imports for Application State (based on the reducer)
import { MainState } from '../../../reducers';
import { WaveState } from './wavesurferReducer';
import { WorkstationState } from '../workstationReducer';
import { ProjectsState } from '../../projects/projectsReducer';

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
export type WaveProps = WaveActions.DispatchProps & WorkActions.DispatchProps &
    ParentProps & WaveState & WorkstationState & ProjectsState;

class Wavesurfer extends React.Component<WaveProps> {
    constructor(props: WaveProps) {
        super(props);

        this.changeWaveColor = this.changeWaveColor.bind(this);
        this.changeProgressColor = this.changeProgressColor.bind(this);
    }

    componentDidMount() {
        return;
    }

    componentWillUpdate(nextProps: WaveProps) {
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
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): WaveActions.DispatchProps &
WorkActions.DispatchProps => {
    return bindActionCreators({
        initializeWave: WaveActions.initializeWave,
        changeWaveColor: WaveActions.changeWaveColor,
        changeProgressColor: WaveActions.changeProgressColor,
        addPlugin: WaveActions.addPlugin,
        setOptions: WaveActions.setOptions,
        replaceAudio: WaveActions.replaceAudio,
        removePlugin: WaveActions.removePlugin,
        clipAudio: WaveActions.clipAudio,
        playRegion: WaveActions.playRegion,
        togglePlay: WorkActions.togglePlay,
        addRegionOptions: WaveActions.addRegionOptions
    }, dispatch);
};

// This method wraps the component with the store and dispatch!!!
export default connect<any, WaveActions.DispatchProps, any, MainState>
(mapStateToProps, mapDispatchToProps)(Wavesurfer);

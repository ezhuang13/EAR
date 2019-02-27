import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';

import * as Actions from './wavesurferActions';

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
    overflow: auto hidden;
`;

interface ParentProps extends RouteComponentProps<{}> {}

// Combined Props Type for App Compoinent (Dispatch and State)
export type WaveProps = Actions.DispatchProps & ParentProps & WaveState & WorkstationState & ProjectsState;

class Wavesurfer extends React.Component<WaveProps> {
    constructor(props: WaveProps) {
        super(props);

        this.changeWaveColor = this.changeWaveColor.bind(this);
        this.changeProgressColor = this.changeProgressColor.bind(this);
        this.addPlugin = this.addPlugin.bind(this);
    }

    componentDidMount() {
        return;
    }

    componentWillUpdate(nextProps: WaveProps) {
        if (nextProps.audio !== this.props.audio) {
                if (this.props.waveInitialized && this.props.downloadBlob) {
                    const downloadBlob = this.props.downloadBlob;
                    this.props.replaceAudio(downloadBlob, this.props.wave);
                } else {
                    // Initialize the waveform with the current audio.
                    const projectBlob = this.props.projects[this.props.currentProject].audio;

                    // Initialize Wave, then set seeking options!
                    // @ts-ignore
                    this.props.initializeWave(projectBlob).then(() => {

                        // Once the waveform is initialized, set the appropriate callbacks.
                        this.props.wave.on('seek', (progressValue: number) => {

                        // Pause the audio before setting anything.
                        this.props.audio.pause();

                        // Obtain the songDuration, then calculate the seekedValue.
                        const songDuration = this.props.wave.getDuration();
                        const seekedValue = songDuration * progressValue;

                        // Set the audio's new time.
                        this.props.audio.offsetTime = seekedValue;

                        // Play the audio if it were playing before seeking occurred.
                        if (this.props.isPlaying)
                            this.props.audio.play();
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

    addPlugin() {
        this.props.addPlugin('regions', this.props.wave);
    }

    render() {
        return (
            <React.Fragment>
                <StyledDiv id={'wavesurfer'}/>
                <button onClick={this.addPlugin}>Add A Region!</button>
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
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): Actions.DispatchProps => {
    return bindActionCreators({
        initializeWave: Actions.initializeWave,
        changeWaveColor: Actions.changeWaveColor,
        changeProgressColor: Actions.changeProgressColor,
        addPlugin: Actions.addPlugin,
        setOptions: Actions.setOptions,
        replaceAudio: Actions.replaceAudio,
        removePlugin: Actions.removePlugin,
        clipAudio: Actions.clipAudio,
        playRegion: Actions.playRegion
    }, dispatch);
};

// This method wraps the component with the store and dispatch!!!
export default connect<any, Actions.DispatchProps, any, MainState>
(mapStateToProps, mapDispatchToProps)(Wavesurfer);

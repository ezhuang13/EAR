import * as React from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Imports for Application State
import { MainState } from '../../../reducers';
import { WorkstationState } from '../workstationReducer';
import { WaveState } from '../wavesurfer/wavesurferReducer';
import * as Actions from '../workstationActions';

// Import custom components and 3rd party libs
import Recorder from '../../../utility/Recorder.min';
import Pizzicato from 'pizzicato';
import { StyledButton } from '../../../utility/shared';

// Combined Props Type for RecordButton Component (Dispatch and State)
export type RecordButtonProps = Actions.DispatchProps & WorkstationState & WaveState;

class RecordButton extends React.Component<RecordButtonProps> {

    recorderNode: MediaStreamAudioDestinationNode;
    rec: Recorder;

    constructor(props: RecordButtonProps) {
        super(props);

        this.startRecording = this.startRecording.bind(this);
        this.stopRecording = this.stopRecording.bind(this);
    }

    componentWillMount(){
        // Attach Pizzicato master node to media stream
        const source = Pizzicato.masterGainNode;
        this.recorderNode = Pizzicato.context.createMediaStreamDestination();
        source.connect(this.recorderNode);

        // Create recorder attached to media stream node
        this.rec = new Recorder(source);
    }

    componentWillUnmount() {
        this.props.setDownload(null);
    }

    startRecording() {
        this.props.audio.play();
        this.props.setPlay(true);
        this.props.wave.play();
        this.rec.clear();
        this.rec.record();
        this.props.setRecording(true);
    }

    stopRecording() {
        this.props.audio.pause();
        this.props.setPlay(false);
        this.props.wave.pause();
        this.rec.stop();
        this.props.setRecording(false);
        this.rec.exportWAV((blob: Blob) => {
            this.props.setDownload(blob);
        });
    }

    render() {
        const recordButton = this.props.isRecording ?
            <StyledButton variant='contained' onClick={this.stopRecording}>Stop</StyledButton> :
            <StyledButton variant='contained' onClick={this.startRecording}>Record</StyledButton>;

        return (
            <React.Fragment>
                {recordButton}
            </React.Fragment>
        );
    }
}

// This gives the component access to the store (state)
const mapStateToProps = (state: MainState) => {
    return {
        audio: state.workstation.audio,
        isPlaying: state.workstation.isPlaying,
        isRecording: state.workstation.isRecording,

        wave: state.wave.wave,
    };
};

// This gives the component access to dispatch / the actions
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): Actions.DispatchProps => {
    return bindActionCreators({
        setRecording: Actions.setRecording,
        setPlay: Actions.setPlay,
        setDownload: Actions.setDownload,
    }, dispatch);
};

// This method wraps the component with the store and dispatch!!!
export default connect(mapStateToProps, mapDispatchToProps)(RecordButton);

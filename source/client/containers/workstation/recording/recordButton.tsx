import * as React from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Imports for Application State
import { MainState } from '../../../reducers';
import { WorkstationState } from '../workstationReducer';
import * as Actions from '../workstationActions';

// Import custom components and 3rd party libs
import Recorder from '../../../utility/Recorder';
import Pizzicato from 'pizzicato';

// Combined Props Type for RecordButton Component (Dispatch and State)
export type RecordButtonProps = Actions.DispatchProps & WorkstationState;

class RecordButton extends React.Component<RecordButtonProps> {

    // TODO: Discuss with Aaron comment on this w/regards to Typescript
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

    // TODO: Use events to trigger setRecording() and setPlay()
    startRecording() {
        this.props.audio.play();
        this.props.setPlay(true);
        this.props.wave.play();
        this.rec.clear();
        this.rec.record();
        this.props.setRecording(true);
    }

    // TODO: Use lamejs to offer option to encode as mp3 or other formats
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
            <button onClick={this.stopRecording}>Stop</button> :
            <button onClick={this.startRecording}>Record</button>;

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
        wave: state.wave.wave,
        isPlaying: state.workstation.isPlaying,
        isRecording: state.workstation.isRecording
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

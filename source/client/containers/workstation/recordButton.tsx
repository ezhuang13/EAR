import * as React from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';

// Imports for Application State
import { MainState } from '../../reducers';
import { WorkstationState } from './workstationReducer';
import * as Actions from './workstationActions';

// Import custom components and 3rd party libs
import Recorder from './Recorder';
import Pizzicato from 'pizzicato';

// Combined Props Type for RecordButton Component (Dispatch and State)
export type RecordButtonProps = Actions.DispatchProps & WorkstationState;

class RecordButton extends React.Component<RecordButtonProps> {

    // TODO: Discuss with Aaron comment on this w/regards to Typescript
    recorderNode: MediaStreamAudioDestinationNode;
    rec: Recorder;

    constructor(props: any) {
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

    // TODO: Use events to trigger setRecording() and setPlay()
    startRecording() {
        this.rec.clear();

        this.props.audio.play();
        this.props.setPlay(true);

        this.rec.record();
        this.props.setRecording(true);
    }

    // TODO: Use lamejs to offer option to encode as mp3 or other formats
    stopRecording() {
        this.props.audio.pause();
        this.props.setPlay(false);

        this.rec.stop();
        this.props.setRecording(false);

        this.rec.exportWAV((blob: Blob) => {
            const url = window.URL.createObjectURL(blob);
            this.props.setDownload(url);
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
        isPlaying: state.workstation.isPlaying,
        isRecording: state.workstation.isRecording
    };
};

// This gives the component access to dispatch / the actions
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): Actions.DispatchProps => {
    return {
        setRecording: (isRecording: boolean) => { dispatch(Actions.setRecording(isRecording)); },
        setPlay: (isPlaying: boolean) => { dispatch(Actions.setPlay(isPlaying)); },
        setDownload: (downloadUrl: string) => { dispatch(Actions.setDownload(downloadUrl)); },
    };
};

// This method wraps the component with the store and dispatch!!!
export default connect(mapStateToProps, mapDispatchToProps)(RecordButton);

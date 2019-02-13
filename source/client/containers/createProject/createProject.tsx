import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

// Imports for Actions and Types
import * as Actions from './createProjectActions';
import * as Types from './createProjectTypes';

// Imports for Application State (based on the reducer)
import { MainState } from '../../reducers';
import { RouteComponentProps } from 'react-router';
import { CreateProjectState } from './createProjectReducer';

const NewDiv = styled.div`
border-style: solid;
height: 200px;
width: 600px;
text-align: center;
`;

const HeightDiv = styled.div`
height: 50px;
`;

// Interface for what we want to pass as props from the parent component
interface ParentProps extends RouteComponentProps<{}> {}

// Combined Props Type for CreateProject Component (Dispatch and State)
export type CreateProjectProps = Actions.DispatchProps & ParentProps & CreateProjectState;

class CreateProject extends React.Component<CreateProjectProps, any> {
    constructor(props: CreateProjectProps) {
        super(props);

        this.state = {
            audio: ''
        };
        this.uploadAudio = this.uploadAudio.bind(this);
        this.allowDrop = this.allowDrop.bind(this);
    }

    allowDrop(event: any) {
        event.preventDefault();
    }

    uploadAudio(audioFile: any) {

        // Stop the default action for either input or div audio entry
        audioFile.stopPropagation();
        audioFile.preventDefault();

        // Obtain the HTML type for the audio entry
        // Div's are the drag and drop upload, Input is the file upload button
        const targetType = audioFile.target.nodeName.toLowerCase();

        // Obtain the music file from the input
        let ourMusic: any;
        if (targetType === 'div') {
            ourMusic = audioFile.dataTransfer.files[0];
        } else if (targetType === 'input') {
            ourMusic = audioFile.target.files[0];
        }

        // Create a source on the host for the audio file!
        const newSource = URL.createObjectURL(ourMusic);

        // Call the setAudio props function and redirect to the workpage
        this.props.setAudio(newSource);
        this.props.history.push('/workstation');
    }

    componentDidMount() {
        return;
    }

    render() {
        return (
            <React.Fragment>
                <h1>Testing!</h1>
                <input
                    type='file'
                    id='upload'
                    name='audio'
                    accept='.mp3, .wav'
                    onChange={this.uploadAudio}
                />
                <HeightDiv/>
                <NewDiv onDrop={this.uploadAudio} onDragOver={this.allowDrop}>Drag and Drop Audio!</NewDiv>

            </React.Fragment>
        );
    }
}

// This gives the component access to the store (state)
const mapStateToProps = (state: MainState) => {
    return {
        volume: state.workstation.volume
    };
};

// This gives the component access to dispatch / the actions
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): Actions.DispatchProps => {
    return {
        setAudio: (url: string) => { dispatch(Actions.setAudio(url)); },
    }
}

// This method wraps the component with the store and dispatch!!!
export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);

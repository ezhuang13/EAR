import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';

// Imports for Actions and Types
import * as Actions from './projectsActions';
import * as Types from './projectsTypes';

// Imports for Application State (based on the reducer)
import { MainState } from '../../reducers';
import { RouteComponentProps } from 'react-router';
import { ProjectsState } from './projectsReducer';
import { ErrorMessage } from '../../utility/shared';

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
export type CreateProjectProps = Actions.DispatchProps & ParentProps & ProjectsState;

class CreateProject extends React.Component<CreateProjectProps, any> {
    constructor(props: CreateProjectProps) {
        super(props);

        this.state = {
            name: '',
            audio: '',
            filetype: '',
            errorMsg: '',
        };

        this.createProject = this.createProject.bind(this);
        this.uploadAudio = this.uploadAudio.bind(this);
        this.allowDrop = this.allowDrop.bind(this);
        this.changeName = this.changeName.bind(this);
    }

    allowDrop(event: any) {
        event.preventDefault();
    }

    changeName(event: any) {
        const newName = event.target.value;

        const duplicateName = this.props.projects.hasOwnProperty(newName);
        const errorMsg = duplicateName ? 'You already have a project with this name!' : '';

        this.setState({
            name: newName,
            errorMsg,
        });
    }

    uploadAudio(audioFile: any) {
        // Stop the default action for either input or div audio entry
        audioFile.stopPropagation();
        audioFile.preventDefault();

        // Obtain the HTML type for the audio entry
        // Div's are the drag and drop upload, Input is the file upload button
        const targetType = audioFile.target.nodeName.toLowerCase();

        // Obtain the music file from the input
        let ourMusic: File;
        if (targetType === 'div') {
            ourMusic = audioFile.dataTransfer.files[0];
        } else if (targetType === 'input') {
            ourMusic = audioFile.target.files[0];
        }

        const blobMusic = new Blob([ourMusic], {type: ourMusic.type});
        const filetype = ourMusic.type.split('/')[1].toUpperCase();

        this.setState({
            audio: blobMusic,
            filetype,
        });
    }

    createProject(){
        const projectInfo: Types.ProjectInfo = {
            audio: this.state.audio,
            dateCreated: new Date().toLocaleString(),
            filetype: this.state.filetype,
        };
        const newProject: Types.ProjectKV = {
            [this.state.name]: projectInfo,
        };
        this.props.createProject(newProject);
        this.props.history.push('/projects');
    }

    render() {
        const allowCreation = this.state.errorMsg === '' && this.state.name !== '' && this.state.audio !== '';
        return (
            <React.Fragment>
                <h1>Create a Project!</h1>
                <div>Name your project:</div>
                <input
                    type='text'
                    name='name'
                    value={this.state.name}
                    onChange={this.changeName}
                />
                <br/>
                <div>Select some audio:</div>
                <input
                    type='file'
                    id='upload'
                    name='audio'
                    accept='.mp3, .wav'
                    onChange={this.uploadAudio}
                />
                <HeightDiv/>
                <NewDiv onDrop={this.uploadAudio} onDragOver={this.allowDrop}>Drag and Drop Audio!</NewDiv>
                <br/>
                <button disabled={!allowCreation} onClick={this.createProject}>CREATE</button>
                <ErrorMessage
                    msg={this.state.errorMsg}
                />
            </React.Fragment>
        );
    }
}

// This gives the component access to the store (state)
const mapStateToProps = (state: MainState) => {
    return {
        projects: state.projects.projects,
    };
};

// This gives the component access to dispatch / the actions
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): Actions.DispatchProps => {
    return bindActionCreators({
        createProject: Actions.createProject,
    }, dispatch);
};

// This method wraps the component with the store and dispatch!!!
export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);

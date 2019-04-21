import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import { clientIP } from '../../utility/constants';

// Imports for Actions and Types
import * as Actions from './projectsActions';
import * as Types from './projectsTypes';

// Imports for Application State (based on the reducer)
import { MainState } from '../../reducers';
import { RouteComponentProps } from 'react-router';
import { ProjectsState } from './projectsReducer';
//import { ErrorMessage, createProjectStyles } from '../../utility/shared';
import { AppState } from '../app/appReducer';

import { StyledGrid, StyledPlainInput, StyledPlainInputLabel, StyledButton, ErrorMessage, SharedWithStyles, 
    createProjectStyles } from '../../utility/shared';



const NewDiv = styled.div`
border-style: solid;
height: 200px;
width: 600px;
`;

const HeightDiv = styled.div`
height: 50px;
`;


// Interface for what we want to pass as props from the parent component
interface ParentProps extends RouteComponentProps<{}> {}

// Combined Props Type for CreateProject Component (Dispatch and State)
export type CreateProjectProps = Actions.DispatchProps & ParentProps & ProjectsState & AppState;

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

        let duplicateName = false;
        this.props.projects.forEach((projectInfo: Types.ProjectInfo) => {
            if (projectInfo.name === newName) {
                duplicateName = true;
            }
        });
        const errorMsg = duplicateName ? 'You already have a project with this name!' : '';

        this.setState({
            name: newName,
            errorMsg,
        });
    }

    componentDidUpdate() {
        if (this.props.createSuccess) {
            this.props.history.push('/projects/' + this.props.currentUser);
        }
    }

    componentWillMount() {
        if (this.props.currentUser === null) {
            this.props.history.push('/login');
        }
        this.props.createProjStatus(false);
        fetch(clientIP + '/project/' + this.props.currentUser, {
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            },
            method: 'GET'
          }).then((response: any) => response.json()
          .then((projectResponseData: any) => {
            this.props.setProjects(projectResponseData);
          }))
          .catch((error) => {
              console.log(error);
          });
    }

    componentWillUpdate() {
        return false;
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
        const newProject: Types.ProjectInfo = {
            name: this.state.name,
            audio: this.state.audio,
            dateCreated: new Date().toLocaleString(),
            filetype: this.state.filetype,
            id: null,
        };
        this.props.createProject(newProject, this.props.currentUser);
    }

    render() {
        const  { classes } = this.props;
        const allowCreation = this.state.errorMsg === '' && this.state.name !== '' && this.state.audio !== '';
        return (
            <React.Fragment>
                    <StyledGrid container spacing = {16}>
                        <StyledGrid item md = {12}>
                        </StyledGrid>
                        <StyledGrid item md = {5}>
                        </StyledGrid>
                        <StyledGrid item md = {1}>
                            <StyledPlainInputLabel>
                                Name your project:
                            </StyledPlainInputLabel>
                        </StyledGrid>
                        <StyledGrid item md = {1}>
                            <StyledPlainInput
                                type='text'
                                name='name'
                                value={this.state.name}
                                onChange={this.changeName}
                            />
                        </StyledGrid>
                        <StyledGrid item md = {5}>
                        </StyledGrid>
                        <StyledGrid item md = {12}>
                        </StyledGrid>
                        <StyledGrid item md = {5}>
                        </StyledGrid>
                        <StyledGrid item md = {1}>
                            <StyledPlainInputLabel>
                                Select some audio:
                            </StyledPlainInputLabel>
                        </StyledGrid>
                        <StyledGrid item md = {1}>
                            <input
                                type='file'
                                id='upload'
                                name='audio'
                                onChange={this.uploadAudio}
                            />
                        </StyledGrid>
                        <StyledGrid item md = {12}>
                        </StyledGrid>
                        <StyledGrid item md = {4}>
                        </StyledGrid>
                        <StyledGrid item md = {4}>
                        <HeightDiv/>
                            <div className = {classes.dragDrop} onDrop = {this.uploadAudio} onDragOver = {this.allowDrop}>
                                Drag and drop audio
                            </div>
                        </StyledGrid>
                        <StyledGrid item md = {4}>
                        </StyledGrid>
                        <StyledGrid item md = {4}>
                        </StyledGrid>
                        <StyledGrid item md = {4}>
                            <div className = {classes.button}>
                                <StyledButton variant = "contained" color = "primary" disabled={!allowCreation} onClick={this.createProject}>
                                    CREATE
                                </StyledButton>
                            </div>
                        </StyledGrid>
                    </StyledGrid>
                    <div className={classes.error}>
                        <ErrorMessage
                            msg={this.state.errorMsg}
                        />
                    </div>
            </React.Fragment>
        );
    }
}

// This gives the component access to the store (state)
const mapStateToProps = (state: MainState) => {
    return {
        projects: state.projects.projects,
        createSuccess: state.projects.createSuccess,
        currentUser: state.app.currentUser
    };
};

// This gives the component access to dispatch / the actions
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): Actions.DispatchProps => {
    return bindActionCreators({
        createProject: Actions.createProject,
        createProjStatus: Actions.createProjStatus,
        setProjects: Actions.setProjects,
    }, dispatch);
};

// This method wraps the component with the store and dispatch!!!
export default connect(mapStateToProps, mapDispatchToProps)(SharedWithStyles()(createProjectStyles)(CreateProject));

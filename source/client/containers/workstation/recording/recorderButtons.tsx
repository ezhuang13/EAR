import * as React from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Imports for Application State
import { MainState } from '../../../reducers';
import { RouteComponentProps } from 'react-router';
import { WorkstationProps } from '../workstationReducer';
import { ProjectsProps } from '../../projects/projectsReducer';
import {
    createSound,
    DispatchProps as WorkDispatchProps
} from '../workstationActions';
import {
    deleteProject,
    DispatchProps as ProjectsDispatchProps
} from '../../projects/projectsActions';
import { AppProps } from '../../app/appReducer';
import { StyledButton } from '../../../utility/shared';
import styled from 'styled-components';

const PlainLink = styled.a`
    color: black;
    text-decoration: none;
`;

// Interface for what we want to pass as props from the parent component
interface ParentProps extends RouteComponentProps<{}> {}

interface PassedProps {
    replaceAudio: any;
}

// Combined Props Type for RecorderButtons Component (Dispatch and State)
export type RecorderButtonsProps = ParentProps & WorkDispatchProps &
    ProjectsDispatchProps & ProjectsProps & WorkstationProps & PassedProps & AppProps;

// TODO: why can't I pass in the proper props, can't use history.push
class RecorderButtons extends React.Component<RecorderButtonsProps> {

    constructor(props: RecorderButtonsProps) {
        super(props);

        this.makeNewProject = this.makeNewProject.bind(this);
        this.replaceAudio = this.replaceAudio.bind(this);
    }

    async makeNewProject() {
        const newProject = {
            name: this.props.currentProjectName + '-copy',
            audio: this.props.downloadBlob,
            dateCreated: new Date().toLocaleString(),
            filetype: 'WAV',
            id: null,
        };
        await this.props.createProject(newProject, this.props.currentUser);
        this.props.history.push('/projects');
    }

    replaceAudio() {
        let newDateCreated = '';
        let newFiletype = '';
        for (const project of this.props.projects) {
            if (project.name === this.props.currentProjectName) {
                newDateCreated = project.dateCreated;
                newFiletype = project.filetype;
                break;
            }
        }
        const newProject = {
            name: this.props.currentProjectName,
            audio: this.props.downloadBlob,
            dateCreated: newDateCreated,
            filetype: newFiletype,
            id: null,
        };
        this.props.deleteProject(this.props.currentProjectName, this.props.currentUser);
        this.props.replaceAudio(newProject);
    }

    render() {
        let downloadButton = <div/>;
        let replaceButton = <div/>;
        let newProjectButton = <div/>;
        if (this.props.downloadBlob) {
            const downloadUrl = URL.createObjectURL(this.props.downloadBlob);
            downloadButton =
            <StyledButton variant='contained'>
                <PlainLink href={downloadUrl} download={this.props.currentProjectName}>Download Recording</PlainLink>
            </StyledButton>;
            replaceButton =
            <StyledButton onClick={this.replaceAudio} variant='contained'>
                Replace Audio w/Rec
            </StyledButton>;
            newProjectButton =
            <StyledButton onClick={this.makeNewProject} variant='contained'>
                Create New Project w/Rec
            </StyledButton>;
        }

        return (
            <React.Fragment>
                {downloadButton}
                {replaceButton}
                {newProjectButton}
            </React.Fragment>
        );
    }
}

// This gives the component access to the store (state)
const mapStateToProps = (state: MainState) => {
    return {
        currentProject: state.projects.currentProject,
        projects: state.projects.projects,
        audio: state.workstation.audio,
        downloadBlob: state.workstation.downloadBlob,
        currentProjectName: state.projects.currentProjectName,
        currentUser: state.app.currentUser
    };
};

// This gives the component access to dispatch / the actions
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>):
    WorkDispatchProps & ProjectsDispatchProps => {
    return bindActionCreators({
        createSound,
        deleteProject,
    }, dispatch);
};

// This method wraps the component with the store and dispatch!!!
export default connect(mapStateToProps, mapDispatchToProps)(RecorderButtons);

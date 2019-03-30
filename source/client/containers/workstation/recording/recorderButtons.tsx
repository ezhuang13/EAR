import * as React from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Imports for Application State
import { MainState } from '../../../reducers';
import { RouteComponentProps } from 'react-router';
import { WorkstationState } from '../workstationReducer';
import { ProjectsState } from '../../projects/projectsReducer';
import * as Actions from '../workstationActions';
import * as ProjectsActions from '../../projects/projectsActions';

// Interface for what we want to pass as props from the parent component
interface ParentProps extends RouteComponentProps<{}> {}

interface PassedProps {
    replaceAudio: any;
}

// Combined Props Type for RecorderButtons Component (Dispatch and State)
export type RecorderButtonsProps = ParentProps & Actions.DispatchProps &
ProjectsActions.DispatchProps & ProjectsState & WorkstationState & PassedProps;

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
        await this.props.createProject(newProject);
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
        this.props.deleteProject(this.props.currentProjectName);
        this.props.replaceAudio(newProject);
    }

    render() {
        let downloadButton = <div/>;
        let replaceButton = <div/>;
        let newProjectButton = <div/>;
        if (this.props.downloadBlob) {
            // TODO: make this in componentWillReceiveProps or something
            const downloadUrl = URL.createObjectURL(this.props.downloadBlob);
            downloadButton = <a href={downloadUrl} download={this.props.currentProject}> Download </a>;
            replaceButton = <button onClick={this.replaceAudio}>Replace current audio with download</button>;
            newProjectButton = <button onClick={this.makeNewProject}>Create new project with download</button>;
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
    };
};

// This gives the component access to dispatch / the actions
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>):
    Actions.DispatchProps & ProjectsActions.DispatchProps => {
    return bindActionCreators({
        createSound: Actions.createSound,
        deleteProject: ProjectsActions.deleteProject,
    }, dispatch);
};

// This method wraps the component with the store and dispatch!!!
export default connect(mapStateToProps, mapDispatchToProps)(RecorderButtons);

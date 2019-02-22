import * as React from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Imports for Application State
import { MainState } from '../../reducers';
import { RouteComponentProps } from 'react-router';
import { WorkstationState } from './workstationReducer';
import { ProjectsState } from '../projects/projectsReducer';
import * as Actions from './workstationActions';
import * as ProjectsActions from '../projects/projectsActions';

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

    makeNewProject() {
        const newProject = {
            [this.props.currentProject + '-copy']: {
                audio: this.props.download,
                dateCreated: new Date().toLocaleString(),
                filetype: 'WAV',
            }
        };
        this.props.createProject(newProject);
        this.props.history.push('/projects');
    }

    replaceAudio() {
        const newProject = {
            [this.props.currentProject]: {
                audio: this.props.download,
                dateCreated: this.props.projects[this.props.currentProject].dateCreated,
                filetype: this.props.projects[this.props.currentProject].filetype,
            }
        };
        this.props.deleteProject(this.props.currentProject);
        this.props.replaceAudio(newProject);
    }

    render() {
        let downloadButton = <div/>;
        let replaceButton = <div/>;
        let newProjectButton = <div/>;
        if (this.props.download) {
            // TODO: make this in componentWillReceiveProps or something
            const downloadUrl = URL.createObjectURL(this.props.download);
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
        download: state.workstation.download,
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

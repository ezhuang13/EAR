import * as React from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Imports for Actions and Types
import * as Actions from './projectsActions';
import * as Types from './projectsTypes';

// Imports for Application State
import { MainState } from '../../reducers';
import { RouteComponentProps } from 'react-router';
import { ProjectsState } from './projectsReducer';

// Import custom components and 3rd party libs
import styled from 'styled-components';
import {
    ErrorMessage,
    InfoBlock,
    InfoData,
    InfoLabels,
    ShortP
  } from './../../utility/shared';
import { ProjectList } from './projectsList';

// Interface for what we want to pass as props from the parent component
interface ParentProps extends RouteComponentProps<{}> {}

/*************************************************************************/

const ProfileBlockBase = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  grid-template-areas: "pic" "profile";
  padding: 1em;

  @media (min-width: 500px) {
    grid-template-columns: auto 1fr;
    grid-template-areas: "pic profile";
    padding: 2em;
  }
`;

const ProfileImage = styled.img`
  grid-area: pic;
  max-width: 150px;
  padding: 1em;
  @media (min-width: 500px) {
    padding: 0.5em;
    max-width: 200px;
  }
`;

const ProfileBlock = (props) => {
  return (
    <ProfileBlockBase>
        <ProfileImage
            src='https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg'
        />
      <InfoBlock>
        <InfoLabels>
          <p>Username:</p>
          <p>First Name:</p>
          <p>Last Name:</p>
          <p>Email Address:</p>
        </InfoLabels>
        <InfoData>
          <ShortP>{props.username}</ShortP>
          <ShortP>{props.first_name}</ShortP>
          <ShortP>{props.last_name}</ShortP>
          <ShortP>{props.primary_email}</ShortP>
        </InfoData>
      </InfoBlock>
    </ProfileBlockBase>
  );
};

/*************************************************************************/

const ProfileBase = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// Combined Props Type for Projects Component (Dispatch and State)
export type ProjectsProps = Actions.DispatchProps & ParentProps & ProjectsState;

class Projects extends React.Component<ProjectsProps, any> {

    constructor(props: ProjectsProps) {
      super(props);
      this.state = {
          username: 'test',
          first_name: 'mr',
          last_name: 'tester',
          primary_email: 'test@test.com',
          balance: 0,
          projects: [],
          error: ''
        };

      this.setCurrentProject = this.setCurrentProject.bind(this);
      this.deleteProject = this.deleteProject.bind(this);
    }

    setCurrentProject(name: string){
      this.props.setProject(name);
    }

    deleteProject(name: string) {
      this.props.deleteProject(name);
    }

    render() {
        // TODO: make this dynamic
        const isUser = true;
        return (
        <React.Fragment>
        <ProfileBase style={{ gridArea: 'main' }}>
          <ErrorMessage msg={this.state.err} hide={true} />
          <ProfileBlock {...this.state} />
          <ProjectList
            toCreateProj={isUser}
            projects={this.props.projects}
            setProject={this.setCurrentProject}
            deleteProject={this.deleteProject}
          />
        </ProfileBase>
      </React.Fragment>);
    }
}

// This gives the component access to the store (state)
const mapStateToProps = (state: MainState) => {
    return {
      projects: state.projects.projects
    };
};

// This gives the component access to dispatch / the actions
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): Actions.DispatchProps => {
  return bindActionCreators({
    setProject: Actions.setProject,
    deleteProject: Actions.deleteProject,
  }, dispatch);
};

// This method wraps the component with the store and dispatch!!!
export default connect(mapStateToProps, mapDispatchToProps)(Projects);

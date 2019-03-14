import * as React from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

// Imports for Actions and Types
import * as Actions from './projectsActions';

// Imports for Application State
import { MainState } from '../../reducers';
import { RouteComponentProps } from 'react-router';
import { ProjectsState } from './projectsReducer';

// Import custom components and 3rd party libs
import styled from 'styled-components';
import {
    InfoBlock,
    InfoData,
    InfoLabels,
    ShortP
  } from './../../utility/shared';
import { ProjectList } from './projectsList';
import md5 from 'md5';

// create grav hash profile image
const GravHash = (email: string, size: number) => {
  let hash = email && email.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  hash = hash && hash.toLowerCase();
  hash = hash && md5(hash);
  return `https://www.gravatar.com/avatar/${hash}?size=${size}`;
}

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
            src={GravHash(props.emailAddress, 150)}
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
          <ShortP>{props.firstName}</ShortP>
          <ShortP>{props.lastName}</ShortP>
          <ShortP>{props.emailAddress}</ShortP>
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

    this.setCurrentProject = this.setCurrentProject.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentWillMount(){
    if (localStorage.getItem('user') === null) {
      this.props.history.push('/login');
    }
    else {
      fetch(`/users/${localStorage.getItem('user')}`, {
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        },
        method: 'GET'
      }).then((response: any) => response.json()
      .then((userResponseData: any) => {
        this.props.setUser(userResponseData);
      }));
      // TODO: handle error
    }
  }

  logout(){
    localStorage.removeItem('user');
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
      <Link to={`/login/`} onClick={this.logout}>Logout</Link>
      <ProfileBase style={{ gridArea: 'main' }}>
        <ProfileBlock {...this.props.currentUser} />
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
      projects: state.projects.projects,
      currentUser: state.projects.currentUser,
    };
};

// This gives the component access to dispatch / the actions
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): Actions.DispatchProps => {
  return bindActionCreators({
    setProject: Actions.setProject,
    setUser: Actions.setUser,
    deleteProject: Actions.deleteProject,
  }, dispatch);
};

// This method wraps the component with the store and dispatch!!!
export default connect(mapStateToProps, mapDispatchToProps)(Projects);

import * as React from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Imports for Actions and Types
import * as Actions from './projectsActions';

// Imports for Application State
import { MainState } from '../../reducers';
import { RouteComponentProps } from 'react-router';
import { ProjectsState } from './projectsReducer';

// Import custom components and 3rd party libs
import { AppState } from '../app/appReducer';


// shared parts
import { generateProfileHead, generateProfileBody, generateProfileInfo, composeTable,
   StyledButton, StyledPlainPaper, SharedWithStyles, projectPaperStyles } from '../../utility/shared';
// Interface for what we want to pass as props from the parent component
interface ParentProps extends RouteComponentProps<{}> {}

// Combined Props Type for Projects Component (Dispatch and State)
export type ProjectsProps = Actions.DispatchProps & ParentProps & ProjectsState & AppState;

class Projects extends React.Component<ProjectsProps, any> {
  constructor(props: ProjectsProps) {
    super(props);

    this.setCurrentProject = this.setCurrentProject.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
    this.logThis = this.logThis.bind(this);
    this.shapeUserInfo = this.shapeUserInfo.bind(this);
    this.createProject = this.createProject.bind(this);
  }

  componentDidMount() {
    if (this.props.currentUser !== '') {
      this.props.obtainUser(this.props.currentUser);
      this.props.obtainProjectData(this.props.currentUser);

    } else {
      const userFromURL = this.props.location.pathname.split('/')[2];
      if (userFromURL) {
        this.props.obtainUser(userFromURL);
        this.props.obtainProjectData(userFromURL);
      }
    }
  }

  componentDidUpdate(prevProps: any) {
    if (prevProps.currentUser === '' && this.props.currentUser !== '') {
      this.props.obtainUser(this.props.currentUser);
      this.props.obtainProjectData(this.props.currentUser);
    }
  }

  createProject() {
    this.props.history.push('/create_project');
  }

  logThis() {
    console.log(this);
  }

  setCurrentProject(name: string){
    this.props.setProjectName(name);
    this.props.history.push('/workstation/' + name);
  }

  deleteProject(name: string) {
    this.props.deleteProject(name, this.props.currentUser);
  }

  shapeUserInfo(currentUserInfo) {
    let returnInfo = {};
    if (currentUserInfo !== null) {
          returnInfo = {
              username: currentUserInfo.username,
              firstName: currentUserInfo.firstName,
              lastName: currentUserInfo.lastName,
              emailAddress: currentUserInfo.emailAddress
          };
    }
    return returnInfo;
  }

  render() {
      // Shapes the currentUserInfo from props into the profile block information!
      const userInfoShaped = this.shapeUserInfo(this.props.currentUserInfo);

      // Generate the different parts of the Profile page.
      const ProfileBlock = generateProfileInfo(userInfoShaped);
      const TableHead = generateProfileHead();
      const TableBody = generateProfileBody({projects: this.props.projects,
        deleteProject: this.props.currentUser ? this.props.deleteProject : () => '',
        setProject: this.props.currentUser ? this.setCurrentProject : () => ''});
      const CreateButton = this.props.currentUser ?
      <StyledButton onClick={this.createProject}>New Project!</StyledButton> :
      '';

      // Wrap everything in a Table tag.
      const MyTable = composeTable(TableHead, TableBody);
      return (
      <React.Fragment>
        <StyledPlainPaper className={this.props.classes.root}>
          {ProfileBlock}
          <StyledButton variant = "contained" onClick={this.createProject}>Create new Project!</StyledButton>
          {MyTable}
        </StyledPlainPaper>
        </React.Fragment>
      );
  }
}

// This gives the component access to the store (state)
const mapStateToProps = (state: MainState) => {
    return {
      projects: state.projects.projects,
      currentUser: state.app.currentUser,
      currentUserInfo: state.projects.currentUserInfo
    };
};

// This gives the component access to dispatch / the actions
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): Actions.DispatchProps => {
  return bindActionCreators({
    setProject: Actions.setProject,
    setUser: Actions.setUserz,
    deleteProject: Actions.deleteProject,
    setProjects: Actions.setProjects,
    setProjectName: Actions.setProjectName,
    obtainProjectData: Actions.obtainProjectData,
    obtainUser: Actions.obtainUser
  }, dispatch);
};

// This method wraps the component with the store and dispatch!!!
export default connect(mapStateToProps, mapDispatchToProps)(SharedWithStyles()(projectPaperStyles)(Projects));

/* Copyright G. Hemingway, @2018 */
import * as React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import * as Actions from './projectsActions';
import * as Types from './projectsTypes';

/*************************************************************************/

interface ProjectPropsPassed {
    projectName: string;
    projectInfo: Types.ProjectInfo;
    setProject: any;
    deleteProject: any;
}

export type ProjectProps = ProjectPropsPassed & Actions.DispatchProps;

class Project extends React.Component<ProjectProps, any> {
  constructor(props: ProjectProps) {
    super(props);

    this.clickProject = this.clickProject.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
  }

  clickProject() {
    this.props.setProject(this.props.projectName);
  }

  deleteProject() {
    this.props.deleteProject(this.props.projectName);
  }

  render(){
    return (
      <tr>
        <td>
          <Link
            to={`/workstation/${this.props.projectName}`}
            onClick={this.clickProject}
          >
          {this.props.projectName}
          </Link>
        </td>
        <td>{this.props.projectInfo.filetype}</td>
        <td>{this.props.projectInfo.dateCreated}</td>
        <td><button onClick={this.deleteProject}>---X---</button></td>
      </tr>
    );
  }
}

/*************************************************************************/

const ProjHeaderBase = styled.div`
  display: flex;
  margin: 1em;
  & > a {
    margin-right: 1em;
  }
  & > h4 {
    margin: 0;
    flex-grow: 1;
  }
`;

export interface ProjHeaderProps {
    count: number;
    toCreateProj: boolean;
}

const ProjHeader = (props: ProjHeaderProps) => {
  return (
    <ProjHeaderBase>
      <h4>Projects ({props.count}):</h4>
      {props.toCreateProj ? (
        <Link style={{ marginBottom: '1em' }} to='/create_project'>
          Create new project
        </Link>
      ) : null}
    </ProjHeaderBase>
  );
};

/*************************************************************************/

const ProjTable = styled.table`
  width: 100%;
  text-align: center;
  @media (max-width: 499px) {
    & > tbody > tr > td:nth-of-type(2),
    & > thead > tr > th:nth-of-type(2) {
      display: none;
    }
  }
`;

export interface ProjectListProps {
    projects: any;
    toCreateProj: boolean;
    setProject: any;
    deleteProject: any;
}

export const ProjectList = (props: ProjectListProps) => {
  // Build array of projects
  const projects = [];
  Object.keys(props.projects).forEach((key: string, index: number) => {
    projects.push(<Project
      key={index}
      projectName={key}
      projectInfo={props.projects[key]}
      setProject={props.setProject}
      deleteProject={props.deleteProject}
    />);
  });
  return (
    <React.Fragment>
      <ProjHeader
        count={Object.keys(props.projects).length}
        toCreateProj={props.toCreateProj}
      />
      <ProjTable>
        <thead>
          <tr>
            <th>Name</th>
            <th>Filetype</th>
            <th>Created</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{projects}</tbody>
      </ProjTable>
    </React.Fragment>
  );
};

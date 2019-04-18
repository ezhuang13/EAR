/* Copyright G. Hemingway, @2018 */
'use strict';

import * as React from 'react';
import md5 from 'md5';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import AppBar from '@material-ui/core/AppBar';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Grid from '@material-ui/core/Grid';
import { createMuiTheme } from '@material-ui/core/styles';


/*************************************************************************/
/** Material UI Components (with Styles) */
/*************************************************************************/
export const StyledPaper = withStyles({
  root: {
      marginTop: '2em',
      marginBottom: '2em',
      alignItems: 'center',
      padding: '2em',
      background: '#3f51b5',
  },

})(Paper);

export const StyledFormControl = withStyles({
  root: {}
})(FormControl);

export const StyledGrid = withStyles({
  root: {}
})(Grid);

export const StyledPlainPaper = withStyles({
  root: {}
})(Paper);

export const StyledMuiThemeProvider = withStyles({
  root:{}
})(MuiThemeProvider);

export const StyledTypography = withStyles({
  root: {}
})(Typography);

export const StyledButton = withStyles({
  root: {
    textTransform: 'none',
    margin: '0.5em'
  }
})(Button);



export const StyledTable = withStyles({
  root: {}
})(Table);

export const StyledTableBody = withStyles({
  root: {}
})(TableBody);

export const StyledTableCell = withStyles({
  root: {}
})(TableCell);


export const StyledInput = withStyles({
  root: {
    color: '#e0e0e0',
    marginLeft: '0.5em',
    fontFamily:'Didot, serif',
    marginRight:'0.5em'
  }
})(Input);

export const StyledInputLabel = withStyles({
  root : {
    color: '#e0e0e0',
    fontFamily: 'Didot, serif',
    marginRight :'0.5em'
  }
})(InputLabel);

export const StyledTableHead = withStyles({
  root: {}
})(TableHead);

export const StyledTableRow = withStyles({
  root: {}
})(TableRow);

/*************************************************************************/
/* Styles that are imported through a React component, and that passed to a
 * Material UI component and exported 'withStyles' (allows us to use themes)
 */
/*************************************************************************/

export const projectPaperStyles = theme => ({
  root: {
      marginTop: '2em',
      marginLeft: '20%',
      marginRight: '20%',
      marginBottom: '2em',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2em',
      background: theme.palette.primary.main,
      width: '40em',
      height: '100%',
      margin: '5em auto'
  },
});

export const otherPaperStyles = theme => ({
  root: {
      marginTop: '2em',
      marginLeft: '20%',
      marginRight: '20%',
      marginBottom: '2em',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2em',
      background: theme.palette.primary.main,
  },
  typographyHeading: {
    padding: '5px',
    textAlign: 'center',
    useNextVariants: true,
    color: theme.palette.primary.main,
    fontSize: 20,
    paddingTop:'10px'
}
});

export const createProjectStyles = theme => ({
  typographyHeading: {
      padding: '5px',
      textAlign: 'center',
      useNextVariants: true,
      color: theme.palette.primary.main,
      fontSize: 20,
      paddingTop:'10px'
  },
  link: {
      textAlign:'center'
  },
  headingAndLink: {
      paddingBottom:'20px'
  },
  dragDrop : {
      marginLeft: 'auto',
      marginRight: 'auto',
      textAlign: 'center',
      borderStyle: 'solid',
      height: '200px',
      width: '400px'
  },
  button: {
      marginLeft:'auto',
      marginRight:'auto',
      textAlign:'center'
  },
  error: {
      marginLeft:'auto',
      marginRight:'auto',
      textAlign:'center'
  }
});

export const formStyles = theme => ({
  paper: {
    marginTop: '2em',
    marginLeft: '20%',
    marginRight: '20%',
    marginBottom: '2em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2em',
    background: theme.palette.primary.main,
  },
});

/*************************************************************************/
/** Error Message */
/*************************************************************************/
const ErrorBase = styled.div`
  grid-column: 1 / 3;
  color: red;
  display: flex;
  justify-content: center;
  padding: 1em;
  min-height: 1.2em;
`;

export const ErrorMessage = ({ msg = '', hide = false }) => {
  return (
    <ErrorBase style={{ display: hide ? 'none' : 'inherit'}}>{msg}</ErrorBase>
  );
};

/*************************************************************************/
/** Modal Notifier for Logging In and Registering */
/*************************************************************************/

const NotifyBase = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NotifyBox = styled.div`
  padding: 2em;
  border: 1px solid #000;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
`;

export const FormButton = styled.button`
  max-width: 200px;
  min-width: 150px;
  max-height: 2em;
  background: #6495ed;
  border: none;
  border-radius: 5px;
  line-height: 2em;
  font-size: 0.8em;
`;

export const ModalNotify = ({ msg = '', onAccept }) => {
  return (
    <NotifyBase>
      <NotifyBox>
        <p>{msg}</p>
        {onAccept ? <FormButton onClick={onAccept}>Ok</FormButton> : null}
      </NotifyBox>
    </NotifyBase>
  );
};

/*************************************************************************/
/** Styled Components for the Profile Table! */
/*************************************************************************/

export const InfoBlock = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto;
  grid-template-areas: "labels info";
`;

export const InfoData = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  & > p {
    margin: 0.5em 0.25em;
  }
`;

export const InfoLabels = styled.div`
  align-items: flex-end;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  & > p {
    margin: 0.5em 0.25em;
  }
`;

export const ShortP = styled.p`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

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

const EndSliders = styled.div`
    margin-left: 1.5em;
`;

const GravHash = (email: string, size: number) => {
  let hash = email && email.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  hash = hash && hash.toLowerCase();
  hash = hash && md5(hash);
  return `https://www.gravatar.com/avatar/${hash}?size=${size}`;
};

/*************************************************************************/
/** Methods to Generate the Different Parts of the Profile Page */
/*************************************************************************/
export const generateProfileInfo = (props) => {
  return (
    <ProfileBlockBase>
        <ProfileImage
            src={GravHash(props.emailAddress, 150)}
        />
      <InfoBlock>
        <InfoLabels>
          <Typography>Username:</Typography>
          <Typography>First Name:</Typography>
          <Typography>Last Name:</Typography>
          <Typography>Email Address:</Typography>
        </InfoLabels>
        <InfoLabels>
          <Typography>{props.username}</Typography>
          <Typography>{props.firstName}</Typography>
          <Typography>{props.lastName}</Typography>
          <Typography>{props.emailAddress}</Typography>
        </InfoLabels>
        </InfoBlock>
        </ProfileBlockBase>
    );
  }

export const generateProfileHead = () => {
    const returnHead = (
      <StyledTableHead>
        <StyledTableRow key={'head'}>
          <StyledTableCell>Name</StyledTableCell>
          <StyledTableCell>File Type</StyledTableCell>
          <StyledTableCell>Date Created</StyledTableCell>
          <StyledTableCell>Delete?</StyledTableCell>
        </StyledTableRow>
      </StyledTableHead>
    );
    return returnHead;
};

export const genereateProfileBody = (propsArray) => {
  const returnBody = [];
  propsArray.projects.forEach((value, index) => {
    const shapedDelete =  () => propsArray.deleteProject(value.name, value.username);
    const shapedLink = () => propsArray.setProject(value.name);
    returnBody.push(
      <StyledTableRow key={index}>
        <StyledTableCell>
            <StyledButton variant = "contained" onClick={shapedLink}>
              {value.name}
            </StyledButton>
          </StyledTableCell>
        <StyledTableCell>{value.filetype}</StyledTableCell>
        <StyledTableCell>{value.dateCreated}</StyledTableCell>
        <StyledTableCell>
          <StyledButton
          variant = "contained"
            onClick={shapedDelete}
          >-X-
          </StyledButton>
        </StyledTableCell>
      </StyledTableRow>
    );
  });
  return <StyledTableBody>{returnBody}</StyledTableBody>;
};

export const composeTable =  (tableHead, tableBody) =>  {
  return (
    <StyledTable>
      {tableHead}
      {tableBody}
    </StyledTable>
  );
};

export const SliderGrids = (props) => {
  return (
    <Grid container spacing = {32}>
      <Grid item md={4}>
          {props.col1}
      </Grid>
      <Grid item md={4}>
          <EndSliders>
            {props.col2}
          </EndSliders>
      </Grid>
    </Grid>
  )
}

/*************************************************************************/
/** Creates the overall Material UI Theme */
/*************************************************************************/
export const firstTheme = createMuiTheme({
    palette: {
      primary: {
        main: '#0091ea'
      },
      secondary: {
        main: '#0091ea',
      },
    },
});

/*************************************************************************/
/** Method for Interact.js mouse dragging. */
/*************************************************************************/
export const dragMoveListener = (event: any) => {
  // Obtain the event target.
  const target = event.target;

  // Dragged position into "data-x" and "data-y" for interact.js
  const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
  const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // Translate the element (actually move it).
  target.style.webkitTransform =
  target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';

  // Update the position attributes (sync-ed with transformation).
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
};

// Method to check for an empty object.
export const isEmpty = (object: object) => {
  for (const key in object) {
      if (object.hasOwnProperty(key)) {
          return false;
      }
  }
  return true;
};

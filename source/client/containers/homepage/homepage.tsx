import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '../../components/appBar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// define styles for the homepage
const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: '20px'
  },
  typographyHeading: {
    padding: '5px',
    textAlign: 'center',
    useNextVariants: true,
    color: theme.palette.text.secondary,
    fontSize: 20
  },
  typography: {
      textAlign:'center',
      padding:'5px',
      color: theme.palette.text.secondary,
      fontSize: 14
  },
  logo: {
      textAlign:'center',
      paddingTop:'10px'
  }
});

// stateless homepage component
function Homepage(props) {
  const { classes } = props;

  return (
    <React.Fragment>
        <div className = {classes.logo}>
          <img src = {require('../../../../images/EAR-logo.png')} width = "300" height = "250"></img>
        </div>
        <div className={classes.root}>
        <Grid container spacing={16}>
            <Grid item md={12}>
            <Typography className = {classes.typographyHeading} gutterBottom>
                The Problem
            </Typography>
            </Grid>
            <Grid item md = {1}>
            </Grid>
            <Grid item md={10}>
            <Typography className={classes.typography}>
                Using digital audio workstations (DAWs) can be difficult: sometimes you just want to add effects to audio
                and see what it sounds like before you go out of your way to actually sample the track. There isn't a simple,
                efficient way to add effects to parts of a song within the browser.
            </Typography>
            </Grid>
            <Grid item md = {1}>
            </Grid>
            <Grid item md = {12}>
              <Typography className = {classes.typographyHeading} gutterBottom>
                The Solution
              </Typography>
            </Grid>
            <Grid item md = {1}>
            </Grid>
            <Grid item md = {10}>
              <Typography className = {classes.typography}>
                Our application provides an easy-to-use interface where users are given a waveform representation
                of a song of their choosing. They can drag and drop effects to portions of the song to see how they
                sound. Like with any DAW, users can save their projects so that they can save and experiment with them later.
              </Typography>
            </Grid>
            <Grid item md = {1}>
            </Grid>
            <Grid item md = {12}>
              <Typography className = {classes.typographyHeading} gutterBottom>
                The Team
              </Typography>
            </Grid>
            <Grid item md = {4}>
              <Typography className = {classes.typographyHeading} gutterBottom>
                Eric Zhuang
              </Typography>
            </Grid>
            <Grid item md = {4}>
              <Typography className = {classes.typographyHeading} gutterBottom>
                Aaron Molotsky
              </Typography>
            </Grid>
            <Grid item md = {4}>
              <Typography className = {classes.typographyHeading} gutterBottom>
                Raj Singh
              </Typography>
            </Grid>
            <Grid item md = {4} className = {classes.logo}>
              <img src = {require('../../../../images/EricPic.png')} width = '250' height = '250'></img>
            </Grid>
            <Grid item md = {4} className = {classes.logo}>
              <img src = {require('../../../../images/AaronPic.png')} width = '250' height = '250'></img>
            </Grid>
            <Grid item md = {4} className = {classes.logo}>
              <img src = {require('../../../../images/RajPic.png')} width = '250' height = '250'></img>
            </Grid>
        </Grid>
        </div>
    </React.Fragment>
  );
}

// @ts-ignore
Homepage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Homepage);

// @ts-ignore
import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// @ts-ignore
import EARlogo from '../../../../images/EARlogo.png';

// @ts-ignore
import AaronPic from '../../../../images/AaronPic.png';

// @ts-ignore
import EricPic from '../../../../images/EricPic.png';

// @ts-ignore
import RajPic from '../../../../images/RajPic.png';

// Define styles for the homepage!
const styles = (theme: any) => ({
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
      textAlign: 'center',
      padding: '5px',
      color: theme.palette.text.secondary,
      fontSize: 14
  },
  logo: {
      textAlign: 'center',
      paddingTop: '10px'
  }
});

// stateless homepage component
const Homepage = (props: any) => {
  return (
    <Fragment>
        <div className={props.classes.logo}>
          <img src={EARlogo} width='300' height='250'/>
        </div>
        <div className={props.classes.root}>
        <Grid container={true} spacing={16}>
            <Grid item={true} md={12}>
              <Typography className={props.classes.typographyHeading} gutterBottom={true}>
                  The Problem
              </Typography>
            </Grid>
            <Grid item={true} md = {1}/>
            <Grid item={true} md={10}>
            <Typography className={props.classes.typography}>
                Using digital audio workstations (DAWs) can be difficult:
                sometimes you just want to add effects to audio
                and see what it sounds like before you go out
                of your way to actually sample the track. There isn't a simple,
                efficient way to add effects to parts of a song within the browser.
            </Typography>
            </Grid>
            <Grid item={true} md={1}/>
            <Grid item={true} md={12}>
              <Typography className={props.classes.typographyHeading} gutterBottom={true}>
                The Solution
              </Typography>
            </Grid>
            <Grid item={true} md={1}/>
            <Grid item={true} md={10}>
              <Typography className={props.classes.typography}>
                Our application provides an easy-to-use interface where users are given a waveform representation
                of a song of their choosing. They can drag and drop effects to portions of the song to see how they
                sound. Like with any DAW, users can save their projects so that they can save and experiment
                with them later.
              </Typography>
            </Grid>
            <Grid item={true} md={1}/>
            <Grid item={true} md={12}>
              <Typography className={props.classes.typographyHeading} gutterBottom={true}>
                The Team
              </Typography>
            </Grid>
            <Grid item={true} md={4}>
              <Typography className={props.classes.typographyHeading} gutterBottom={true}>
                Eric Zhuang
              </Typography>
            </Grid>
            <Grid item={true} md={4}>
              <Typography className={props.classes.typographyHeading} gutterBottom={true}>
                Aaron Molotsky
              </Typography>
            </Grid>
            <Grid item={true} md={4}>
              <Typography className={props.classes.typographyHeading} gutterBottom={true}>
                Raj Singh
              </Typography>
            </Grid>
            <Grid item={true} md={4} className={props.classes.logo}>
              <img src={EricPic} width='250' height='250'/>
            </Grid>
            <Grid item={true} md={4} className={props.classes.logo}>
              <img src={AaronPic} width='250' height='250'/>
            </Grid>
            <Grid item={true} md={4} className={props.classes.logo}>
              <img src={RajPic} width='250' height='250'/>
            </Grid>
        </Grid>
        </div>
    </Fragment>
  );
}

// @ts-ignore
export default withStyles(styles)(Homepage);

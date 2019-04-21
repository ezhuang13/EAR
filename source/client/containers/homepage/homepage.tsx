// @ts-ignore
import React, { Fragment } from 'react';

// shared parts
import { StyledGrid, StyledTypography, SharedWithStyles } from '../../utility/shared';

// @ts-ignore
import EARlogo from '../../images/EARlogo.png';

// @ts-ignore
import AaronPic from '../../images/AaronPic.png';

// @ts-ignore
import EricPic from '../../images/EricPic.png';

// @ts-ignore
import RajPic from '../../images/RajPic.png';

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
        <StyledGrid container={true} spacing={16}>
            <StyledGrid item={true} md={12}>
              <StyledTypography className={props.classes.typographyHeading} gutterBottom={true}>
                  The Problem
              </StyledTypography>
            </StyledGrid>
            <StyledGrid item={true} md = {1}/>
            <StyledGrid item={true} md={10}>
            <StyledTypography className={props.classes.typography}>
                Using digital audio workstations (DAWs) can be difficult:
                sometimes you just want to add effects to audio
                and see what it sounds like before you go out
                of your way to actually sample the track. There isn't a simple,
                efficient way to add effects to parts of a song within the browser.
            </StyledTypography>
            </StyledGrid>
            <StyledGrid item={true} md={1}/>
            <StyledGrid item={true} md={12}>
              <StyledTypography className={props.classes.typographyHeading} gutterBottom={true}>
                The Solution
              </StyledTypography>
            </StyledGrid>
            <StyledGrid item={true} md={1}/>
            <StyledGrid item={true} md={10}>
              <StyledTypography className={props.classes.typography}>
                Our application provides an easy-to-use interface where users are given a waveform representation
                of a song of their choosing. They can drag and drop effects to portions of the song to see how they
                sound. Like with any DAW, users can save their projects so that they can save and experiment
                with them later.
              </StyledTypography>
            </StyledGrid>
            <StyledGrid item={true} md={1}/>
            <StyledGrid item={true} md={12}>
              <StyledTypography className={props.classes.typographyHeading} gutterBottom={true}>
                The Team
              </StyledTypography>
            </StyledGrid>
            <StyledGrid item={true} md={4}>
              <StyledTypography className={props.classes.typographyHeading} gutterBottom={true}>
                Eric Zhuang
              </StyledTypography>
            </StyledGrid>
            <StyledGrid item={true} md={4}>
              <StyledTypography className={props.classes.typographyHeading} gutterBottom={true}>
                Aaron Molotsky
              </StyledTypography>
            </StyledGrid>
            <StyledGrid item={true} md={4}>
              <StyledTypography className={props.classes.typographyHeading} gutterBottom={true}>
                Raj Singh
              </StyledTypography>
            </StyledGrid>
            <StyledGrid item={true} md={4} className={props.classes.logo}>
              <img src={EricPic} width='250' height='250'/>
            </StyledGrid>
            <StyledGrid item={true} md={4} className={props.classes.logo}>
              <img src={AaronPic} width='250' height='250'/>
            </StyledGrid>
            <StyledGrid item={true} md={4} className={props.classes.logo}>
              <img src={RajPic} width='250' height='250'/>
            </StyledGrid>
        </StyledGrid>
        </div>
    </Fragment>
  );
}

// @ts-ignore
export default SharedWithStyles()(styles)(Homepage);

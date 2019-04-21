import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Link } from 'react-router-dom';

// Imports for Application State (based on the reducer)
import { MainState } from '../reducers';

// Import constants for Register
import { bindActionCreators } from 'redux';

import { StyledButton, MUIAppBar, StyledTypography } from '../utility/shared';
import * as AppActions from '../containers/app/appActions';
import Homepage from '../containers/homepage/homepage';

import { navBarDisplay } from '../utility/constants';


class StyledAppBar extends React.Component<any> {
    constructor(props) {
        super(props);
        this.testMethod = this.testMethod.bind(this);
        this.registerLink = this.registerLink.bind(this);
        this.loginLink = this.loginLink.bind(this);
        this.generateButtons = this.generateButtons.bind(this);
        this.profileLink = this.profileLink.bind(this);
        this.logoutLink = this.logoutLink.bind(this);
        this.homepageLink = this.homepageLink.bind(this);
    }

    componentDidMount() {
        const currentUser = sessionStorage.getItem('username');
        if (currentUser !== '' && currentUser !== undefined && currentUser !== null) {
            this.props.setUser(currentUser);
        }
    }

    loginLink() {
        this.props.history.push('/login');
    }

    registerLink() {
        this.props.history.push('/register');
    }

    profileLink() {
        this.props.history.push('/projects/' + this.props.currentUser);
    }

    homepageLink() {
        this.props.history.push('/');
    }

    logoutLink() {
        this.props.logoutUser();
    }

    generateButtons() {

        // Create a return array for the buttons to be generated.
        const returnButton = [];

        // Generate styles for the buttons on the homepage.
        const buttonStylez = {
            height: '1.5em',
            float: 'right',
            margin: '1em 0.5em',
            display: 'inline',
            textTransform: 'none'
        };

        // Ensure Homepage Button is always on the left.
        returnButton.push(
                <StyledButton
                    key={'homepage'}
                    variant={'contained'}
                    style={{...buttonStylez, float: 'left'}}
                    onClick={this.homepageLink}
                >Home
                </StyledButton>
        );

        const pageName = this.props.location.pathname.split('/')[1];
        const ourPage = pageName === '' ? 'Welcome to EAR' : navBarDisplay[pageName];
        returnButton.push(
            <StyledTypography
                key='header'
                align='center'
                variant='title'
                inline='true'
                color='textPrimary'
                style={{margin: '1em', display: 'inline-block'}}
            >
            {ourPage}
            </StyledTypography>
        );

        if (this.props.loggedIn) {
            // push profile and logout
            const profileButton = (
                <StyledButton
                    key='prof'
                    variant='contained'
                    style={buttonStylez}
                    onClick={this.profileLink}
                >Profile
                </StyledButton>
            );

            const logoutButton =  (
                <StyledButton
                    key='logout'
                    variant='contained'
                    style={buttonStylez}
                    onClick={this.logoutLink}
                >Logout
                </StyledButton>
            );
            returnButton.push(profileButton, logoutButton);
        } else {
            const registerButton = (
                <StyledButton
                    key={'reg'}
                    variant='contained'
                    style={buttonStylez}
                    onClick={this.registerLink}
                >Register
                </StyledButton>
            );
            const loginButton = (
                <StyledButton
                    key={'login'}
                    variant='contained'
                    style={buttonStylez}
                    onClick={this.loginLink}
                >Login
                </StyledButton>
            );
            returnButton.push(registerButton, loginButton);
        }
        return returnButton;
    }

    testMethod() {
        return;
    }

    componentDidUpdate(prevProps: any) {
        if (prevProps.currentUser !== '' && this.props.currentUser === '') {
            this.props.history.push(prevProps.match.path);
        }
    }

    render() {
        const finalButtons = this.generateButtons();
        return (
            <React.Fragment>
                    <MUIAppBar position='static'>
                        <div style={{display: 'inline'}}>
                            {finalButtons}
                        </div>
                    </MUIAppBar>
            </React.Fragment>
        );
    }
}

// This gives the component access to the store (state)
const mapStateToProps = (state: MainState) => {
    return {
        registerError: state.register.registerError,
        notify: state.register.notify,
        currentUser: state.app.currentUser,
        loggedIn: state.app.loggedIn
    };
};

// This gives the component access to dispatch / the actions
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): AppActions.DispatchProps => {
    return bindActionCreators({
        performLogout: AppActions.performLogout,
        logoutUser: AppActions.logoutUser,
        setUser: AppActions.setUser
    }, dispatch);
};

// This method wraps the component with the store and dispatch!!!
export default connect(mapStateToProps, mapDispatchToProps)(StyledAppBar);

import * as React from 'react';
import { Fragment, Component } from 'react';

import { connect } from 'react-redux';

//import soundfile from '../../../../public/audio/SampleAudio.mp3';

class HomePage extends Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            play: true
        };
        
        this.audio = new Audio("SampleAudio_0.7mb.mp3");
        this.togglePlay = this.togglePlay.bind(this);
    }

    togglePlay() {
        if (this.state.play) {
            this.audio.play().catch(err => {
                console.log(err);
            });
        }
        else {
            this.audio.pause();
        }
        this.setState({ play: !this.state.play });
    }

    render() {
        return (
            <Fragment>
                <h1>Upload some Audio</h1>
                <button onClick={this.togglePlay}>Click Me!</button>
            </Fragment>
        );
    }
}


// This gives the component access to the store (state)
const mapStateToProps = state => {
    return {
        store: {
            ...state
        }
    };
}

// This gives the component access to dispatch / the actions
const mapDispatchToProps = dispatch => {
    return {
        initializeApplication: () => { dispatch(Actions.initializeApplication()); }
    }
}

// This method wraps the component with the store and dispatch!!!
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
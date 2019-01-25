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

        this.audio = new Audio("http://streaming.tdiradio.com:8000/house.mp3");
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
        let buttonName = this.state.play ? "Play" : "Pause";
        return (
            <Fragment>
                <h1>Upload some Audio</h1>
                <button onClick={this.togglePlay}>{buttonName}</button>
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
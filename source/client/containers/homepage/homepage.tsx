import * as React from 'react';
import { Fragment, Component } from 'react';

import { connect } from 'react-redux';

import soundfile from '../../../../public/audio/SampleAudio.mp3';
import PlayButton from 'react-soundplayer/components';

class HomePage extends Component<any, any> {
    constructor(props) {
        super(props);

        this.audio = new Audio(soundfile);

        this.playAudio = this.playAudio.bind(this);
    }

    playAudio() {
        // this.audio.play();
        console.log("play button clicked!");
    }

    render() {
        return (
            <Fragment>
                <h1>Upload some Audio</h1>
                <PlayButton
                  onTogglePlay={this.playAudio}
                />
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
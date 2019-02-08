import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

// Imports for Actions and Types
import * as Actions from './createProjectActions';
import * as Types from './createProjectTypes';

// Imports for Application State (based on the reducer)
import { MainState } from '../../reducers';
import { RouteComponentProps } from 'react-router';
import { CreateProjectState } from './createProjectReducer';


const NewDiv = styled.div`
border-style: solid;
height: 200px;
width: 600px;
text-align: center;
`;

const HeightDiv = styled.div`
height: 50px;
`;

// Interface for what we want to pass as props from the parent component
interface ParentProps extends RouteComponentProps<{}> {}

// Combined Props Type for CreateProject Component (Dispatch and State)
export type CreateProjectProps = Actions.DispatchProps & ParentProps & CreateProjectState;

class CreateProject extends React.Component<CreateProjectProps, any> {
    constructor(props: CreateProjectProps) {
        super(props);
        
        this.state = {
            audio: ''
        };
        this.uploadAudio = this.uploadAudio.bind(this);
        this.allowDragDrop = this.allowDragDrop.bind(this);
        this.allowDrop = this.allowDrop.bind(this);
        this.allowDragDrop();
    }

    allowDrop(event: any) {
        event.preventDefault();
    }

    uploadAudio(audioFile: any) {
        audioFile.stopPropagation();
        audioFile.preventDefault();
        const targetType = audioFile.target.nodeName.toLowerCase();
        let ourMusic: any;
        if (targetType === 'div') {
            ourMusic = audioFile.dataTransfer.files[0];
        } else if (targetType === 'input') {
            ourMusic = audioFile.target.files[0];
        }
        const newSource = URL.createObjectURL(ourMusic);
        // this.setState({audio: newSource});
        this.props.setAudio(newSource);
        this.props.history.push('/workstation');
    }

    allowDragDrop() {
        
    }

    componentDidMount() {
        return;
    }

    render() {
        return (
            <React.Fragment>
                <h1>Testing!</h1>
                <input type="file" id="upload" name="audio" accept=".mp3, .wav" onChange={this.uploadAudio}></input>
                <audio id="sound" type="audio/mp3" src={this.props.audio} controls></audio>
                <HeightDiv/>
                <NewDiv onDrop={this.uploadAudio} onDragOver={this.allowDrop}>Drag and Drop Audio!</NewDiv>

            </React.Fragment>
        );
    }
}


// This gives the component access to the store (state)
const mapStateToProps = (state: MainState) => {
    return {
        volume: state.workstation.volume
    };
}

// This gives the component access to dispatch / the actions
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): Actions.DispatchProps => {
    return {
        setAudio: (url: string) => { dispatch(Actions.setAudio(url)); },
    }
}

// This method wraps the component with the store and dispatch!!!
export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);

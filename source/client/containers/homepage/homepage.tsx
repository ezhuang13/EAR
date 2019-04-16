import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '../../components/appBar';

class Homepage extends React.Component<any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <h1 style={{textAlign: 'center', width: '100%'}}>EAR!</h1>
                <h2 style={{textAlign: 'center', margin: '0 auto', width: '50%'}}>
                We should probably figure out to do with this page, maybe an icon?
                </h2>
            </React.Fragment>
        );
    }
}

export default Homepage;

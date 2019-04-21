import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

// Import shared components
import Form from '../../components/form';
import {
    performValidation
} from '../../utility/schemas';

// Imports for Actions and Types
import {
    performRegister,
    registerFail,
    DispatchProps as RegisterDispatchProps
} from './registerActions';
import * as Types from './registerTypes';

// Imports for Application State (based on the reducer)
import { MainState } from '../../reducers';
import { RegisterProps } from './registerReducer';
import { AppProps } from '../app/appReducer';

// Import constants for Register
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';

// shared parts 
import { StyledPlainPaper, ModalNotify, SharedWithStyles, formStyles } from '../../utility/shared';

// Interface for what we want to pass as props from the parent component
interface ParentProps extends RouteComponentProps<{}> {}

// Combined Props Type for Register Compoinent (Dispatch and State)
export type ComboProps = RegisterDispatchProps & ParentProps & RegisterProps & AppProps;

class Register extends React.Component<ComboProps> {
    constructor(props: ComboProps) {
        super(props);

        this.onAcceptRegister = this.onAcceptRegister.bind(this);
        this.submitRegistration = this.submitRegistration.bind(this);
    }

    componentWillMount() {
        if (this.props.currentUser !== '') {
            this.props.history.push('/projects/' + this.props.currentUser);
        }
    }

    onAcceptRegister() {
        this.props.history.push('/login');
    }

    submitRegistration(registrationInfo: Types.RegisterInformation) {
        const validResult = performValidation(registrationInfo, 'Register');
        if (validResult.error === null) {
            // No error, thus login information passed client-side validation!
            // Allow login fetch to actually happen...
            this.props.performRegister(registrationInfo);
        } else {
            // Login failed! Dispatch loginFail, find correct error therein!
            this.props.registerFail(validResult.mappedError);
        }
    }

    render() {
        return (
            <React.Fragment>
                    <StyledPlainPaper className = {this.props.classes.paper}>
                        <Form
                            type='Register'
                            submitMethod={this.submitRegistration}
                        />
                        {this.props.notify ? (
                        <ModalNotify
                            msg={this.props.notify}
                            onAccept={this.onAcceptRegister}
                        />
                        ) : null}
                    </StyledPlainPaper>
            </React.Fragment>
        );
    }
}

// This gives the component access to the store (state)
const mapStateToProps = (state: MainState) => {
    return {
        registerError: state.register.registerError,
        notify: state.register.notify,
        currentUser: state.app.currentUser
    };
};

// This gives the component access to dispatch / the actions
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): RegisterDispatchProps => {
    return bindActionCreators({
        performRegister,
        registerFail,
    }, dispatch);
};

// This method wraps the component with the store and dispatch!!!
export default connect<any, RegisterDispatchProps, any, MainState>(mapStateToProps,
    mapDispatchToProps)(SharedWithStyles()(formStyles)(Register));

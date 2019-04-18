import * as React from 'react';
import { MaterialUILabel, MaterialUIInput } from './entry';
import { Error } from './error';
import { MainState } from '../reducers';
import { connect } from 'react-redux';
import * as Fields from './constants';
// import from shared folder
import * as Shared from '../utility/shared';


// Props interface definition for the Form Props
interface FormProps {
    type: string;
    loginError: any;
    registerError: any;
    submitMethod(event: any): void;
}

// State interface definition for the Form State
interface FormState {
    [key: string]: any;
    fields_list: string[];
    fields_keys: string[];
}

/**
 * Rect Component for Dynamically Rendered Forms
 * @props Receivers fields (list of strings for the form parameters)
 * and submitMethod (what to do with the completed form information)
 */
class Form extends React.Component<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props);

        this.state = {
            fields_keys: [],
            fields_list: []
        };

        this.createFields = this.createFields.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.createForm = this.createForm.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.obtainError = this.obtainError.bind(this);
        this.createFields();
    }

    // Maps the props-based input fields to the Entry components (Label and Input),
    // returns the contents of the dynamic form.
    createForm() {
        const formOutline = this.state.fields_list.map((name, index) => {
            const type = name === 'password' ? 'password' : 'text';
            return (
                <form key={index} onSubmit={this.submitForm} style={{width: '254px'}}>
                    <Shared.StyledFormControl margin = "normal">
                        <MaterialUILabel labelText={this.state.fields_keys[index]}/>
                        <MaterialUIInput
                            name={name}
                            type={type}
                            value={this.state[name]}
                            onChange={this.handleChange}
                            id={index + this.props.type}
                        />
                    </Shared.StyledFormControl>
                </form>
            );
        });

        return formOutline;
    }

    // Detects any change in the input, assigns the proper value to
    // the key (located in the component state).
    handleChange(event: any) {
        // Obtain variables from event change
        const target = event.target;
        const value = target.value;
        const name = target.name;

        // Create the change object, set state
        const change = {};
        change[name] = value;
        this.setState(change);
    }

    // Wrapper method for the props-based submit method.
    submitForm(event: any) {
        event.preventDefault();
        const {fields_list, fields_keys, ...formInfo} = this.state;
        const formInformation = JSON.parse(JSON.stringify(formInfo));
        this.props.submitMethod(formInformation);
    }

    // Creates the key-value pair lists for the dynamic form (iterates through
    // the fields from props, creates a value for each key in the component state,
    // then create two different lists for the key-values)
    createFields() {

        // The typical type check to determine our Fields Object
        let fieldsObject: object;
        switch (this.props.type) {
            case 'Login':
                fieldsObject = Fields.LoginFields;
                break;
            case 'Register':
                fieldsObject = Fields.RegisterFields;
                break;
            default:
                break;
        }

        for (const key in fieldsObject) {
            if (fieldsObject.hasOwnProperty(key)) {
                const currentValue = fieldsObject[key];
                this.state = {
                    ...this.state,
                    [currentValue]: ''
                };
                this.state.fields_keys.push(key);
                this.state.fields_list.push(currentValue);
            }
        }
    }

    obtainError() {
        switch (this.props.type) {
            case 'Login':
                return this.props.loginError;
            case 'Register':
                return this.props.registerError;
        }
    }

    // Render method!
    render() {
        const ourError = this.obtainError();
        const ourForm = this.createForm();
        return (
            <React.Fragment>
                <Shared.StyledMuiThemeProvider theme={Shared.firstTheme}>
                    <Error errorText={ourError}/>
                        {ourForm}
                    <Shared.StyledButton variant = "contained" onClick={this.submitForm}>{this.props.type}</Shared.StyledButton>
                </Shared.StyledMuiThemeProvider>
            </React.Fragment>
        );
    }
}

// This gives the component access to the store (state)
const mapStateToProps = (state: MainState) => {
    return {
        loginError: state.login.loginError,
        registerError: state.register.registerError
    };
};

export default connect(mapStateToProps)(Form);

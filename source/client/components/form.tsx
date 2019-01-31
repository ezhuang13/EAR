import styled from 'styled-components';
import * as React from 'react';
import { Label, Input } from './entry';

// Props interface definition for the Form Props
interface FormProps {
    fields: object;
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

        this.createFields();
    }

    // Maps the props-based input fields to the Entry components (Label and Input),
    // returns the contents of the dynamic form.
    createForm() {
        const formOutline = this.state.fields_list.map((name, index) => {
            return (
                <React.Fragment key={index}>
                    <Label labelText={this.state.fields_keys[index]}/>
                    <Input
                        name={name}
                        type='text'
                        value={this.state[name]}
                        onChange={this.handleChange}
                    />
                    <br/>
                </React.Fragment>
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
        for (const key in this.props.fields) {
            if (this.props.fields.hasOwnProperty(key)) {
                const currentValue = this.props.fields[key];
                this.state = {
                    ...this.state,
                    [currentValue]: ''
                };
                this.state.fields_keys.push(key);
                this.state.fields_list.push(currentValue);
            }
        }
    }

    // Render method!
    render() {
        return (
            <form onSubmit={this.submitForm}>
                {this.createForm()}
                <button>Click me!</button>
            </form>
        );
    }
}

export default Form;

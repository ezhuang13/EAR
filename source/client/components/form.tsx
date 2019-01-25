import styled from 'styled-components';
import * as React from 'react';
import { Component, Fragment} from 'react';

import { Label, Input } from './entry';
import { setFlagsFromString } from 'v8';

interface FormProps {
    fields: Object;
    submitMethod(event: any): void;
}

interface FormState {
    [key: string]: any;
    fields_list: string[];
    fields_keys: string[];
};

class Form extends Component<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props);

        this.state = {
            fields_list: [],
            fields_keys: []
        };

        this.createFields = this.createFields.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.createForm = this.createForm.bind(this);
        this.submitForm = this.submitForm.bind(this);

        this.createFields();
    }

    createFields() {
        for (let key in this.props.fields) {
            const currentValue = this.props.fields[key];
            this.state = {
                ...this.state,
                [currentValue]: ""
            };
            this.state.fields_keys.push(key);
            this.state.fields_list.push(currentValue);
        }
    }

    createForm() {
        const formOutline = this.state.fields_list.map((name, index) => {
            return (
                <Fragment key={index}>
                    <Label labelText={this.state.fields_keys[index]}/>
                    <Input
                        name={name}
                        type="text"
                        value={this.state[name]}
                        onChange={this.handleChange}/>
                    <br/>
                </Fragment>
            );
        });
        return formOutline;
    }

    handleChange(event: any) {
        // Obtain variables from event change
        const target = event.target;
        const value = target.value;
        const name = target.name;

        // Create the change object, set state
        let change = {};
        change[name] = value;
        this.setState(change);
    }

    submitForm(event: any) {
        event.preventDefault();
        const {fields_list, fields_keys, ...formInfo} = this.state;
        const formInformation = JSON.parse(JSON.stringify(formInfo));
        console.log(this, formInformation);
        this.props.submitMethod(formInformation);
    }

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
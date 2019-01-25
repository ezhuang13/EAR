import styled from 'styled-components';
import * as React from 'react';

// Probably will end up in another file, to ensure global styling!
const FormLabel = styled.label``;
const FormInput = styled.input``;

interface LabelProps {
  labelText?: string;
}

interface InputProps {
  // Usually default Input Attributes
  id?: string;
  name?: string;
  value?: any;
  type?: string;
  onChange(event: any): void;
}

export const Label: React.SFC<LabelProps> = props => {
  return (
    <FormLabel>{props.labelText}</FormLabel>
  )
}

export const Input: React.SFC<InputProps> = props => {
  return (
    <FormInput
    onChange={props.onChange}
    id={props.id}
    type={props.type}
    name={props.name}
    value={props.value}></FormInput>
  )
};
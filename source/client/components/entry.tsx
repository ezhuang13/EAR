import styled from 'styled-components';
import * as React from 'react';

interface LabelProps {
  labelText: string;
}

const FormLabel = styled.label``;
const FormInput = styled.input``;

export const Label = ({labelText}) => {
  return (
    <FormLabel>{labelText}</FormLabel>
  );
};

interface InputProps {
  // Usually default Input Attributes
  id?: string;
  name?: string;
  value?: any;
  type?: string;
  onChange(event: any): void;
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
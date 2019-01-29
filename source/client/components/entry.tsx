import styled from 'styled-components';
import * as React from 'react';

// Probably will end up in another file, to ensure global styling!
const FormLabel = styled.label``;
const FormInput = styled.input``;

// Props interface definition for the Label Component
interface LabelProps {
  labelText?: string;
}

// Props interface definition for the Input Component
interface InputProps {
  // Usually default Input Attributes
  id?: string;
  value?: number | string;
  name: string;
  type: string;
  onChange(event: any): void;
}

/**
 * Stateless Functional Component for Form Labels
 * @param props Receives labelText (the text presented in the label)
 * @returns JSX for the Label Component
 */
export const Label: React.SFC<LabelProps> = (props: LabelProps) => {
  return (
    <FormLabel>{props.labelText ? props.labelText : ''}</FormLabel>
  );
};

/**
 * Stateless Functional Component for Form Inputs
 * @param props Receives onChange (required), id (optional),
 * type (optional), name (optional), value (optional)
 * @returns JSX for the Input Component
 */
export const Input: React.SFC<InputProps> = (props: InputProps) => {
  return (
    <FormInput
      onChange={props.onChange}
      type={props.type}
      name={props.name}
      value={props.value}
      id={props.id ? props.id : ''}
    />
  );
};

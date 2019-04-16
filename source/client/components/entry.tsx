import styled from 'styled-components';
import * as React from 'react';

// import material ui components
import { StyledInputLabel, StyledInput } from '../utility/shared';

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
export const MaterialUILabel: React.SFC<LabelProps> = (props: LabelProps) => {
  return (
    <StyledInputLabel>{props.labelText ? props.labelText : ''}</StyledInputLabel>
  );
};

/**
 * Stateless Functional Component for Form Inputs
 * @param props Receives onChange (required), id (optional),
 * type (optional), name (optional), value (optional)
 * @returns JSX for the Input Component
 */
export const MaterialUIInput: React.SFC<InputProps> = (props: InputProps) => {
  return (
    <StyledInput
      onChange={props.onChange}
      type={props.type}
      name={props.name}
      value={props.value}
      id={props.id ? props.id : ''}
    />
  );
};

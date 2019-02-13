import styled from 'styled-components';
import * as React from 'react';

// Probably will end up in another file, to ensure global styling!
const ErrorMessage = styled.div`
    color: red;
    margin: 0.125em;
`;

// Props interface definition for the Label Component
interface ErrorProps {
  errorText?: string;
}

/**
 * Stateless Functional Component for Form Labels
 * @param props Receives labelText (the text presented in the label)
 * @returns JSX for the Label Component
 */
export const Error: React.SFC<ErrorProps> = (props: ErrorProps) => {
  return (
    <ErrorMessage>{props.errorText ? props.errorText : ''}</ErrorMessage>
  );
};
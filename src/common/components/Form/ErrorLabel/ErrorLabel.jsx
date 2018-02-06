import React from 'react';
import { Label } from 'semantic-ui-react';

const ErrorLabel = ({ touched, error }) =>
  touched && error
    ? (
      <Label
        basic={ true }
        color="red"
        className="formError"
      >
        {error}
      </Label>
    )
    : null;

export default ErrorLabel;

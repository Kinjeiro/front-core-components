/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Field,
} from 'redux-form';
import {
  Form,
} from 'semantic-ui-react';

// ======================================================
// UTILS
// ======================================================

// ======================================================
// COMPONENTS
// ======================================================
import {
  RadioField,
} from './redux-form';

export default class RadioGroup extends Component {
  static propTypes = {
    groupName: PropTypes.string,
    groupLabel: PropTypes.string,
    values: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.node,
      value: PropTypes.any,
      additionalControl: PropTypes.node,
    })),
    readOnly: PropTypes.bool,
    radioFieldProps: PropTypes.object,
  };

  render() {
    const {
      groupName,
      groupLabel,
      values,
      readOnly,
      radioFieldProps = {},
    } = this.props;

    return (
      <Form.Group
        key={ groupName }
        grouped={ true }
      >
        <label>{ groupLabel }</label>
        {
          values.map(({ value, label, additionalControl }) => [
            <Field
              key={ `${groupName}_${value}` }
              component={ RadioField }
              label={ label }
              name={ groupName }
              radioValue={ value }
              readOnly={ readOnly }
              { ...radioFieldProps }
            />,
            additionalControl,
          ])
        }
      </Form.Group>
    );
  }
}

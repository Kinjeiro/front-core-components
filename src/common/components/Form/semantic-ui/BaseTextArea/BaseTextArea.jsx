/* eslint-disable no-unused-vars */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  TextArea as SemanticTextArea,
} from 'semantic-ui-react';

export default class BaseTextArea extends PureComponent {
  render() {
    const {
      className,
      touched,
      ...otherProps
    } = this.props;

    // убирем лишнюю стилизацию от семантика
    return (
      <SemanticTextArea
        { ...otherProps }
        className={ `BaseTextArea ${className || ''}` }
      />
    );
  }
}

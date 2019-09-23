import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import bind from 'lodash-decorators/bind';
import { Checkbox as CheckboxSemantic } from 'semantic-ui-react';

export default class Checkbox extends PureComponent {
  render() {
    const {
      isProcessing,
      touched,
      onTouch,
      ...otherProps
    } = this.props;

    return (
      <CheckboxSemantic
        { ...otherProps }
      />
    );
  }
}

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import bind from 'lodash-decorators/bind';
import { Radio as RadioSemantic } from 'semantic-ui-react';

export default class Radio extends PureComponent {
  render() {
    const {
      isProcessing,
      touched,
      onTouch,
      ...otherProps
    } = this.props;

    return (
      <RadioSemantic
        { ...otherProps }
      />
    );
  }
}

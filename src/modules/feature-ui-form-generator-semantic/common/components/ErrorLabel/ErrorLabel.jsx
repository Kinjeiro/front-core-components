import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import bind from 'lodash-decorators/bind';

// import i18n from '../../utils/i18n';

import getComponents from '../../get-components';

const {
  Label,
} = getComponents();

export default class ErrorLabel extends PureComponent {
  static propTypes = {
    touched: PropTypes.bool,
    error: PropTypes.node,
  };

  render() {
    const {
      touched,
      error,
    } = this.props;

    return touched && error
     ? (
       <Label
         basic={true}
         color="red"
         className="formError"
       >
         {error}
       </Label>
     )
     : null;
  }
}

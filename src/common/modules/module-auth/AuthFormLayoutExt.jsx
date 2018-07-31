import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import bind from 'lodash-decorators/bind';

// import i18n from '../../utils/i18n';

import './AuthFormLayoutExt.scss';

export default class AuthLayoutExt extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const {
      children,
    } = this.props;

    return (
      <div className="AuthFormLayoutExt">
        { children }
      </div>
    );
  }
}

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import bind from 'lodash-decorators/bind';

// import i18n from '../../utils/i18n';

import './Breadcrumbs.scss';

export default class Breadcrumbs extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    elements: PropTypes.array,
    children: PropTypes.node,
  };

  render() {
    const {
      className,
      elements,
      children,
    } = this.props;

    return (
      <div className={ `Breadcrumbs ${className || ''}` }>
        { elements || children }
      </div>
    );
  }
}


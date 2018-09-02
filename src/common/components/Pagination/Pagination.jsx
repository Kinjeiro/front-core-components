import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import bind from 'lodash-decorators/bind';

import { Pagination as PaginationSemantic } from 'semantic-ui-react';

// import i18n from '../../utils/i18n';

import './Pagination.scss';

export default class Pagination extends PureComponent {
  static propTypes = PaginationSemantic.propTypes;
  static defaultProps = PaginationSemantic.defaultProps;

  render() {
    const {
      activePage,
      totalPages,
      className,
    } = this.props;

    const isFirstPage = activePage === 1;
    const isLastPage = totalPages ? activePage === totalPages : null;

    return (
      <PaginationSemantic
        { ...this.props }
        className={
          `Pagination \
          ${className || ''} \
          ${isFirstPage ? 'Pagination--first' : ''} \
          ${isLastPage ? 'Pagination--last' : ''}`
        }
      />
    );
  }
}

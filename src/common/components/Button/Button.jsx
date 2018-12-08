import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import bind from 'lodash-decorators/bind';

import STATUS_PROP_TYPE from '@reagentum/front-core/lib/common/models/action-status';
import { emitProcessing } from '@reagentum/front-core/lib/common/utils/common';

import { Button as ButtonSemantic } from 'semantic-ui-react';

import './Button.scss';

export default class Button extends PureComponent {
  static propTypes = {
    ...ButtonSemantic.propTypes,
    loading: PropTypes.oneOfType([
      PropTypes.bool,
      STATUS_PROP_TYPE,
    ]),
    simple: PropTypes.bool,
    asyncIsLoading: PropTypes.bool,
  };

  static defaultProps = {
    type: 'button',
    asyncIsLoading: false,
  };

  state = {
    isProcessing: undefined,
  };

  // ======================================================
  // HANDLERS
  // ======================================================
  @bind()
  handleClick(...args) {
    const {
      onClick,
      asyncIsLoading,
    } = this.props;

    if (onClick) {
      if (asyncIsLoading) {
        return emitProcessing(
          onClick(...args),
          this,
        );
      }
      return onClick(...args);
    }
    return true;
  }

  // ======================================================
  // MAIN RENDER
  // ======================================================
  render() {
    const {
      simple,
      loading,
      asyncIsLoading,
      ...semanticProps
    } = this.props;
    const {
      isProcessing,
    } = this.state;


    const isLoading = typeof loading !== 'undefined'
      ? typeof loading === 'object' && loading !== null && typeof loading.isFetching !== 'undefined'
        ? loading.isFetching
        : loading
      : asyncIsLoading
        ? isProcessing
        : undefined;

    return (
      <ButtonSemantic
        { ...semanticProps }
        onClick={ this.handleClick }
        loading={ isLoading }
        className={ `\
          Button\
          ${simple ? 'Button--simple' : ''}\
          ${isLoading ? 'Button--loading' : ''}\
          ${semanticProps.className || ''}\
        ` }
      />
    );
  }
}

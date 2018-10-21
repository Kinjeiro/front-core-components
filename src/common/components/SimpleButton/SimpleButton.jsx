import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import bind from 'lodash-decorators/bind';

import './SimpleButton.scss';

/**
 * Меня достало semantic .ui.button селекторы
 */
export default class SimpleButton extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    onClick: PropTypes.func,
    onClickArgs: PropTypes.any,
  };

  static defaultProps = {
    type: 'button',
  };

  // ======================================================
  // HANDLERS
  // ======================================================
  @bind()
  handleClick(...args) {
    const {
      onClick,
      onClickArgs,
    } = this.props;

    return onClick
      ? typeof onClickArgs === 'undefined'
        ? onClick(...args)
        : onClick(...(Array.isArray(onClickArgs) ? onClickArgs : [onClickArgs]))
      : undefined;
  }

  // ======================================================
  // MAIN RENDER
  // ======================================================
  render() {
    const {
      type,
      className,
      onClick,
      onClickArgs,
      ...otherProps
    } = this.props;

    return (
      <button
        { ...otherProps }
        className={ `SimpleButton ${className || ''}` }
        type={ type }
        onClick={ this.handleClick }
      />
    );
  }
}

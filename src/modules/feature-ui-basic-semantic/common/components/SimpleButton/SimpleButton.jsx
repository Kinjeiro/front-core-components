/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';

import getComponents from '../../get-components';

const { Button } = getComponents();

/**
 * @deprecated - использовать Button simple={ true }
 * Меня достало semantic .ui.button селекторы
 */
export default class SimpleButton extends PureComponent {
  render() {
    const {
      className,
      ...otherProps
    } = this.props;

    return (
      <Button
        simple={ true }
        { ...otherProps }
        className={ `SimpleButton ${className || ''}` }
      />
    );
  }
}

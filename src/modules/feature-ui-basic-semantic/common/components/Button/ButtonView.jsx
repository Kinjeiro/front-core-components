import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import PROPS from '@reagentum/front-core/lib/modules/feature-ui-basic/common/subModule/components/Button/button-props';

import { Button as ButtonSemantic } from 'semantic-ui-react';

import getComponents from '../../get-components';

const {
  Loading,
} = getComponents();

// require('./ButtonView.scss');
require('./button-semantic-fix.scss');

export default class ButtonView extends PureComponent {
  static propTypes = {
    ...ButtonSemantic.propTypes,
    ...PROPS,
  };

  static defaultProps = {
    as: ButtonSemantic,
  };

  // ======================================================
  // MAIN RENDER
  // ======================================================
  render() {
    const {
      as,
      loading,
      disabled,
      children,
      className,
      notNaturalButton,
      asyncIsLoading,

      onClick,
    } = this.props;

    const notNaturalButtonFinal = typeof notNaturalButton !== 'undefined'
      ? notNaturalButton
      : as !== ButtonView.defaultProps.as;

    return React.createElement(
      as,
      {
        ...this.props,
        onClick: notNaturalButtonFinal && disabled ? undefined : onClick,
        className: `${className} ${notNaturalButtonFinal ? 'Button--notNaturalButton' : ''}`,
      },
      // у ButtonSemantic есть свой loading
      notNaturalButtonFinal && loading ? (<Loading />) : children,
    );
  }
}

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import bind from 'lodash-decorators/bind';

import { Button as ButtonSemantic } from 'semantic-ui-react';

import './Button.scss';

export default class Button extends PureComponent {
  static propTypes = {
    ...ButtonSemantic.propTypes,
    simple: PropTypes.bool,
  };

  static defaultProps = {
    type: 'button',
  };

  // ======================================================
  // MAIN RENDER
  // ======================================================
  render() {
    const {
      simple,
      ...semanticProps
    } = this.props;

    return (
      <ButtonSemantic
        { ...semanticProps }
        className={ `Button ${simple ? 'Button--simple' : ''} ${semanticProps.className || ''}` }
      />
    );
  }
}

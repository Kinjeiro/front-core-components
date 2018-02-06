import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';

import i18n from '../../utils/i18n';

import './Loading.scss';

export default class Loading extends Component {
  static propTypes = {
    withText: PropTypes.any,
    className: PropTypes.string,
  };

  static defaultProps = {
    withText: false,
  };

  // ======================================================
  // MAIN RENDER
  // ======================================================
  render() {
    const {
      withText,
      className,
    } = this.props;

    return (
      <div className={ `Loading ${className || ''} ${withText && 'Loading--withText'}` }>
        <Loader active={ true }>
          {
            withText === true
              ? i18n('components.Loading.loadingText')
              : withText === false
              ? undefined
              : withText
          }
        </Loader>
      </div>
    );
  }
}

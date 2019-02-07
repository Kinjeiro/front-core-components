// todo @ANKU @LOW - @toCore
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import bind from 'lodash-decorators/bind';

import logger from '@reagentum/front-core/lib/common/helpers/client-logger';

import i18n from '../../i18n';
import getComponents from '../../get-components';

const { Button } = getComponents();

export default class ErrorBoundary extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
    hasError: PropTypes.bool,
  };

  state = {
    hasError: this.props.hasError,
  };

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
    });
    logger.error(error, info);
  }

  // ======================================================
  // HANDLERS
  // ======================================================
  @bind()
  handleUpdate() {
    this.setState({
      hasError: false,
    });
    this.forceUpdate();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="ErrorBoundary">
          <h1>
            { i18n('components.ErrorBoundary.errorOccurred') }
          </h1>
          <Button onClick={ this.handleUpdate }>
            { i18n('components.ErrorBoundary.refreshButton') }
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}

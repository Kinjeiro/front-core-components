import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
} from 'semantic-ui-react';

import './TwoColumnMobileRow.scss';

export default class TwoColumnMobileRow extends Component {
  static propTypes = {
    className: PropTypes.string,
    left: PropTypes.node,
    leftWrapInLabel: PropTypes.bool,
    right: PropTypes.node,
    leftColumnProps: PropTypes.object,
    rightColumnProps: PropTypes.object,
    wrapInGrid: PropTypes.node,
  };

  static defaultProps = {
    leftWrapInLabel: true,
    wrapInGrid: false,
    leftColumnProps: {},
    rightColumnProps: {},
  };

  render() {
    const {
      className,
      left,
      leftWrapInLabel,
      right,
      leftColumnProps,
      rightColumnProps,
      wrapInGrid,
    } = this.props;

    let control = (
      <Grid.Row className={ `TwoColumnMobileRow ${className || ''}` }>
        <Grid.Column
          computer={ 8 }
          tablet={ 8 }
          mobile={ 16 }
          className="field TwoColumnMobileRow__left"
          { ...leftColumnProps }
        >
          {
            (left && leftWrapInLabel && (
              <label>{ left }</label>
            )) || left
          }
        </Grid.Column>
        <Grid.Column
          computer={ 8 }
          tablet={ 8 }
          mobile={ 16 }
          className="TwoColumnMobileRow__right"
          { ...rightColumnProps }
        >
          { right }
        </Grid.Column>
      </Grid.Row>
    );

    if (wrapInGrid) {
      control = (
        <Grid className="TwoColumnMobileGrid">
          { control }
        </Grid>
      );
    }

    return control;
  }
}


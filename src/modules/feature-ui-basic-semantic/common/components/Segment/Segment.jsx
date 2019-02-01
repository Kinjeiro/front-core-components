import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Segment as SemanticSegment,
} from 'semantic-ui-react';

import getComponents from '../../get-components';

const { Header } = getComponents();

require('./Segment.scss');

export default class Segment extends Component {
  static propTypes = {
    label: PropTypes.node,
    ...SemanticSegment.propTypes,
  };

  render() {
    const {
      label,
      className,
      children,
      ...otherProps
    } = this.props;

    return (
      <SemanticSegment
        vertical={ true }
        basic={ true }
        { ...otherProps }
        className={ `Segment ${className || ''}` }
      >
        {
          label && (
            <Header
              as="h3"
              className="Segment__header"
              content={ label }
            />
          )
        }
        <div className="ui segment">
          { children }
        </div>
      </SemanticSegment>
    );
  }
}

/* eslint-disable no-unused-vars */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  TextArea as SemanticTextArea,
} from 'semantic-ui-react';

export default class BaseTextArea extends PureComponent {
  render() {
    // @todo @Panin почему-то textarea в semantic-ui стилизован только через обертку .ui.form
    return (
      <div className="ui form">
        <SemanticTextArea
          { ...this.props }
        />
      </div>
    );
  }
}

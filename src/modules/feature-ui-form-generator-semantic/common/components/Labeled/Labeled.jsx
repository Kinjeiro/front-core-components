import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Labeled extends Component {
  static propTypes = {
    value: PropTypes.node,
  };

  render() {
    const {
      value,
    } = this.props;

    return (
      <label>
        { value }
      </label>
    );
  }
}

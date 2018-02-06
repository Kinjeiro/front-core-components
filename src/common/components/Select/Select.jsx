import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bind from 'lodash-decorators/bind';

import { Select as SemanticSelect } from 'semantic-ui-react';

import i18n from '../../utils/i18n';

// import './Select.scss';
export default class Select extends Component {
  static propTypes = {
    className: PropTypes.string,
    // https://react.semantic-ui.com/modules/dropdown
    ...SemanticSelect.propTypes,
  };

  static defaultProps = {
  };

  // ======================================================
  // LIFECYCLE
  // ======================================================
  // componentDidMount() {
  // }
  // componentWillReceiveProps(newProps) {
  // }


  // ======================================================
  // HANDLERS
  // ======================================================
  // @bind()

  // ======================================================
  // RENDERS
  // ======================================================


  // ======================================================
  // MAIN RENDER
  // ======================================================
  render() {
    const {
      className,
      ...otherProps
    } = this.props;

    return (
      <SemanticSelect
        className={ `Select ${className || ''}` }
        { ...otherProps }
      />
    );
  }
}

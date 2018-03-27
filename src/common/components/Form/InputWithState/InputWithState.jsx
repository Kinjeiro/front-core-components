/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bind from 'lodash-decorators/bind';
import {
  Input as SemanticInput,
} from 'semantic-ui-react';

import wrapper from '../semantic-field-wrapper';

// import './InputWithState.scss';

export class InputWithState extends Component {
  static propTypes = {
    ...SemanticInput.propTypes,
    withState: PropTypes.bool,

    onChangedBlur: PropTypes.func,
  };

  static defaultProps = {
    withState: true,
  };

  state = {
    tempValue: this.props.withState ? this.props.value : undefined,
    lastChangedBlurValue: undefined,
  };

  // ======================================================
  // LIFECYCLE
  // ======================================================
  // componentDidMount() {
  // }
  // componentWillReceiveProps(newProps) {
  // }

  /**
   *
   * @param withBlur
   * @param withChange
   * @param event
   * @param comp
   */
  update(withBlur, withChange, event, comp) {
    const {
      type,
      onChange,
      onBlur,
      onChangedBlur,
      readOnly,
    } = this.props;

    const { lastChangedBlurValue } = this.state;

    const newValue = event.target.value;
    const value = type === 'number'
      ? +newValue
      : newValue;

    const hasChanges = newValue !== lastChangedBlurValue;

    if (withChange && onChange) {
      onChange(event, { ...comp, value });
    }
    if (withBlur && onBlur) {
      onBlur(event, { ...comp, value });
    }
    if (withBlur && onChangedBlur && hasChanges && !readOnly) {
      onChangedBlur(event, { ...comp, value });
      this.setState({
        lastChangedBlurValue: value,
      });
    }
  }

  // ======================================================
  // HANDLERS
  // ======================================================
  @bind()
  handleChange(event, ...other) {
    const { withState } = this.props;

    if (withState) {
      this.setState({
        tempValue: event.target.value,
      });
    }

    this.update(false, true, event, ...other);
  }

  @bind()
  handleBlur(event, ...other) {
    this.update(true, false, event, ...other);
  }

  @bind()
  handleKeyPress(event, ...other) {
    if (event.key === 'Enter') {
      this.update(true, true, event, ...other);
    }

    if (this.props.onKeyPress) {
      this.props.onKeyPress(event, ...other);
    }
  }

  // ======================================================
  // MAIN RENDER
  // ======================================================
  render() {
    const {
      value,
      withState,
      onChangedBlur,
      ...inputProps
    } = this.props;

    const { tempValue } = this.state;

    return (
      <SemanticInput
        value={ withState ? (tempValue || value) : value }
        { ...inputProps }
        onChange={ this.handleChange }
        onKeyPress={ this.handleKeyPress }
        onBlur={ this.handleBlur }
      />
    );
  }
}

export default wrapper(InputWithState);

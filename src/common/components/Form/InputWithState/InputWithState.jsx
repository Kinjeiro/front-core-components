import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bind from 'lodash-decorators/bind';
import {
  Input as SemanticInput,
} from 'semantic-ui-react';

import wrapper from '../semantic-field-wrapper';

// import './Input.scss';

export class InputWithState extends Component {
  static propTypes = SemanticInput.propTypes;

  static defaultProps = {
  };

  state = {
    tempValue: this.props.value,
  };

  // ======================================================
  // LIFECYCLE
  // ======================================================
  // componentDidMount() {
  // }
  // componentWillReceiveProps(newProps) {
  // }
  update(withBlur, withChange, event, comp) {
    const {
      type,
      onChange,
      onBlur,
    } = this.props;

    const tempValue = event.target.value;
    const value = type === 'number'
      ? +tempValue
      : tempValue;

    if (withChange && onChange) {
      onChange(event, { ...comp, value });
    }
    if (withBlur && onBlur) {
      debugger;
      onBlur(event, { ...comp, value });
    }
  }

  // ======================================================
  // HANDLERS
  // ======================================================
  @bind()
  handleChange(event, ...other) {
    this.setState({
      tempValue: event.target.value,
    });
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
  // RENDERS
  // ======================================================


  // ======================================================
  // MAIN RENDER
  // ======================================================
  render() {
    const {
      value,
      ...otherProps
    } = this.props;

    const { tempValue } = this.state;

    return (
      <SemanticInput
        value={ tempValue || value }
        { ...otherProps }
        onChange={ this.handleChange }
        onKeyPress={ this.handleKeyPress }
        onBlur={ this.handleBlur }
      />
    );
  }
}

export default wrapper(InputWithState);

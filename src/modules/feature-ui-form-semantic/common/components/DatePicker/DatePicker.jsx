import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bind from 'lodash-decorators/bind';

import 'react-dates/initialize';
// важно чтобы было после инициализации
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import {
  DATE_FORMAT,
  parseDate,
  parseToSystem,
} from '@reagentum/front-core/lib/common/utils/date-utils';

// import i18n from '../../../utils/i18n';

import './DatePicker.scss';

export default class DatePicker extends Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    className: PropTypes.string,
    readOnly: PropTypes.bool,

    // onBlur: PropTypes.func,
    onBlurWithChange: PropTypes.func,
    // ...omit(SingleDatePicker.propTypes, ['onDateChange', 'date', 'onFocusChange', 'focused', 'id']),
  };

  static defaultProps = {
  };

  state = {
    focused: undefined,
    // tempValue: this.props.value,
  };

  // eslint-disable-next-line react/sort-comp
  tempValue = null;

  // ======================================================
  // LIFECYCLE
  // ======================================================
  // componentDidMount() {
  // }
  componentWillReceiveProps(newProps) {
    if (newProps.value !== this.props.value) {
      this.tempValue = newProps.value;
      // this.setState({
      //   tempValue: newProps.value,
      // });
    }
  }


  // ======================================================
  // HANDLERS
  // ======================================================
  @bind()
  handleChange(momentDate) {
    const {
      readOnly,
      onChange,
      value,
    } = this.props;

    if (!readOnly && onChange) {
      const oldValue = parseToSystem(value);
      const newValue = parseToSystem(momentDate);
      if (newValue !== oldValue) {
        onChange(newValue);
      }
      // this.setState({
      //   tempValue: newValue,
      // });
      this.tempValue = newValue;
    }
  }
  @bind()
  handleBlur() {
    const {
      readOnly,
      // onBlur,
      onBlurWithChange,
      value,
    } = this.props;
    // const { tempValue } = this.state;
    const { tempValue } = this;

    if (!readOnly) {
      const newValue = parseToSystem(tempValue);
      const oldValue = parseToSystem(value);
      // if (onBlur) {
      //   onBlur(null, newValue, oldValue);
      // }
      if (onBlurWithChange && newValue !== oldValue) {
        onBlurWithChange(null, newValue, oldValue);
      }
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
      name,
      value,
      className,
      readOnly,
      showTime,
      disabledDate,
      errors,
      touched,
      defaultValue,
      multiple,
      title,
      isProcessing,
      onBlur,
      onTouch,
      // eslint-disable-next-line no-unused-vars
      onChange,
      // onBlur,
      ...SingleDatePickerProps
    } = this.props;

    // name, onChange, value

    const {
      focused: stateFocused,
    } = this.state;

    /*
      @NOTE: работает только на moment
    */
    return (
      <div className={ `DatePicker ${readOnly ? 'DatePicker--readOnly' : ''} ${className || ''}` }>
        <SingleDatePicker
          id={ name }
          date={ parseDate(value) }
          focused={ stateFocused }
          numberOfMonths={ 1 }
          isOutsideRange={ () => false }
          displayFormat={ DATE_FORMAT }
          readOnly={ readOnly }
          disabled={ readOnly }
          {
            ...SingleDatePickerProps
          }
          onFocusChange={ ({ focused }) => {
            this.setState({ focused });
            if (!focused) {
              // нужно чтобы setState в onChange успел сработать
              this.handleBlur();
            }
          } }
          onDateChange={ this.handleChange }
        />
      </div>
    );
  }
}

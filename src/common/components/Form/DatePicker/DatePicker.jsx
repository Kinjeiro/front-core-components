import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bind from 'lodash-decorators/bind';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import {
  DATE_FORMAT,
  parseDate,
  formatDateToTimestamp,
} from '@reagentum/front-core/lib/common/utils/date-utils';

// import i18n from '../../../utils/i18n';

import './DatePicker.scss';

export default class DatePicker2 extends Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    className: PropTypes.string,
    readOnly: PropTypes.bool,
    // ...omit(SingleDatePicker.propTypes, ['onDateChange', 'date', 'onFocusChange', 'focused', 'id']),
  };

  static defaultProps = {
  };

  state = {
    focused: undefined,
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
  @bind()
  handleChange(momentDate) {
    const {
      readOnly,
      onChange,
    } = this.props;

    if (!readOnly) {
      onChange(formatDateToTimestamp(momentDate));
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
      // eslint-disable-next-line no-unused-vars
      onChange,
      ...SingleDatePickerProps
    } = this.props;

    // name, onChange, value

    const { focused: stateFocused } = this.state;

    /*
      @NOTE: работает только на moment
    */
    return (
      <div className={ `DatePicker ${readOnly ? 'DatePicker--readOnly' : ''} ${className || ''}` }>
        <SingleDatePicker
          id={ name }
          date={ parseDate(value) }
          onDateChange={ this.handleChange }
          focused={ stateFocused }
          onFocusChange={ ({ focused }) => this.setState({ focused }) }
          numberOfMonths={ 1 }
          isOutsideRange={ () => false }
          displayFormat={ DATE_FORMAT }
          readOnly={ readOnly }
          disabled={ readOnly }
          {
            ...SingleDatePickerProps
          }
        />
      </div>
    );
  }
}

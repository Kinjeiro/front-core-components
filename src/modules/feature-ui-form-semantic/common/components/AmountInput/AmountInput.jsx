import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import bind from 'lodash-decorators/bind';

// import i18n from '../../utils/i18n';


import getComponents from '../../get-components';

const {
  Button,
  Input,
} = getComponents();

require('./AmountInput.scss');

/**
 * // todo @ANKU @LOW - перенести @toCore
 */
export default class AmountInput extends PureComponent {
  static propTypes = {
    value: PropTypes.number,

    min: PropTypes.number,
    max: PropTypes.number,
    textMinus: PropTypes.node,
    textPlus: PropTypes.node,
    textAfter: PropTypes.node,

    onChange: PropTypes.func,
  };

  static defaultProps = {
    textMinus: '-',
    textPlus: '+',
    textAfter: 'шт.',
    min: 0,
    max: Number.Infinity,
  };

  // ======================================================
  // HANDLERS
  // ======================================================
  @bind()
  handleChange(newValue) {
    const {
      onChange,
    } = this.props;

    onChange(newValue);
  }

  // ======================================================
  // MAIN RENDER
  // ======================================================
  render() {
    const {
      value,
      min,
      max,
      textMinus,
      textPlus,
      textAfter,
    } = this.props;

    return (
      <div className="AmountInput">
        <Button
          className="AmountInput__minus"
          disabled={ value - 1 < min }
          onClick={ () => this.handleChange(value - 1) }
        >
          { textMinus }
        </Button>
        <Input
          type="number"
          min={ min }
          max={ max }
          value={ value }
          onChange={ (event, controlProps) => this.handleChange(controlProps.value) }
        />
        <Button
          className="AmountInput__plus"
          disabled={ value + 1 > max }
          onClick={ () => this.handleChange(value + 1) }
        >
          { textPlus }
        </Button>
        <span
          className="AmountInput__after"
        >
          { textAfter }
        </span>
      </div>
    );
  }
}

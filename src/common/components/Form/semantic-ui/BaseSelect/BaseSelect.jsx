/* eslint-disable no-unused-vars */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import bind from 'lodash-decorators/bind';

import { Select } from 'semantic-ui-react';

// import i18n from '../../utils/i18n';

// import './BaseSelect.scss';

export default class BaseSelect extends PureComponent {
  static propTypes = {
    ...Select.propTypes,
    mode: PropTypes.string,
    // className,
    // options,
    // defaultValue,
    filterOption: PropTypes.bool,
    // placeholder,
    showSearch: PropTypes.bool,
    allowClear: PropTypes.bool,

    onSelect: PropTypes.func,
    onSearch: PropTypes.func,
  };

  static defaultProps = {
  };

  // ======================================================
  // HANDLERS
  // ======================================================
  @bind()
  handleSearch(event) {
    const {
      onSearch,
    } = this.props;

    if (onSearch) {
      onSearch(event.target.value);
    }
  }

  // ======================================================
  // MAIN RENDER
  // ======================================================
  render() {
    const {
      mode,
      className,
      options,
      defaultValue,
      filterOption,
      placeholder,
      showSearch,
      allowClear,

      onSelect,
      onSearch,

      ...otherProps
    } = this.props;

    return (
      <Select
        className={ className }

        options={ options.map((option) => ({
          ...option,
          text: option.label,
          label: undefined,
        })) }
        defaultValue={ defaultValue }

        placeholder={ placeholder }

        onChange={ onSelect }

        search={ true }
        onSearchChange={ this.handleSearch }

        { ...otherProps }
      />
    );
  }
}

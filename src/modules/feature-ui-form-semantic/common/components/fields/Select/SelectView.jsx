/* eslint-disable no-unused-vars */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import bind from 'lodash-decorators/bind';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import uniqBy from 'lodash/uniqBy';
import difference from 'lodash/difference';

import { Select } from 'semantic-ui-react';

import { wrapToArray } from '@reagentum/front-core/lib/common/utils/common';
import CHECKBOX_VIEW_PROP_TYPES_MAP from '@reagentum/front-core/lib/modules/feature-ui-form/common/subModule/components/fields/Select/Select.propTypes';

// import i18n from '../../utils/i18n';

// import './SelectView.scss';

export default class SelectView extends PureComponent {
  static propTypes = {
    ...Select.propTypes,
    ...CHECKBOX_VIEW_PROP_TYPES_MAP,
    // mode: PropTypes.string,
    // className,
    // options,
    // defaultValue,
    // filterOption: PropTypes.bool,
    // placeholder,
    // showSearch: PropTypes.bool,
    // allowClear: PropTypes.bool,

    // onSelect: PropTypes.func,
    // onRemoveSelected: PropTypes.func,
    // onSearch: PropTypes.func,
    // onLoadMore: PropTypes.func,
  };

  // static defaultProps = {
  // };

  // ======================================================
  // HANDLERS
  // ======================================================
  // semantic format
  @bind()
  handleChange(event, selectViewControl) {
    const {
      value: oldValues,
      multiple,

      onSelect,
      onRemoveSelected,
    } = this.props;
    const {
      value: newValues,
      // options,
      // props: selectViewControlProps,
    } = selectViewControl;

    if (multiple) {
      const newValuesFinal = newValues || [];

      return oldValues.length > newValuesFinal.length
        ? onRemoveSelected(difference(oldValues, newValues))
        : onSelect(newValuesFinal[newValuesFinal.length - 1]);
    }

    return onSelect(newValues);
  }

  @bind()
  handleSearch(event) {
    const {
      onSearch,
    } = this.props;

    const searchTerm = event.target.value;
    if (onSearch) {
      return onSearch(searchTerm);
    }
    // if (!searchTerm) {
    //   // очищаем значение
    // }
  }

  // ======================================================
  // RENDERS
  // ======================================================
  getControlProps() {
    return pick(
      this.props,
      ...Object.keys(CHECKBOX_VIEW_PROP_TYPES_MAP),
    );
    // return this.props;
  }
  @bind()
  parseMetaToOption(optionMeta) {
    const {
      recordId,
      label,
    } = optionMeta;

    return {
      text: label,
      value: recordId,
    };
  }

  // ======================================================
  // MAIN RENDER
  // ======================================================
  render() {
    const {
      multiple,
      useSearch,
      optionMetas,
      inputText,
      placeholder,
      loading,
      value,
      valueOptionMetas,
      searchTerm,
      useUnique,

      onBlur,

      searchMinCharacters,
    } = this.props;

    const optionMetasFinal = multiple
      ? uniqBy(
        [
          ...optionMetas,
          ...valueOptionMetas,
        ],
        (optionMeta) => optionMeta.recordId,
      )
      : optionMetas;

    /*
    allowClear={ true }
    mode={ multiple ? undefined : 'combobox' }
    text={ multiple ? undefined : text }
    showSearch={ useSearch }
    */
    return (
      <Select
        mode={ 'combobox' }

        search={ useSearch }
        selection={ true }
        fluid={ true }

        placeholder={ placeholder }
        loading={ loading }
        multiple={ multiple }
        minCharacters={ searchMinCharacters || undefined }

        { ...this.getControlProps() }

        value={ value }
        options={ optionMetasFinal.map(this.parseMetaToOption) }

        text={ inputText }

        onSelect={ undefined }
        onChange={ this.handleChange }
        onSearchChange={ this.handleSearch }
        onBlur={ onBlur }
      />
    );
  }
}

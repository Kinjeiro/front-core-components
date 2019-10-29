import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import bind from 'lodash-decorators/bind';
import { Checkbox } from 'semantic-ui-react';


// import i18n from '../../i18n';
import getComponents from '../../../get-components';
import SELECT_VIEW_PROP_TYPES_MAP from '@reagentum/front-core/lib/modules/feature-ui-form/common/subModule/components/fields/Checkbox/Checkbox.propTypes';

const {
  Button,
  Loading,
} = getComponents();

export default class CheckboxView extends PureComponent {
  static propTypes = {
    ...Checkbox.propTypes,
    ...SELECT_VIEW_PROP_TYPES_MAP,
  };

  // ======================================================
  // HANDLERS
  // ======================================================
  @bind()
  handleChange(event, checkboxItemControl) {
    const {
      // value: oldValues,
      // multiple,
      onChangeCheck,
    } = this.props;
    const {
      value: recordId,
      checked,
      // options,
      // props: selectViewControlProps,
    } = checkboxItemControl;

    return onChangeCheck(recordId, checked);
  }

  // ======================================================
  // RENDER
  // ======================================================
  @bind()
  renderOption(optionMeta) {
    const {
      readOnly,
    } = this.props;
    const {
      label,
      recordId,
      isDisabled,
      isSelected,
    } = optionMeta;

    return (
      <Checkbox
        key={ recordId }
        label={ label }

        checked={ isSelected }
        value={ recordId }

        readOnly={ readOnly }
        disabled={ isDisabled }

        onChange={ this.handleChange }
      />
    );
  }

  // ======================================================
  // MAIN RENDER
  // ======================================================
  render() {
    const {
      className,

      optionMetas,
      valueOptionMeta,
      multiple,

      isLoading,

      // todo @ANKU @LOW - onCheckAll, onUncheckAll
      onCheckAll,
      onUncheckAll,
    } = this.props;

    const visibilityOptionMetas = optionMetas && optionMetas.length > 0
      ? optionMetas
      : valueOptionMeta || [];

    return (
      <div className={ `CheckboxView ${className || ''}` }>
        {
          isLoading && (
            <Loading />
          )
        }

        {
          visibilityOptionMetas.map(this.renderOption)
        }
      </div>
    );
  }
}

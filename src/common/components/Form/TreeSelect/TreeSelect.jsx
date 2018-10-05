/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import bind from 'lodash-decorators/bind';
import RcTreeSelect from 'rc-tree-select';

import { objectValues } from '@reagentum/front-core/lib/common/utils/common';
import { findPath } from '@reagentum/front-core/lib/common/utils/tree-utils';

// import i18n from '../../utils/i18n';

import getComponents from '../../../get-components';

import { TREE_SELECT_TYPES } from './TreeSelect.const';

const {
  Button,
} = getComponents();

require('./TreeSelect.scss');

export default class TreeSelect extends PureComponent {
  static TYPES = TREE_SELECT_TYPES;
  static propTypes = {
    /**
     * тип контрола
      - PLAIN: 'plain' - обычный древовидный селект
      - DIVE: 'dive' - выбор с погружением
      - EXPAND: 'expand' - древовидное раскрытие
     */
    type: PropTypes.oneOf(objectValues(TREE_SELECT_TYPES)),
    readOnly: PropTypes.bool,
    // /**
    //  * array<{value,label,children, [disabled,selectable]}>
    //  */
    treeData: PropTypes.array,
    value: PropTypes.any,
    onSelect: PropTypes.func,
    onClose: PropTypes.func,
    onBack: PropTypes.func,
  };

  static defaultProps = {
    type: TREE_SELECT_TYPES.PLAIN,
  };

  state = {
    currentItemPath: this.findCurrentPath(),
  };

  // ======================================================
  // UTILS
  // ======================================================
  findCurrentPath(valueIn = null) {
    const {
      value,
      treeData,
    } = this.props;
    let valueFinal = valueIn || value;
    if (typeof valueFinal === 'object') {
      if (valueFinal.isRoot) {
        return [valueFinal];
      }
      valueFinal = valueFinal.value;
    }
    return valueFinal
      ? findPath(valueFinal, treeData)
      : [];
  }
  getCurrentItem() {
    const {
      currentItemPath,
    } = this.state;
    return currentItemPath[currentItemPath.length - 1];
  }
  getParentItem() {
    const {
      currentItemPath,
    } = this.state;
    return currentItemPath.length > 1
      ? currentItemPath[currentItemPath.length - 2]
      : null;
  }

  // ======================================================
  // LIFECYCLE
  // ======================================================
  // componentWllMount() {
  // }
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
  renderReadOnly() {
    return this.getCurrentItem().label;
  }
  renderDive() {
    const {
      onClose,
      onBack,
      onSelect,
    } = this.props;
    const {
      currentItemPath,
    } = this.state;

    const currentItem = this.getCurrentItem();
    const {
      label,
      children,
    } = currentItem;
    const parentItem = this.getParentItem();

    return (
      <div>
        <div>
          {
            parentItem
              ? (
                <Button onClick={ () => this.setState({ currentItemPath: currentItemPath.slice(0, currentItemPath.length - 1) }) }>
                  назад
                </Button>
              )
              : onBack && (
                <Button onClick={ onBack }>
                  н закрыть
                </Button>
              )
          }

          {
            label
          }

          {
            onClose && (
              <Button onClick={ onClose }>
                закрыть
              </Button>
            )
          }
        </div>
        <div>
          <Button onClick={ () => onSelect(currentItem) }>
            { `Выбрать ${label}` }
          </Button>
          {
            children.map((subItem) => (
              <Button
                key={ subItem.value }
                disabled={ subItem.disabled }
                onClick={ () => {
                  if (subItem.children && subItem.children.length > 0) {
                    this.setState({ currentItemPath: [...currentItemPath, subItem] });
                  } else {
                    onSelect(subItem);
                  }
                } }
              >
                { subItem.label }
              </Button>
            ))
          }
        </div>
      </div>
    );
  }
  renderExpand() {
    throw new Error('todo implement renderExpand');
  }
  renderPlain() {
    const {
      treeData,
      value,
      onSelect,
      ...otherProps
    } = this.props;

    /*
     treeNodeFilterProp="label"
     treeLine={ true }
     filterTreeNode={ false }
     onSearch={ (search) => this.setState({ search }) }
     onChange={ this.onChange }
     labelInValue={ true }
     */

    // todo @ANKU @LOW - кажется есть бага когда allowClear после сброса не открывается попап
    // todo @ANKU @LOW - не рабочий tabindex + keyboard keys - https://github.com/react-component/tree-select/issues/48
    // todo @ANKU @LOW - вынести dropdownStyle в css
    return (
      <RcTreeSelect
        treeData={ treeData }
        treeNodeLabelProp="label"
        value={ value }
        onSelect={ onSelect }

        allowClear={ true }
        placeholder="Плейсхолдер"

        showSearch={ true }
        treeNodeFilterProp="label"
        searchPlaceholder="Поиск"

        transitionName="rc-tree-select-dropdown-slide-up"
        choiceTransitionName="rc-tree-select-selection__choice-zoom"
        dropdownStyle={{
          maxHeight: 200,
          overflow: 'auto',
        }}

        { ...otherProps }
      />
    );
  }


  renderContent() {
    const {
      readOnly,
      type,
    } = this.props;

    if (readOnly) {
      return this.renderReadOnly();
    }

    switch (type) {
      case TREE_SELECT_TYPES.PLAIN: return this.renderPlain();
      case TREE_SELECT_TYPES.DIVE: return this.renderDive();
      case TREE_SELECT_TYPES.EXPAND: return this.renderExpand();
      default:
        throw new Error(`Wrong type ${type} for TreeSelect`);
    }
  }
  // ======================================================
  // MAIN RENDER
  // ======================================================
  render() {
    const {
      type,
    } = this.props;

    return (
      <div className={ `TreeSelect TreeSelect--type_${type}` }>
        { this.renderContent() }
      </div>
    );
  }
}

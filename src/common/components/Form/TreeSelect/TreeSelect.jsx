/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import bind from 'lodash-decorators/bind';
import RcTreeSelect from 'rc-tree-select';

import {
  objectValues,
  executeVariable,
} from '@reagentum/front-core/lib/common/utils/common';
import { findPath } from '@reagentum/front-core/lib/common/utils/tree-utils';

// import i18n from '../../utils/i18n';

import getComponents from '../../../get-components';

import { TREE_SELECT_TYPES } from './TreeSelect.const';

const {
  Button,
  SimpleButton,
  Icon,
} = getComponents();

require('./TreeSelect.scss');

export default class TreeSelect extends PureComponent {
  static TYPES = TREE_SELECT_TYPES;
  static propTypes = {
    /**
     * тип контрола
      - PLAIN: 'plain' - обычный древовидный селект
      - DIVE: 'dive' - выбор с погружением
      - EXPAND: 'expand' - древовидное раскрытие (аккордион)
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

    textBack: PropTypes.node,
    textBackParent: PropTypes.node,
    textClose: PropTypes.node,
    /**
     * (currentTreeItem, currentPath, treeSelectProps) => label
     */
    renderTitle: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.func,
    ]),
    /**
     * (currentTreeItem, treeSelectProps) => label
     */
    renderSelectAll: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.func,
    ]),
    /**
     * (treeItem, index, treeSelectProps) => label
     */
    renderItem: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.func,
    ]),
  };

  static defaultProps = {
    type: TREE_SELECT_TYPES.PLAIN,

    textBack: (
      <Icon name="arrow left" />
    ),
    textBackParent: (
      <Icon name="arrow left" />
    ),
    textClose: (
      <Icon name="close" />
    ),
    renderTitle: (currentTreeItem, currentPath, treeSelectProps) =>
      currentTreeItem.label,
    renderSelectAll: (currentTreeItem, treeSelectProps) =>
      // todo @ANKU @LOW - @@ локализация
      `Выбрать все "${currentTreeItem.label}"`,
    renderItem: (treeItem, index, treeSelectProps) =>
      treeItem.label,
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
    // null - тоже объект
    if (valueFinal && typeof valueFinal === 'object') {
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

      textBack,
      textBackParent,
      textClose,
      renderTitle,
      renderSelectAll,
      renderItem,
    } = this.props;
    const {
      currentItemPath,
    } = this.state;

    const currentItem = this.getCurrentItem();
    const {
      children,
    } = currentItem;
    const parentItem = this.getParentItem();

    return (
      <div className="TreeSelectDive">
        <div className="TreeSelectDive__header">
          {
            parentItem && textBackParent
              ? (
                <Button
                  className="TreeSelectDive__backParent"
                  simple={ true }
                  onClick={ () => this.setState({ currentItemPath: currentItemPath.slice(0, currentItemPath.length - 1) }) }
                >
                  { textBackParent }
                </Button>
              )
              : textBack && onBack && (
                <Button
                  className="TreeSelectDive__back"
                  simple={ true }
                  onClick={ onBack }
                >
                  { textBack }
                </Button>
              )
          }

          <span className="TreeSelectDive__title">
            {
              executeVariable(renderTitle, null, currentItem, currentItemPath, this.props)
            }
          </span>


          {
            textClose && onClose && (
              <Button
                className="TreeSelectDive__close"
                simple={ true }
                onClick={ onClose }
              >
                { textClose }
              </Button>
            )
          }
        </div>
        <div>
          {
            renderSelectAll && (
              <SimpleButton
                className="TreeSelectDive__select TreeSelectDiveSelect TreeSelectDive__selectAll"
                onClick={ () => onSelect(currentItem) }
              >
                {
                  executeVariable(renderSelectAll, null, currentItem, this.props)
                }
              </SimpleButton>
            )
          }
          {
            children.map((subItem, index) => {
              const hasChildren = subItem.children && subItem.children.length > 0;
              return (
                <SimpleButton
                  key={ subItem.value }
                  className={ `TreeSelectDive__select TreeSelectDiveSelect ${hasChildren ? '' : 'TreeSelectDiveSelect--leaf'}` }
                  disabled={ subItem.disabled }
                  onClick={ () => {
                    if (hasChildren) {
                      this.setState({ currentItemPath: [...currentItemPath, subItem] });
                    } else {
                      onSelect(subItem);
                    }
                  } }
                >
                  {
                    executeVariable(renderItem, null, subItem, index, this.props)
                  }
                </SimpleButton>
              );
            })
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

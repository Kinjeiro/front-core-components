import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
// import bind from 'lodash-decorators/bind';
import RcTreeSelect from 'rc-tree-select';

// import i18n from '../../utils/i18n';

import './TreeSelect.scss';

export default class TreeSelect extends PureComponent {
  static propTypes = {
    /**
     * array<{value,label,children, [disabled,selectable]}>
     */
    // treeData: PropTypes.array,
    // value: PropTypes.any,
    // onSelect: PropTypes.func,
    ...RcTreeSelect.propTypes,
  };

  static defaultProps = {
  };

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

  // ======================================================
  // MAIN RENDER
  // ======================================================
  render() {
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
        treeNodeLabelProp="title"
        value={ value }
        onSelect={ onSelect }

        allowClear={ true }
        placeholder="Плейсхолдер"

        showSearch={ true }
        treeNodeFilterProp="title"
        searchPlaceholder="Поиск"

        transitionName="rc-tree-select-dropdown-slide-up"
        choiceTransitionName="rc-tree-select-selection__choice-zoom"
        dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}

        { ...otherProps }
      />
    );
  }
}

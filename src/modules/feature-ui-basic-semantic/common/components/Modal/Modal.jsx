/* eslint-disable no-undef */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bind from 'lodash-decorators/bind';
import {
  Modal as SemanticModal,
} from 'semantic-ui-react';

import i18n from '../../i18n';
import getComponents from '../../get-components';

const { Button } = getComponents();

export default class Modal extends Component {
  static propTypes = {
    show: PropTypes.bool,
    className: PropTypes.string,

    header: PropTypes.node,
    content: PropTypes.node,
    children: PropTypes.node,

    textCancel: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.node,
    ]),
    textOk: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.node,
    ]),
    okButtonProps: PropTypes.object,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,

    actions: PropTypes.node,

    /**
      closeOnEscape={closeOnEscape}  (default: true)
      closeOnDimmerClick={closeOnDimmerClick} (default: true)
      closeOnDocumentClick={closeOnDimmerClick} (default: false)
     */
    modalProps: PropTypes.shape(SemanticModal.propTypes),

  };

  static defaultProps = {
    show: true,
    // isCancelOnEsc: true,
    textOk: i18n('components.Modal.textOk'),
    textCancel: i18n('components.Modal.textCancel'),
    modalProps: {},
  };

  // // ======================================================
  // // UTILS
  // // ======================================================
  // canCancel() {
  //   const {
  //     onCancel,
  //     textCancel,
  //   } = this.props;
  //
  //   return onCancel && textCancel;
  // }
  //
  // // ======================================================
  // // LIFECYCLE
  // // ======================================================
  // componentDidMount() {
  //   const {
  //     isCancelOnEsc,
  //   } = this.props;
  //   if (this.canCancel()) {
  //     document.addEventListener('mousedown', this.handleClickOutside);
  //     if (isCancelOnEsc) {
  //       document.addEventListener('keydown', this.handleKeyDown, false);
  //     }
  //   }
  // }
  //
  // componentWillUnmount() {
  //   const {
  //     isCancelOnEsc,
  //   } = this.props;
  //   if (this.canCancel()) {
  //     document.removeEventListener('mousedown', this.handleClickOutside);
  //     if (isCancelOnEsc) {
  //       document.removeEventListener('keydown', this.handleKeyDown, false);
  //     }
  //   }
  // }
  //
  // // ======================================================
  // // HANDLERS
  // // ======================================================
  // @bind()
  // handleClickOutside(event) {
  //   const {
  //     onCancel,
  //   } = this.props;
  //
  //   if (this.canCancel() && this.wrapperRef && !this.wrapperRef.contains(event.target)) {
  //     onCancel();
  //   }
  // }
  // @bind()
  // handleKeyDown(event) {
  //   const {
  //     onCancel,
  //     isCancelOnEsc,
  //   } = this.props;
  //
  //   if (isCancelOnEsc && event.keyCode === ESC_KEY_CODE && this.canCancel()) {
  //     onCancel();
  //   }
  // }

  // ======================================================
  // RENDERS
  // ======================================================
  renderHeader() {
    const {
      header,
    } = this.props;

    return header && (
      <SemanticModal.Header>
        {header}
      </SemanticModal.Header>
    );
  }

  renderContent() {
    const {
      content,
    } = this.props;

    return content && (
      <SemanticModal.Content>
        { content }
      </SemanticModal.Content>
    );
  }

  renderActions() {
    const {
      actions,
      textOk,
      textCancel,
      onCancel,
      onOk,
      okButtonProps,
    } = this.props;

    return (actions || textOk || textCancel) && (
      <SemanticModal.Actions>
        {
          actions || [
            textCancel && onCancel && (
              <Button
                key="buttonCancel"
                onClick={ onCancel }
              >
                {textCancel}
              </Button>
            ),
            textOk && onOk && (
              <Button
                key="buttonOk"
                primary={ true }
                onClick={ onOk }
                { ...okButtonProps }
              >
                {textOk}
              </Button>
            ),
          ]
        }
      </SemanticModal.Actions>
    );
  }

  // ======================================================
  // MAIN RENDER
  // ======================================================
  render() {
    const {
      show,
      className,
      onCancel,
      children,
      modalProps,
    } = this.props;

    return show && (
      <SemanticModal
        dimmer="inverted"
        open={ show }
        onClose={ onCancel }
        size="small"
        { ...modalProps }
        className={ `Modal ${className || ''}` }
      >
        { this.renderHeader() }
        { this.renderContent() }
        { children }
        { this.renderActions() }
      </SemanticModal>
    );
  }
}

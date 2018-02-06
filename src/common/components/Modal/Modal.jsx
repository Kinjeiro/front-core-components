import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Modal as SemanticModal,
  Button,
} from 'semantic-ui-react';

// import './Modal.css';

import i18n from '../../utils/i18n';

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

    modalProps: PropTypes.shape(SemanticModal.propTypes),
  };

  static defaultProps = {
    show: true,
    textOk: i18n('components.Modal.textOk'),
    textCancel: i18n('components.Modal.textCancel'),
    modalProps: {},
  };

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
        className={ `Modal ${className || ''}` }
        dimmer="inverted"
        open={ true }
        onClose={ onCancel }
        size="small"
        { ...modalProps }
      >
        { this.renderHeader() }
        { this.renderContent() }
        { this.renderActions() }
        { children }
      </SemanticModal>
    );
  }
}

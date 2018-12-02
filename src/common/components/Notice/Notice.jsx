import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bind from 'lodash-decorators/bind';
import {
  Message,
  Icon,
} from 'semantic-ui-react';

import FCNotice from '@igs/front-core/lib/common/components/Notifications/Notice';
import NoticeEmitter from '@igs/front-core/lib/common/helpers/notifications';

import './Notice.scss';

export default class Notice extends Component {
  static propTypes = FCNotice.propTypes;
  static defaultProps = FCNotice.defaultProps;

  // ======================================================
  // HANDLERS
  // ======================================================
  // onApplyWithClose = () => {
  //  if (this.props.onApply) {
  //    this.props.onApply();
  //  }
  //  this.closeNotice();
  // };
  //
  // onCancelWithClose = () => {
  //  if (this.props.onCancel) {
  //    this.props.onCancel();
  //  }
  //  this.closeNotice();
  // };
  @bind()
  handleNotificationCloseTimeout() {
    this.closeNotice();
  }

  @bind()
  handleNotificationCloserClick() {
    this.closeNotice();
  }

  // ======================================================
  // UTILS
  // ======================================================
  closeNotice() {
    // event.preventDefault();
    // event.stopPropagation();
    this.props.onClose(this.props.id);
  }

  // ======================================================
  // MAIN RENDER
  // ======================================================
  render() {
    const {
      title,
      messages,
      status,
      // icon,
      // autoCloseDelay,
    } = this.props;

    // ошибки не должны автоматически скрываться, только по нажатию на крестик
    // const onCloseTimeout = autoCloseDelay >= 0 || status !== STATUSES.ERROR
    //   ? this.handleNotificationCloseTimeout
    //   : null;

    // autoCloseDelay={ autoCloseDelay }
    // stickTo="right"
    // icon={ icon }
    // onCloseTimeout={ onCloseTimeout }



    return (
      <div className="Notice">
        <Message
          positive={ status === NoticeEmitter.STATUSES.SUCCESS }
          info={ status === NoticeEmitter.STATUSES.INFO }
          warning={ status === NoticeEmitter.STATUSES.WARNING }
          error={ status === NoticeEmitter.STATUSES.ERROR }

          header={ title || (messages.length === 1 && messages[0]) }
          list={ (title || messages.length > 1) ? messages : null }
        />
        <Icon
          className="Notice__closer"
          name="close"
          onClick={ this.handleNotificationCloserClick }
        />
      </div>
    );
  }
}

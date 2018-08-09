/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Icon,
  Image,
  Dropdown,
  // Button,
} from 'semantic-ui-react';

import { executeVariable } from '@reagentum/front-core/lib/common/utils/common';
import { PATH_INDEX } from '@reagentum/front-core/lib/common/routes.pathes';
import Link from '@reagentum/front-core/lib/common/containers/Link/Link';

import i18n from '../../utils/i18n';

import {
  MENU_PROP_TYPE,
  MENU_ITEM_TYPE,
} from '../../models/model-menu';

import './AppHeader.scss';

export default class AppHeader extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,

    firstPart: PropTypes.node,

    /**
     * если есть, то рисутеся sibebarIcon в начале
     */
    onToggleSidebar: PropTypes.func,

    /**
     * если стринг - урл лого
     * если нода - контрол
     */
    logo: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),

    customTitlePart: PropTypes.node,
    headerTitle: PropTypes.node,
    headerDescription: PropTypes.node,

    leftPart: PropTypes.node,

    customUserPart: PropTypes.node,
    userInfo: PropTypes.object,
    /**
     * see https://react.semantic-ui.com/modules/dropdown
     */
    userMenu: MENU_PROP_TYPE,

    rightPart: PropTypes.node,

    textMenuLogin: PropTypes.node,
    /**
     * (user) => {}
     */
    profileUrl: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
    profileTempImage: PropTypes.string,
    useModalLogin: PropTypes.bool,

    onGoTo: PropTypes.func,
    onLogin: PropTypes.func,
  };

  static defaultProps = {
    useModalLogin: true,
    textMenuLogin: i18n('pages.AppLayout.menu.login'),
  };

  // ======================================================
  // RENDERS
  // ======================================================
  renderFirstPart() {
    const {
      firstPart,
    } = this.props;
    return firstPart;
  }

  renderSidebarIconPart() {
    const {
      onToggleSidebar,
    } = this.props;
    return onToggleSidebar && (
      <span
        className="SidebarIconPart navicon"
        onClick={ onToggleSidebar }
      >
        <Icon name="content" />
      </span>
    );
  }

  renderLogoPart() {
    const {
      logo,
    } = this.props;

    return logo && (
      <div className="LogoPart">
        {
          typeof logo === 'string'
          ? (
            <Image
              className="LogoPart__image"
              src={ logo }
            />
          )
          : logo
        }
      </div>
    );
  }

  renderTitlePart() {
    const {
      headerTitle,
      headerDescription,
    } = this.props;
    return (
      <div className="TitlePart">
        <Link
          className="TitlePart__link"
          to={ PATH_INDEX }
        >
          <h2 className="TitlePart__title">
            { headerTitle }
          </h2>
        </Link>
        <span className="TitlePart__description">
          { headerDescription }
        </span>
      </div>
    );
  }

  renderLeftPart() {
    const {
      leftPart,
    } = this.props;
    return leftPart;
  }

  renderUserMenuItem(menuItem, index) {
    const {
      onGoTo,
    } = this.props;
    const {
      name,
      type,
      path,
      className,
      icon,
      avatar,
      content,
      onClick,
      ...otherDropdownItemProps
    } = menuItem;

    /**
     * @deprecated - name === 'delimiter'
     * */
    if (name === 'delimiter') {
      return (
        <Dropdown.Divider
          key={ `divider_${index}` }
          className={ className }
        />
      );
    }

    switch (type) {
      case MENU_ITEM_TYPE.DELIMITER:
        return (
          <Dropdown.Divider
            key={ `divider_${index}` }
            className={ className }
          />
        );
      case MENU_ITEM_TYPE.HEADER:
        return (
          <Dropdown.Header
            key={ `header_${name}` }
            icon={ icon }
            className={ className }
            content={ content || name }
          />
        );
      default:
        return (
          <Dropdown.Item
            key={ name }
            icon={ icon }
            image={ avatar ? { avatar: true, src: avatar } : undefined }
            text={ name }
            className={ className }
            content={ content }
            onClick={ onClick || (path ? (() => onGoTo(path)) : undefined) }
            { ...otherDropdownItemProps }
          />
        );
    }
  }

  renderUserPart() {
    const {
      userInfo,
      userMenu,
      textMenuLogin,
      onLogin,
      profileUrl,
      useModalLogin,
      profileTempImage,
    } = this.props;

    let userCmp;
    if (!userInfo) {
      if (onLogin && textMenuLogin) {
        userCmp = (
          <div className="UserPart__name UserName--notAuth">
            <Link
              onClick={ onLogin }
              checkAuth={ useModalLogin }
            >
              { textMenuLogin }
            </Link>
          </div>
        );
      }
    } else {
      const {
        displayName,
        username,
        profileImageURI,
      } = userInfo;

      const displayNameFinal = displayName || username;

      userCmp = (
        <React.Fragment>
          {
            (profileImageURI || typeof profileTempImage === 'string')
            ? (
              <Image
                className="UserName__avatar"
                src={ profileImageURI || profileTempImage }
                avatar={ true }
              />
            )
            : profileTempImage || (
              <Icon
                className="UserName__icon user-icon"
                name="user outline"
              />
            )
          }
          {
            displayNameFinal && (
              <span className="UserName__displayName">
                { displayNameFinal }
              </span>
            )
          }
        </React.Fragment>
      );
      if (profileUrl) {
        userCmp = (
          <Link to={ executeVariable(profileUrl, null, userInfo) }>
            { userCmp }
          </Link>
        );
      }
      userCmp = (
        <div className="UserPart__name UserName">
          { userCmp }
        </div>
      );

      if (userMenu.length > 0) {
        userCmp = (
          <Dropdown
            className="UserPart__menu"
            trigger={ userCmp }
            simple={ true }
            direction="right"
            pointing="top right"
          >
            <Dropdown.Menu direction="right">
              {
                userMenu.map((menuItem, index) =>
                  this.renderUserMenuItem(menuItem, index))
              }
            </Dropdown.Menu>
          </Dropdown>
        );
      }
    }

    return userCmp && (
      <div className="UserPart">
        { userCmp }
      </div>
    );
  }

  renderRightPart() {
    const {
      rightPart,
    } = this.props;
    return rightPart;
  }

  // ======================================================
  // MAIN RENDER
  // ======================================================
  render() {
    const {
      className,
      children,
      customTitlePart,
      customUserPart,
    } = this.props;
    return (
      <div className={ `AppHeader ${className || ''}` }>
        <div className="AppHeader__firstPart">{ this.renderFirstPart() }</div>
        <div className="AppHeader__sidebarIconPart">{ this.renderSidebarIconPart() }</div>
        <div className="AppHeader__logoPart">{ this.renderLogoPart() }</div>
        <div className="AppHeader__titlePart">{ customTitlePart || this.renderTitlePart() }</div>
        <div className="AppHeader__leftPart">{ this.renderLeftPart() }</div>
        <div className="AppHeader__userPart">{ customUserPart || this.renderUserPart() }</div>
        <div className="AppHeader__rightPart">{ this.renderRightPart() }</div>
        { children }
      </div>
    );
  }
}

/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Icon,
  Image,
  Dropdown,
  // Button,
} from 'semantic-ui-react';

import { PATH_INDEX } from '@reagentum/front-core/lib/common/routes.pathes';
import {
  // MediaQuery,
  Link,
} from '@reagentum/front-core/lib/common/components';

import i18n from '../../utils/i18n';

import {
  MENU_PROP_TYPE,
  MENU_ITEM_TYPE,
} from '../../models/model-menu';

import './Header.scss';

export default class Header extends PureComponent {
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

    onGoTo: PropTypes.func,
    onLogin: PropTypes.func,
  };

  static defaultProps = {
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
        <Link to={ PATH_INDEX }>
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
    } = this.props;

    let userCmp;
    if (!userInfo) {
      if (onLogin && textMenuLogin) {
        userCmp = (
          <div className="UserPart__name UserName--notAuth">
            <Link
              onClick={ onLogin }
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
        <div className="UserPart__name UserName">
          {
            profileImageURI
              ? (
                <Image
                  className="UserName__avatar"
                  src={ profileImageURI }
                  avatar={ true }
                />
              )
              : (
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
        </div>
      );

      if (userMenu.length > 0) {
        userCmp = (
          <Dropdown
            className="UserPart__menu"
            trigger={ userCmp }
            simple={ true }
          >
            <Dropdown.Menu>
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
      <div className={ `Header ${className || ''}` }>
        <div className="Header__firstPart">{ this.renderFirstPart() }</div>
        <div className="Header__sidebarIconPart">{ this.renderSidebarIconPart() }</div>
        <div className="Header__logoPart">{ this.renderLogoPart() }</div>
        <div className="Header__titlePart">{ customTitlePart || this.renderTitlePart() }</div>
        <div className="Header__leftPart">{ this.renderLeftPart() }</div>
        <div className="Header__userPart">{ customUserPart || this.renderUserPart() }</div>
        <div className="Header__rightPart">{ this.renderRightPart() }</div>
        { children }
      </div>
    );
  }
}

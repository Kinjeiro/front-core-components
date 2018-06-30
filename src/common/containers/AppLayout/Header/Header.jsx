/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {
  Icon,
  Grid,
  Dropdown,
} from 'semantic-ui-react';

import { objectValues } from '@reagentum/front-core/lib/common/utils/common';
import { PATH_INDEX } from '@reagentum/front-core/lib/common/routes.pathes';
import { getUserInfo } from '@reagentum/front-core/lib/common/app-redux/selectors';
import {
  MediaQuery,
  Link,
} from '@reagentum/front-core/lib/common/components';

// ======================================================
// UTILS
// ======================================================

// ======================================================
// REDUX
// ======================================================

// ======================================================
// COMPONENTS
// ======================================================

import './Header.scss';


export const MENU_ITEM_TYPE = {
  NORMAL: 'normal',
  DELIMITER: 'delimiter',
  HEADER: 'header',
};

export const MENU_PROP_TYPES = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.arrayOf(PropTypes.shape({
    // остальные проперти - https://react.semantic-ui.com/modules/dropdown#content-label
    // или тут примеры - https://github.com/Semantic-Org/Semantic-UI-React/blob/master/docs/src/examples/modules/Dropdown/common.js
    // as
    // value
    // description
    // label={{ color: 'red', empty: true, circular: true }}
    // image: { avatar: true, src: '/images/avatar/small/elliot.jpg' },

    /**
      MENU_ITEM_TYPE = {
        NORMAL: 'normal',
        DELIMITER: 'delimiter',
        HEADER: 'header',
      }
     */
    type: PropTypes.oneOf(objectValues(MENU_ITEM_TYPE)),
    name: PropTypes.node,
    icon: PropTypes.string,
    /**
     * url аватарки
     * либо будет использована icon
     */
    image: PropTypes.string,
    path: PropTypes.any,
    /**
     * либо name будет рисоваться
     */
    content: PropTypes.node,
    /**
     * true - показывать только для мобильных
     * false - показывать только для не мобильных
     * undefined \ null - показывать везде
     */
    mobile: PropTypes.bool,
    /**
     * либо path будет использован для перехода
     */
    onClick: PropTypes.func,
  })),
]);

@connect(
  (globalState) => ({
    userInfo: getUserInfo(globalState),
  }),
  {
    goTo: push,
  },
)
export default class Header extends Component {
  static propTypes = {
    onToggleSidebar: PropTypes.func,
    /**
     * see https://react.semantic-ui.com/modules/dropdown
     */
    userMenu: MENU_PROP_TYPES,
    textHeaderTitle: PropTypes.string,
    textHeaderDescription: PropTypes.string,
    leftPart: PropTypes.node,
    rightPart: PropTypes.node,

    // ======================================================
    // CONNECT
    // ======================================================
    userInfo: PropTypes.object,
    goTo: PropTypes.func,
  };

  // ======================================================
  // HANDLERS
  // ======================================================

  // ======================================================
  // RENDERS
  // ======================================================
  renderLeftPart() {
    const {
      onToggleSidebar,
      textHeaderTitle,
      textHeaderDescription,
    } = this.props;

    return (
      <div className="header-inner Header__leftPart">
        {
          onToggleSidebar && (
            <span
              className="navicon Header__menu"
              onClick={ onToggleSidebar }
            >
              <Icon name="content" />
            </span>
          )
        }
        <div className="Header__titleWrapper">
          <Link to={ PATH_INDEX }>
            <h2 className="Header__title">{ textHeaderTitle }</h2>
          </Link>
          <MediaQuery mobile={ false }>
            <span className="Header__description">{ textHeaderDescription }</span>
          </MediaQuery>
        </div>
      </div>
    );
  }

  renderUserMenuItem(menuItem, index) {
    const {
      goTo,
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
            onClick={ onClick || path ? (() => goTo(path)) : undefined }
            { ...otherDropdownItemProps }
          />
        );
    }
  }

  renderRightPart() {
    const {
      userInfo: {
        displayName,
      },
      userMenu,
      rightPart,
    } = this.props;

    // todo @ANKU @LOW - убрать bind на goTo
    return (
      <Grid
        columns="2"
        divided={ true }
        stretched={ true }
        className="balance-grid"
        verticalAlign="middle"
      >
        <Grid.Row>
          <MediaQuery mobile={ false }>
            <Grid.Column>
              { displayName }
            </Grid.Column>
          </MediaQuery>
          <Grid.Column>
            {
              userMenu.length > 0 && (
                <Dropdown
                  className="UserMenu"
                  trigger={
                    <Icon
                      className="user-icon"
                      name="user outline"
                    />
                  }
                  simple={ true }
                >
                  <Dropdown.Menu>
                    {
                      userMenu.map((menuItem, index) => this.renderUserMenuItem(menuItem, index))
                    }
                  </Dropdown.Menu>
                </Dropdown>
              )
            }
            {
              rightPart && (
                <div className="Header__rightPart">
                  { rightPart }
                </div>
              )
            }
          </Grid.Column>

          {/* <Grid.Column>*/}
          {/* <NotificationCenter />*/}
          {/* </Grid.Column>*/}
        </Grid.Row>
      </Grid>
    );
  }

  // ======================================================
  // MAIN RENDER
  // ======================================================
  render() {
    const {
      leftPart,
    } = this.props;
    return (
      <header className="Header">
        <Grid columns="equal">
          <Grid.Row>
            <Grid.Column floated="left">
              { this.renderLeftPart() }
              {
                leftPart && (
                  <div className="Header__leftPart">
                    { leftPart }
                  </div>
                )
              }
            </Grid.Column>

            <Grid.Column
              floated="right"
              className="balance"
            >
              { this.renderRightPart() }
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </header>
    );
  }
}

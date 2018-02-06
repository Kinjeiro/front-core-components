import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Menu,
  Sidebar,
  Icon,
} from 'semantic-ui-react';

import { Link } from '@reagentum/front-core/lib/common/components';

import i18n from '../../utils/i18n';

import './Sidebar.scss';

export default class SidebarComponent extends Component {
  static propTypes = {
    logo: PropTypes.node,
    open: PropTypes.bool,
    menu: PropTypes.arrayOf(PropTypes.shape({
      external: PropTypes.bool,
      path: PropTypes.string,
      icon: PropTypes.node,
      name: PropTypes.string,
    })),
    isMobile: PropTypes.bool,
    isError: PropTypes.bool,

    onLogout: PropTypes.func,
  };

  render() {
    const {
      open,
      // isError,
      onLogout,
      menu,
      isMobile,
      logo,
    } = this.props;

    const sidebarProps = {
      visible: open || !isMobile,
      as: Menu,
      vertical: true,
      animation: 'push',
      width: 'thin',
    };

    const menuItems = menu.map((route, i) => {
      const {
        external,
        path,
        icon,
        name,
      } = route;

      let propsMenuItem = {
        // todo @ANKU @CRIT @MAIN - перейти на новый роутинг
        // as: external ? 'a' : NavLink,
        as: external ? 'a' : Link,
        link: true,
        [external ? 'href' : 'to']: path,
      };

      if (!external) {
        propsMenuItem = {
          ...propsMenuItem,
          strict: false,
          exact: false,
          activeClassName: 'active',
        };
      }

      return (
        <Menu.Item
          key={ i }
          { ...propsMenuItem }
        >
          {name}
          <Icon name={ icon } />
        </Menu.Item>
      );
    });
    // XXX: @Metnew 12.06.2017:
    // it's recommended to create separate Logo component for app
    // But I caught 130# error in production build multiple times (invalid component type)
    // When I've used Logo component (see repo history)
    // I still don't know what was the problem behind it.
    return (
      <Sidebar
        { ...sidebarProps }
        id="sidebar"
      >
        {
          logo && (
            <div className="Sidebar__logo">
              { logo }
            </div>
          )
        }
        {menuItems}

        {
          onLogout && (
            <Menu.Item
              className="logout"
              onClick={ onLogout }
            >
              <Icon name="sign out" />
              { i18n('components.Sidebar.logout') }
            </Menu.Item>
          )
        }
      </Sidebar>
    );
  }
}

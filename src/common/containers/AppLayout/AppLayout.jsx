import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bind from 'lodash-decorators/bind';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {
  Dimmer,
  Sidebar,
  Container,
  Icon,
  Segment,
  Menu,
} from 'semantic-ui-react';

// Styles
import 'semantic-ui-css/semantic.css';

import 'react-redux-toastr/src/styles/index.scss';

import { executeVariable } from '@reagentum/front-core/lib/common/utils/common';
import appUrl from '@reagentum/front-core/lib/common/helpers/app-urls';
import {
  PATH_INDEX,
  PATH_LOGIN_PAGE,
} from '@reagentum/front-core/lib/common/routes.pathes';
import titled from '@reagentum/front-core/lib/common/utils/decorators/react-class/titled';
import {
  getCurrentPath,
  getUser,
} from '@reagentum/front-core/lib/common/app-redux/selectors';
import { actions as actionsUser } from '@reagentum/front-core/lib/common/app-redux/reducers/app/user-info';

import { MediaQuery } from '@reagentum/front-core/lib/common/components';

// ======================================================
// UTILS
// ======================================================
import i18n from '../../utils/i18n';

// ======================================================
// REDUX
// ======================================================


// ======================================================
// COMPONENTS
// ======================================================
import './semantic-ui-updates.scss';

import UpBottomButtons from '../../components/UpBottomButtons/UpBottomButtons';

import { MENU_PROP_TYPE } from '../../models/model-menu';
import Header from '../../components/Header/Header';

import ContextHeaderProvider from '../../contexts/ContextHeader/ContextHeaderProvider';

import './AppLayout.scss';

// const actionsUser = reduxUser.getBindActions(apiUser);



@titled('AppLayout', ({ textTitle }) => textTitle || i18n('pages.AppLayout.title'))
@connect(
  (globalState) => ({
    currentPath: getCurrentPath(globalState),
    user: getUser(globalState),
  }),
  {
    goTo: push,
    actionUserLogout: actionsUser.actionUserLogout,
  },
)
export default class AppLayout extends Component {
  static propTypes = {
    user: PropTypes.object,
    children: PropTypes.node.isRequired,
    onLogout: PropTypes.func,

    /**
     * @deprecated - user userMenu instead
    */
    menu: MENU_PROP_TYPE,
    userMenu: MENU_PROP_TYPE,
    sidebarMenu: MENU_PROP_TYPE,
    ifMobileMoveUserMenuToSidebar: PropTypes.bool,
    textMenuLogout: PropTypes.string,

    HeaderClass: PropTypes.oneOfType([
      PropTypes.instanceOf(Component),
      PropTypes.func,
    ]),
    headerProps: PropTypes.shape(Header.propTypes),

    // todo @ANKU @LOW - сделать redux чтобы влиять на верхнеуровней лайаут (текст в header тоже) из нижних контейнеров
    upBottomButtonsProps: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool,
    ]),

    // ======================================================
    // CONNECT
    // ======================================================
    currentPath: PropTypes.string,
    goTo: PropTypes.func,
    actionUserLogout: PropTypes.func,
    // из @titled
    actionCurrentPageChanged: PropTypes.func,
  };

  static defaultProps = {
    ifMobileMoveUserMenuToSidebar: true,
    HeaderClass: Header,
    headerProps: {},
    textMenuLogout: i18n('pages.AppLayout.menu.logout'),
  };

  state = {
    sidebarOpened: false,
  };

  // ======================================================
  // LIFE CYCLE
  // ======================================================
  // componentWillMount() {
  // }
  //
  // componentDidMount() {
  // }

  // ======================================================
  // UTILS
  // ======================================================
  getUserMenu(isMobile = null) {
    const {
      user,
      menu,
      userMenu,
      ifMobileMoveUserMenuToSidebar,
      textMenuLogout,
    } = this.props;

    if (isMobile && ifMobileMoveUserMenuToSidebar) {
      return [];
    }

    const menuFinal = executeVariable(userMenu || menu, [], user)
      .filter(({ mobile = null }) => mobile === null || mobile === isMobile);

    if (user) {
      menuFinal.push({
        name: textMenuLogout,
        className: 'MenuItem MenuItem--logout',
        icon: 'sign out',
        onClick: this.handleLogout,
      });
    }

    return menuFinal;
  }

  getSidebarMenu(isMobile = null) {
    const {
      user,
      sidebarMenu,
      ifMobileMoveUserMenuToSidebar,
    } = this.props;

    const menu = [];
    if (isMobile && ifMobileMoveUserMenuToSidebar) {
      menu.push(...this.getUserMenu(false)
        .map((menuItem) => ({
          ...menuItem,
          className: `MenuItem--userMenu ${menuItem.className || ''}`,
        })));
    }
    menu.push(...executeVariable(sidebarMenu, [], user)
      .filter(({ mobile = null }) => mobile === null || mobile === isMobile));

    return menu;
  }

  // ======================================================
  // HANDLERS
  // ======================================================
  @bind()
  handleToggleSidebar() {
    this.setState({
      sidebarOpened: !this.state.sidebarOpened,
    });
  }
  @bind()
  handleCloseSidebar() {
    this.setState({
      sidebarOpened: false,
    });
  }

  @bind()
  handleLogout() {
    const {
      goTo,
      actionUserLogout,
    } = this.props;

    actionUserLogout()
      .then(() => window.location = appUrl(PATH_INDEX));
  }

  // ======================================================
  // RENDER
  // ======================================================
  renderChildren() {
    return this.props.children;
  }

  renderHeader() {
    const {
      user,
      goTo,
      HeaderClass,
      headerProps,
    } = this.props;

    return (
      <MediaQuery mobile={ true }>
        {
          (matches) => {
            const isMobile = matches;
            const showSidebarMenu = this.getSidebarMenu(isMobile).length > 0;

            return (
              <ContextHeaderProvider.Consumer>
                {
                  (contextProps) => (
                    <HeaderClass
                      userInfo={ user }
                      userMenu={ this.getUserMenu(isMobile) }
                      onToggleSidebar={ showSidebarMenu ? this.handleToggleSidebar : undefined }
                      onGoTo={ goTo }
                      onLogin={ () => goTo(PATH_LOGIN_PAGE) }

                      { ...headerProps }

                      className={ `AppLayout__header ${headerProps.className || ''}` }

                      { ...contextProps }
                    />
                  )
                }
              </ContextHeaderProvider.Consumer>
            );
          }
        }
      </MediaQuery>
    );
  }
  renderContent() {
    const {
      upBottomButtonsProps,
    } = this.props;
    const {
      sidebarOpened,
    } = this.state;

    // todo @ANKU @LOW - убрать fartuna fartuna-main и сделать нормально на grid
    return (
      <div className="AppLayout__content">
        <div className="fartuna">
          <div className="fartuna-main">
            {
              (upBottomButtonsProps !== false && upBottomButtonsProps !== null) && (
                <UpBottomButtons
                  { ...(upBottomButtonsProps || {}) }
                />
              )
            }

            <div className="main-show-flex">
              {
                /* Semantic ui currently(16.04.16) doesn't have closeDimmerOnClick or smth else
                 So, instead of it, we can use simple <Dimmer> component */
                sidebarOpened && (
                  <Dimmer
                    active={ true }
                    onClick={ this.handleCloseSidebar }
                  />
                )
              }
              <div className="main-content">
                <Container className="main-show">
                  { this.renderChildren() }
                </Container>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderSidebarMenuItem(menuItem) {
    const {
      goTo,
      currentPath,
    } = this.props;

    const {
      name,
      path,
      icon,
      content,
      onClick,
    } = menuItem;

    return (
      <Menu.Item
        key={ name }
        name={ name }
        path={ path }
        onClick={ onClick || (path ? () => goTo(path) : undefined) }
        link={ !!path }
        active={ currentPath.indexOf(path) >= 0 }
      >
        { icon && (
          <Icon name={ icon } />
        ) }
        { content || name }
      </Menu.Item>
    );
  }

  renderMobileSidebarMenu(menu) {
    const {
      sidebarOpened,
    } = this.state;

    // todo @ANKU @LOW - убрать бинд внутри рендера goTo
    return (
      <Sidebar
        as={ Menu }
        animation="overlay"
        width="thin"
        visible={ sidebarOpened }
        icon="labeled"
        vertical={ true }
        inverted={ true }
      >
        {
          menu.map((menuItem) => this.renderSidebarMenuItem(menuItem))
        }
      </Sidebar>
    );
  }

  // ======================================================
  // MAIN RENDER
  // ======================================================
  render() {
    const {
      headerProps,
    } = this.props;

    return (
      <ContextHeaderProvider headerProps={ headerProps }>
        <div className="AppLayout">
          <MediaQuery mobile={ true }>
            {
              (matches) => {
                const isMobile = matches;
                const menu = this.getSidebarMenu(isMobile);

                // todo @ANKU @LOW - можно наверное меню сделать в виде портала чтобы работы с меню вынести в header
                return (
                  <Sidebar.Pushable
                    as={ Segment }
                    className={ isMobile ? '' : 'AppLayout__notMobile' }
                  >
                    { menu.length > 0 && this.renderMobileSidebarMenu(menu) }

                    <Sidebar.Pusher>
                      <div className="AppLayout__inner">
                        { this.renderHeader() }
                        { this.renderContent() }
                      </div>
                    </Sidebar.Pusher>
                  </Sidebar.Pushable>
                );
              }
            }
          </MediaQuery>
        </div>
      </ContextHeaderProvider>
    );
  }
}

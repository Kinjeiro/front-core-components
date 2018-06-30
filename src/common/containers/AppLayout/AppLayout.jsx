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
import { PATH_INDEX } from '@reagentum/front-core/lib/common/routes.pathes';
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

import Header, { MENU_PROP_TYPES } from './Header/Header';

import './AppLayout.scss';

const HeaderContext = React.createContext({
  title: null,
  headerTitle: null,
  headerDescription: null,
  headerLeftPart: null,
  headerRightPart: null,

  setTitle: null,
  setHeaderTitle: null,
  setHeaderDescription: null,
  setHeaderLeftPart: null,
  setHeaderRightPart: null,
});

export const HeaderContextConsumer = HeaderContext.Consumer;

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
    menu: MENU_PROP_TYPES,
    userMenu: MENU_PROP_TYPES,
    sidebarMenu: MENU_PROP_TYPES,
    ifMobileMoveUserMenuToSidebar: PropTypes.bool,

    textTitle: PropTypes.node,
    textHeaderTitle: PropTypes.node,
    textHeaderDescription: PropTypes.node,
    headerLeftPart: PropTypes.node,
    headerRightPart: PropTypes.node,

    textMenuLogout: PropTypes.string,
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
    textTitle: i18n('pages.AppLayout.title'),
    textHeaderTitle: i18n('pages.AppLayout.Header.title'),
    textHeaderDescription: i18n('pages.AppLayout.Header.description'),
    textMenuLogout: i18n('pages.AppLayout.menu.logout'),
  };

  state = {
    sidebarOpened: false,

    headerTitle: this.props.textHeaderTitle,
    headerDescription: this.props.textHeaderDescription,
    headerLeftPart: this.props.headerLeftPart,
    headerRightPart: this.props.headerRightPart,
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
      userMenu,
      menu,
      textMenuLogout,
      ifMobileMoveUserMenuToSidebar,
    } = this.props;

    if (isMobile && ifMobileMoveUserMenuToSidebar) {
      return [];
    }

    const menuFinal = executeVariable(userMenu || menu, [], user)
      .filter(({ mobile = null }) => mobile === null || mobile === isMobile);

    if (user) {
      menuFinal.push({
        name: textMenuLogout,
        className: 'menuItemLogout',
        icon: 'sign out',
        onClick: this.handleLogout,
      });
    }

    return menuFinal;
  }

  getSidebarMenu(isMobile = null) {
    const {
      sidebarMenu,
      user,
      ifMobileMoveUserMenuToSidebar,
    } = this.props;

    const menu = [];
    if (isMobile && ifMobileMoveUserMenuToSidebar) {
      menu.push(...this.getUserMenu(false)
        .map((menuItem) => ({
          ...menuItem,
          className: `userMenuItem ${menuItem || ''}`,
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
  setTitle(value) {
    this.props.actionCurrentPageChanged({
      title: value,
    });
  }
  @bind()
  setHeaderTitle(value) { return this.setState({ headerTitle: value }); }
  @bind()
  setHeaderDescription(value) { return this.setState({ headerDescription: value }); }
  @bind()
  setHeaderLeftPart(value) { return this.setState({ headerLeftPart: value }); }
  @bind()
  setHeaderRightPart(value) { return this.setState({ headerRightPart: value }); }

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
      .then(() => window.location = PATH_INDEX);
  }

  // ======================================================
  // RENDER
  // ======================================================
  renderChildren() {
    return this.props.children;
  }

  renderContent() {
    const {
      // textHeaderTitle,
      // textHeaderDescription,
      upBottomButtonsProps,
      user,
    } = this.props;
    const {
      sidebarOpened,
      headerTitle,
      headerDescription,
      headerLeftPart,
      headerRightPart,
    } = this.state;

    // todo @ANKU @LOW - убрать fartuna fartuna-main и сделать нормально на grid
    return (
      <div className="AppLayout__content">
        <MediaQuery mobile={ true }>
          {
            (matches) => {
              const isMobile = matches;
              const showSidebarMenu = this.getSidebarMenu(isMobile).length > 0;

              return (
                <Header
                  userMenu={ this.getUserMenu(isMobile) }
                  textHeaderTitle={ headerTitle }
                  textHeaderDescription={ headerDescription }
                  leftPart={ headerLeftPart }
                  rightPart={ headerRightPart }

                  onToggleSidebar={ showSidebarMenu ? this.handleToggleSidebar : undefined }
                />
              );
            }
          }
        </MediaQuery>


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
      textTitle: title,
    } = this.props;
    const {
      headerTitle,
      headerDescription,
      headerLeftPart,
      headerRightPart,
    } = this.state;

    return (
      <HeaderContext.Provider
        value={{
          title,
          headerTitle,
          headerDescription,
          headerLeftPart,
          headerRightPart,

          setTitle: this.setTitle,
          setHeaderTitle: this.setHeaderTitle,
          setHeaderDescription: this.setHeaderDescription,
          setHeaderLeftPart: this.setHeaderLeftPart,
          setHeaderRightPart: this.setHeaderRightPart,
        }}
      >
        <div className="AppLayout">
          <div className="page-layout ready">
            <MediaQuery mobile={ true }>
              {
                (matches) => {
                  const isMobile = matches;
                  const menu = this.getSidebarMenu(isMobile);

                  return (
                    <Sidebar.Pushable
                      as={ Segment }
                      className={ isMobile ? '' : 'AppLayout__notMobile' }
                    >
                      { menu.length > 0 && this.renderMobileSidebarMenu(menu) }

                      <Sidebar.Pusher>

                        { this.renderContent() }

                      </Sidebar.Pusher>
                    </Sidebar.Pushable>
                  );
                }
              }
            </MediaQuery>
          </div>
        </div>
      </HeaderContext.Provider>
    );
  }
}

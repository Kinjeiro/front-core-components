import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bind from 'lodash-decorators/bind';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

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
  getModulesRoutePrefixes,
} from '@reagentum/front-core/lib/common/app-redux/selectors';
import { actions as actionsUser } from '@reagentum/front-core/lib/common/app-redux/reducers/app/user-info';

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

import getCb from '../../get-components';

import {
  MENU_PROP_TYPE,
  MENU_ITEM_TYPE,
} from '../../models/model-menu';

import ContextHeaderProvider from '../../contexts/ContextHeader/ContextHeaderProvider';

import './AppLayout.scss';

// const actionsUser = reduxUser.getBindActions(apiUser);

const {
  MediaQuery,
  Dimmer,
  Menu,
  Icon,
  Sidebar,
  UpBottomButtons,
  AppHeader,
} = getCb();

@titled('AppLayout', ({ textTitle }) => textTitle || i18n('pages.AppLayout.title'))
@connect(
  (globalState) => ({
    currentPath: getCurrentPath(globalState),
    user: getUser(globalState),
    moduleToRoutePrefixMap: getModulesRoutePrefixes(globalState),
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
    className: PropTypes.string,

    /**
     * @deprecated - user userMenu instead
    */
    menu: MENU_PROP_TYPE,
    /**
     * если функция (user, moduleToRoutePrefixMap) => []
     */
    userMenu: MENU_PROP_TYPE,
    /**
     * если функция (user, moduleToRoutePrefixMap) => []
     */
    sidebarMenu: MENU_PROP_TYPE,
    ifMobileMoveUserMenuToSidebar: PropTypes.bool,
    textMenuLogout: PropTypes.string,

    headerProps: PropTypes.shape(AppHeader.propTypes),
    headerFixed: PropTypes.bool,
    sidebarProps: PropTypes.shape(Sidebar.propTypes),

    // todo @ANKU @LOW - сделать redux чтобы влиять на верхнеуровней лайаут (текст в header тоже) из нижних контейнеров
    upBottomButtonsProps: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool,
    ]),

    footer: PropTypes.node,

    // ======================================================
    // CONNECT
    // ======================================================
    currentPath: PropTypes.string,
    moduleToRoutePrefixMap: PropTypes.object,
    goTo: PropTypes.func,
    actionUserLogout: PropTypes.func,
    // из @titled
    actionCurrentPageChanged: PropTypes.func,
  };

  static defaultProps = {
    ifMobileMoveUserMenuToSidebar: true,
    headerProps: {},
    headerFixed: true,
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
      moduleToRoutePrefixMap,
    } = this.props;

    if (isMobile && ifMobileMoveUserMenuToSidebar) {
      return [];
    }

    const menuFinal = executeVariable(userMenu || menu, [], user, moduleToRoutePrefixMap)
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
      moduleToRoutePrefixMap,
    } = this.props;

    const menu = [];
    if (isMobile && ifMobileMoveUserMenuToSidebar) {
      menu.push(...this.getUserMenu(false)
        .map((menuItem) => ({
          ...menuItem,
          className: `MenuItem--userMenu ${menuItem.className || ''}`,
        })));
    }
    menu.push(...executeVariable(sidebarMenu, [], user, moduleToRoutePrefixMap)
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

    return actionUserLogout();
      // .then(() => {
      //   window.location = appUrl(PATH_INDEX);
      // });
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
      headerProps,
      moduleToRoutePrefixMap,
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
                    <AppHeader
                      className={ `AppLayout__header AppLayout__maxWidthItem ${headerProps.className || ''}` }
                      userInfo={ user }
                      userMenu={ this.getUserMenu(isMobile) }
                      onToggleSidebar={ showSidebarMenu ? this.handleToggleSidebar : undefined }
                      onGoTo={ goTo }
                      onLogin={ () => goTo(PATH_LOGIN_PAGE) }
                      moduleToRoutePrefixMap={ moduleToRoutePrefixMap }

                      { ...headerProps }
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
    return (
      <div className="AppLayout__content AppLayout__maxWidthItem">
        { this.renderChildren() }
      </div>
    );
  }
  renderFooter() {
    const {
      footer,
    } = this.props;
    return footer && (
      <div className="AppLayout__footer AppLayout__maxWidthItem">
        { footer }
      </div>
    );
  }

  @bind()
  renderSidebarMenuItem(menuItem, index) {
    const {
      goTo,
      currentPath,
    } = this.props;

    const {
      key,
      type,
      name,
      path,
      icon,
      content,
      onClick,
    } = menuItem;

    return (
      <Menu.Item
        key={ key || (name === MENU_ITEM_TYPE.DELIMITER || type === MENU_ITEM_TYPE.DELIMITER ? `${MENU_ITEM_TYPE.DELIMITER}_${index}` : name) }
        name={ name }
        path={ path }
        onClick={ (event) => {
          this.handleCloseSidebar();
          return (onClick && onClick(event)) || (path && goTo(path));
        } }
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
      sidebarProps,
    } = this.props;
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
        { ...sidebarProps }
      >
        {
          menu.map(this.renderSidebarMenuItem)
        }
      </Sidebar>
    );
  }

  // ======================================================
  // MAIN RENDER
  // ======================================================
  render() {
    const {
      className,
      headerProps,
      headerFixed,
      upBottomButtonsProps,
    } = this.props;
    const {
      sidebarOpened,
    } = this.state;

    return (
      <ContextHeaderProvider headerProps={ headerProps }>
        <MediaQuery mobile={ true }>
          {
            (matches) => {
              const isMobile = matches;
              const menu = this.getSidebarMenu(isMobile);

              // todo @ANKU @LOW - можно наверное меню сделать в виде портала чтобы работы с меню вынести в header
              return (
                <Sidebar.Pushable className={ `AppLayout ${className || ''} ${isMobile ? '' : 'AppLayout--notMobile'} ${headerFixed ? 'AppLayout--headerFixed' : ''}` }>

                  { menu.length > 0 && this.renderMobileSidebarMenu(menu) }

                  {
                    (upBottomButtonsProps !== false && upBottomButtonsProps !== null) && (
                      <UpBottomButtons
                        { ...(upBottomButtonsProps || {}) }
                      />
                    )
                  }
                  <Sidebar.Pusher className="AppLayout__pusher">
                    {
                      /* Semantic ui currently(16.04.16) doesn't have closeDimmerOnClick or smth else
                       So, instead of it, we can use simple <Dimmer> component */
                      sidebarOpened && (
                        <Dimmer
                          active={ true }
                          onClick={ this.handleCloseSidebar }
                          className="AppLayout__dimmer"
                        />
                      )
                    }
                    <div className="AppLayout__inner">
                      <div className="AppLayout__headerFixedWrapper">
                        <div className="AppLayout__headerFixed">
                          <div className={ 'AppLayout__headerWrapper AppLayout__marginItem' }>
                            { this.renderHeader() }
                          </div>
                        </div>
                      </div>
                      <div className={ 'AppLayout__contentWrapper AppLayout__marginItem' }>
                        { this.renderContent() }
                      </div>
                      <div className={ 'AppLayout__footerWrapper AppLayout__marginItem' }>
                        { this.renderFooter() }
                      </div>
                    </div>
                  </Sidebar.Pusher>
                </Sidebar.Pushable>
              );
            }
          }
        </MediaQuery>
      </ContextHeaderProvider>
    );
  }
}

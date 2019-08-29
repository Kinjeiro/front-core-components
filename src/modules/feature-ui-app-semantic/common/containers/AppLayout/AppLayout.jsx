import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bind from 'lodash-decorators/bind';
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
import omit from 'lodash/omit';

import { executeVariable } from '@reagentum/front-core/lib/common/utils/common';
import contextModules from '@reagentum/front-core/lib/common/contexts/ContextModules/decorator-context-modules';
// import titled from '@reagentum/front-core/lib/common/utils/decorators/react-class/titled';
import {
  getCurrentPath,
  getModulesRoutePrefixes,
} from '@reagentum/front-core/lib/common/app-redux/selectors';

import * as moduleAuth from '@reagentum/front-core/lib/modules/module-auth/common/subModule';
import { getUser } from '@reagentum/front-core/lib/modules/module-auth/common/subModule/redux-selectors';
import { actions as actionsUser } from '@reagentum/front-core/lib/modules/module-auth/common/subModule/redux-user-info';
import MENU_PROP_TYPE from '@reagentum/front-core/lib/modules/feature-ui-basic/common/subModule/model-ui-menu';

// ======================================================
// MODULES
// ======================================================
import moduleFeatureSidebar from '../../../../feature-ui-sidebar/common';

// ======================================================
// MODULE
// ======================================================
import i18n from '../../i18n';
import getComponents from '../../get-components';

const {
  MediaQuery,
  Dimmer,
  Sidebar,

  UpBottomButtons,
  AppHeader,
  AppSidebar,
  ContextHeaderProvider,
} = getComponents();

require('./AppLayout.scss');

// @titled('AppLayout', ({ textTitle }) => textTitle || i18n('containers.AppLayout.title'))
@contextModules()
@connect(
  globalState => ({
    currentPath: getCurrentPath(globalState),
    user: getUser(globalState),
    moduleToRoutePrefixMap: getModulesRoutePrefixes(globalState),
    sidebarOpened: moduleFeatureSidebar.reduxSelectors.isSidebarOpen(
      globalState,
    ),
  }),
  {
    // goTo: push,
    actionUserLogout: actionsUser.actionUserLogout,
    ...moduleFeatureSidebar.reduxActions(),
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
    sidebarProps: PropTypes.object,

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

    sidebarOpened: PropTypes.bool,
    actionOpenSidebar: PropTypes.func,
    actionCloseSidebar: PropTypes.func,
    actionClearSidebarContext: PropTypes.func,

    // ======================================================
    // @contextModules
    // ======================================================
    onGoTo: PropTypes.func,
  };

  static defaultProps = {
    ifMobileMoveUserMenuToSidebar: true,
    headerProps: {},
    headerFixed: true,
    textMenuLogout: i18n('containers.AppLayout.menu.logout'),
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

    const menuFinal = executeVariable(
      userMenu || menu,
      [],
      user,
      moduleToRoutePrefixMap,
    ).filter(({ mobile = null }) => mobile === null || mobile === isMobile);

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
      menu.push(
        ...this.getUserMenu(false).map(menuItem => ({
          ...menuItem,
          className: `MenuItem--userMenu ${menuItem.className || ''}`,
        })),
      );
    }
    menu.push(
      ...executeVariable(sidebarMenu, [], user, moduleToRoutePrefixMap).filter(
        ({ mobile = null }) => mobile === null || mobile === isMobile,
      ),
    );

    return menu;
  }

  // ======================================================
  // HANDLERS
  // ======================================================
  @bind()
  handleToggleSidebar() {
    const { sidebarOpened } = this.props;
    if (sidebarOpened) {
      this.handleCloseSidebar();
    } else {
      this.handleOpenSidebar();
    }
  }
  @bind()
  handleOpenSidebar(sidebarContext = {}) {
    const { actionOpenSidebar, actionClearSidebarContext } = this.props;

    actionClearSidebarContext();
    actionOpenSidebar(sidebarContext);
  }
  @bind()
  handleCloseSidebar() {
    const { sidebarProps: { alwaysVisible = false } = {} } = this.props;
    if (!alwaysVisible) {
      this.props.actionCloseSidebar();
    }
  }

  @bind()
  handleLogout() {
    const {
      // goTo,
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
    const { onGoTo, user, headerProps, moduleToRoutePrefixMap } = this.props;

    return (
      <MediaQuery mobile={ true }>
        {matches => {
          const isMobile = matches;
          const showSidebarMenu = this.getSidebarMenu(isMobile).length > 0;

          return (
            <ContextHeaderProvider.Consumer>
              {contextProps => (
                <AppHeader
                  className={ `AppLayout__header AppLayout__maxWidthItem ${headerProps.className || ''}` }
                  userInfo={ user }
                  userMenu={ this.getUserMenu(isMobile) }
                  onToggleSidebar={
                    showSidebarMenu ? this.handleToggleSidebar : undefined
                  }
                  onGoTo={ onGoTo }
                  onLogin={ () =>
                    onGoTo(moduleAuth.PATH_AUTH_INDEX, moduleAuth.MODULE_NAME)
                  }
                  moduleToRoutePrefixMap={ moduleToRoutePrefixMap }
                  { ...headerProps }
                  { ...contextProps }
                />
              )}
            </ContextHeaderProvider.Consumer>
          );
        }}
      </MediaQuery>
    );
  }
  renderContent() {
    return (
      <div className="AppLayout__content AppLayout__maxWidthItem">
        {this.renderChildren()}
      </div>
    );
  }
  renderFooter() {
    const { footer } = this.props;
    return (
      footer && (
        <div className="AppLayout__footer AppLayout__maxWidthItem">
          {footer}
        </div>
      )
    );
  }

  renderMobileSidebarMenu(menu) {
    const { sidebarProps, onGoTo, currentPath } = this.props;

    return (
      <AppSidebar
        { ...omit(this.props, 'children') }
        sidebarProps={ sidebarProps }
        menu={ menu }
        animation="push"
        currentPath={ currentPath }
        onGoTo={ onGoTo }
      />
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
      sidebarOpened,
      sidebarProps: { alwaysVisible, animationType, dimmer = true },
    } = this.props;
    return (
      <ContextHeaderProvider headerProps={ headerProps }>
        <MediaQuery mobile={ true }>
          {matches => {
            const isMobile = matches;
            const menu = this.getSidebarMenu(isMobile);

            // todo @ANKU @LOW - можно наверное меню сделать в виде портала чтобы работы с меню вынести в header
            return (
              <Sidebar.Pushable
                animation="push"
                className={ `AppLayout ${className || ''} ${
                  isMobile ? '' : 'AppLayout--notMobile'
                } ${headerFixed ? 'AppLayout--headerFixed' : ''}` }
              >
                {(sidebarOpened || alwaysVisible) &&
                  this.renderMobileSidebarMenu(menu)}

                {upBottomButtonsProps !== false &&
                  upBottomButtonsProps !== null && (
                    <UpBottomButtons { ...upBottomButtonsProps || {} } />
                  )}
                <Sidebar.Pusher className="AppLayout__pusher">
                  {/* Semantic ui currently(16.04.16) doesn't have closeDimmerOnClick or smth else
                       So, instead of it, we can use simple <Dimmer> component */
                  dimmer && sidebarOpened && (
                    <Dimmer
                      active={ true }
                      onClick={ this.handleCloseSidebar }
                      className="AppLayout__dimmer"
                    />
                  )}
                  <div className="AppLayout__inner">
                    <div className="AppLayout__headerFixedWrapper">
                      <div className="AppLayout__headerFixed">
                        <div
                          className={
                            'AppLayout__headerWrapper AppLayout__marginItem'
                          }
                        >
                          {this.renderHeader()}
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        'AppLayout__contentWrapper AppLayout__marginItem'
                      }
                    >
                      {this.renderContent()}
                    </div>
                    <div
                      className={
                        'AppLayout__footerWrapper AppLayout__marginItem'
                      }
                    >
                      {this.renderFooter()}
                    </div>
                  </div>
                </Sidebar.Pusher>
              </Sidebar.Pushable>
            );
          }}
        </MediaQuery>
      </ContextHeaderProvider>
    );
  }
}

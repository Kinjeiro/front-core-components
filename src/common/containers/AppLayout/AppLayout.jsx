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

import { PATH_INDEX } from '@reagentum/front-core/lib/common/constants/routes.pathes';
import titled from '@reagentum/front-core/lib/common/utils/decorators/react-class/titled';
import { getCurrentPath } from '@reagentum/front-core/lib/common/app-redux/selectors';
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

import {
  UpBottomButtons,
} from '../../components';

import Header from './Header/Header';

import './AppLayout.scss';

// const actionsUser = reduxUser.getBindActions(apiUser);

@titled('AppLayout', ({ textTitle }) => textTitle || i18n('pages.AppLayout.title'))
@connect(
  (globalState) => ({
    currentPath: getCurrentPath(globalState),
  }),
  {
    goTo: push,
    actionUserLogout: actionsUser.actionUserLogout,
  },
)
export default class AppLayout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onLogout: PropTypes.func,

    menu: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.node,
        icon: PropTypes.string,
        path: PropTypes.any,
        onClick: PropTypes.func,
      })),
    ]),

    textTitle: PropTypes.string,
    textHeaderTitle: PropTypes.string,
    textHeaderDescription: PropTypes.string,
    textMenuLogout: PropTypes.string,

    // ======================================================
    // CONNECT
    // ======================================================
    currentPath: PropTypes.string,
    goTo: PropTypes.func,
    actionUserLogout: PropTypes.func,
  };

  static defaultProps = {
    textTitle: i18n('pages.AppLayout.title'),
    textHeaderTitle: i18n('pages.AppLayout.Header.title'),
    textHeaderDescription: i18n('pages.AppLayout.Header.description'),
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
  getUserMenu() {
    const {
      menu = [],
      textMenuLogout,
    } = this.props;

    if (typeof menu === 'function') {
      return menu();
    }

    return [
      ...menu,
      {
        name: textMenuLogout,
        icon: 'sign out',
        onClick: this.handleLogout,
      },
    ];
  }

  getMobileMenu() {
    return this.getUserMenu();
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
      textHeaderTitle,
      textHeaderDescription,
    } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <div className="AppLayout__content">
        <Header
          userMenu={ this.getUserMenu() }
          onToggleSidebar={ this.handleToggleSidebar }
          textHeaderTitle={ textHeaderTitle }
          textHeaderDescription={ textHeaderDescription }
        />

        <div className="fartuna">
          <div className="fartuna-main">
            <UpBottomButtons />
            <main className="main-show-flex">
              {
                sidebarOpened && (
                  <MediaQuery mobile={ true }>
                    {/* Semantic ui currently(16.04.16) doesn't have closeDimmerOnClick or smth else
                     So, instead of it, we can use simple <Dimmer> component */}
                    <Dimmer
                      active={ true }
                      onClick={ this.handleCloseSidebar }
                    />
                  </MediaQuery>
                )
              }
              <div className="main-content">
                <Container className="main-show">
                  { this.renderChildren() }
                </Container>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  renderMenu() {
    const {
      goTo,
      currentPath,
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
      >
        {
          this.getMobileMenu()
            .map(({ name, path, icon, onClick }) => (
              <Menu.Item
                key={ name }
                name={ name }
                path={ path }
                onClick={ onClick || (path ? () => goTo(path) : null) }
                link={ !!path }
                active={ currentPath.indexOf(path) >= 0 }
              >
                <Icon name={ icon } />
                { name }
              </Menu.Item>
            ))
        }
      </Sidebar>
    );
  }

  // ======================================================
  // MAIN RENDER
  // ======================================================
  render() {
    return (
      <div className="AppLayout">
        <div className="page-layout ready">
          <MediaQuery mobile={ true }>
            {
              (matches) => (
                <Sidebar.Pushable
                  as={ Segment }
                  className={ matches ? '' : 'AppLayout__notMobile' }
                >
                  { matches && this.renderMenu() }

                  <Sidebar.Pusher>
                    { this.renderContent() }
                  </Sidebar.Pusher>
                </Sidebar.Pushable>
              )
            }
          </MediaQuery>
        </div>
      </div>
    );
  }
}

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

import titled from '@reagentum/front-core/lib/common/utils/decorators/react-class/titled';
import { getCurrentPath } from '@reagentum/front-core/lib/common/app-redux/selectors';
import { actions as actionsUser } from '@reagentum/front-core/lib/common/app-redux/reducers/app/user-info';

import { MediaQuery } from '@reagentum/front-core/lib/common/components';

// ======================================================
// UTILS
// ======================================================
import i18n from '../../utils/i18n';
import * as paths from '../../routes.pathes';

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

@titled('AppLayout', i18n('pages.AppLayout.title'))
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

    menu: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      icon: PropTypes.string,
      path: PropTypes.any,
      onClick: PropTypes.func,
    })),

    // ======================================================
    // CONNECT
    // ======================================================
    currentPath: PropTypes.string,
    goTo: PropTypes.func,
    actionUserLogout: PropTypes.func,
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
    } = this.props;
    return [
      ...menu,
      {
        name: 'logout',
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
      .then(() => window.location = paths.PATH_INDEX);
  }

  // ======================================================
  // RENDER
  // ======================================================
  renderChildren() {
    return this.props.children;
  }

  renderContent() {
    const { sidebarOpened } = this.state;

    return (
      <div className="AppLayout__content">
        <Header
          userMenu={ this.getUserMenu() }
          onToggleSidebar={ this.handleToggleSidebar }
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
                { i18n(`pages.AppLayout.menu.${name}`) }
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

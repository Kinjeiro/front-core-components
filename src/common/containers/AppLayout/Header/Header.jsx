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

import { getUserInfo } from '@reagentum/front-core/lib/common/app-redux/selectors';
import {
  MediaQuery,
  Link,
} from '@reagentum/front-core/lib/common/components';

// ======================================================
// UTILS
// ======================================================
import { PATH_INDEX } from '../../../routes.pathes';

// ======================================================
// REDUX
// ======================================================

// ======================================================
// COMPONENTS
// ======================================================

import './Header.scss';

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
    userMenu: PropTypes.array,
    textHeaderTitle: PropTypes.string,
    textHeaderDescription: PropTypes.string,

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
            <MediaQuery mobile={ true }>
              <span
                className="navicon Header__menu"
                onClick={ onToggleSidebar }
              >
                <Icon name="content" />
              </span>
            </MediaQuery>
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


  renderRightPart() {
    const {
      userInfo: {
        displayName,
      },
      userMenu,
      goTo,
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
            <Grid.Column>
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
                    userMenu.map(({ name, path, onClick }, index) => (name === 'delimiter'
                      ? <Dropdown.Divider key={ `divider_${index}` } />
                      : (
                        <Dropdown.Item
                          key={ name }
                          onClick={ onClick || (() => goTo(path)) }
                        >
                          { name }
                        </Dropdown.Item>
                      )))
                  }
                </Dropdown.Menu>
              </Dropdown>
            </Grid.Column>
          </MediaQuery>

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
    return (
      <header className="Header">
        <Grid columns="equal">
          <Grid.Row>
            <Grid.Column floated="left">
              { this.renderLeftPart() }
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

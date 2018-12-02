import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import bind from 'lodash-decorators/bind';

import LoginPage from '@igs/front-core/lib/common/containers/LoginPage/LoginPage';

// import { PATH_POST_AUTH_ROLE } from '../../../routes.pathes';

import './Signin.scss';

// @connect(
//   (globalState) => ({
//   }),
// )
export default class Signin extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  // ======================================================
  // LIFECYCLE
  // ======================================================
  // componentDidMount() {
  // }
  // componentWillReceiveProps(newProps) {
  // }


  // ======================================================
  // HANDLERS
  // ======================================================
  // @bind()

  // ======================================================
  // RENDERS
  // ======================================================


  // ======================================================
  // MAIN RENDER
  // ======================================================
  render() {
    return (
      <div className="Signin">
        <LoginPage
          loginButtonClassName="Signin__loginButton ui button"
          { ...this.props }
        />
      </div>
    );
  }
}

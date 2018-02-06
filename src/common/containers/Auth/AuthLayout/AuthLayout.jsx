import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './AuthLayout.scss';

// @connect(
//   (globalState) => ({
//   }),
// )
export default class AuthLayout extends Component {
  static propTypes = {
    children: PropTypes.node,
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
    const {
      children,
    } = this.props;

    return (
      <div className="AuthLayout">
        <div className="AuthLayout__body">
          { children }
        </div>
      </div>
    );
  }
}

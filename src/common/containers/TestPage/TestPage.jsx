import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import bind from 'lodash-decorators/bind';

import i18n from '../../utils/i18n';

// import './TestPage.scss';

import UniTable from '../../components/UniTable/UniTable';

@connect(
  (globalState) => ({
  }),
)
export default class TestPage extends Component {
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
    const {

    } = this.props;

    return (
      <div className="TestPage">
        TestPage

        <UniTable
          records={ [
            { testFieldA: 'testFieldA1', testFieldB: 'testFieldB1' },
            { testFieldA: 'testFieldA2', testFieldB: 'testFieldB2' },
            { testFieldA: 'testFieldA3', testFieldB: 'testFieldB3' },
            { testFieldA: 'testFieldA4', testFieldB: 'testFieldB4' },
          ] }
        />
      </div>
    );
  }
}

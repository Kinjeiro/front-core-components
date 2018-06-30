import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import bind from 'lodash-decorators/bind';

import i18n from '../../utils/i18n';

import UniTable from '../../components/UniTable/UniTable';
import headerContext from '../AppLayout/header-context-decorator';

import './TestPage.scss';

@headerContext()
@connect(
  (globalState) => ({
  }),
)
export default class TestPage extends Component {
  static propTypes = {
    setTitle: PropTypes.func,
    setHeaderTitle: PropTypes.func,
    setHeaderDescription: PropTypes.func,
    setHeaderLeftPart: PropTypes.func,
    setHeaderRightPart: PropTypes.func,
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
        <h2>TestPage</h2>
        <button onClick={ () => this.props.setTitle('setTitle') }>setTitle</button>
        <button onClick={ () => this.props.setHeaderTitle('setHeaderTitle') }>setHeaderTitle</button>
        <button onClick={ () => this.props.setHeaderDescription('setHeaderDescription') }>setHeaderDescription</button>
        <button onClick={ () => this.props.setHeaderLeftPart('setHeaderLeftPart') }>setHeaderLeftPart</button>
        <button onClick={ () => this.props.setHeaderRightPart('setHeaderRightPart') }>setHeaderRightPart</button>

        <div className="testImageMin" />
        <div className="testImage" />

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

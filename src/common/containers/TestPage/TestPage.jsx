import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import bind from 'lodash-decorators/bind';

import simpleForm from '@reagentum/front-core/lib/common/utils/decorators/react-class/redux-simple-form';

import i18n from '../../utils/i18n';

import headerContext from '../../contexts/ContextHeader/decorator-context-header';
import getComponents from '../../get-components';

import './TestPage.scss';

const {
  UniTable,
  Button,
  Segment,
  Form,
} = getComponents();

const PAGE_ID = 'TestPage';

@headerContext()
@connect(
  (globalState) => ({
  }),
)
@simpleForm(PAGE_ID)
export default class TestPage extends Component {
  static propTypes = {
    setTitle: PropTypes.func,
    setHeaderTitle: PropTypes.func,
    setHeaderDescription: PropTypes.func,
    setHeaderLeftPart: PropTypes.func,
    setHeaderRightPart: PropTypes.func,

    // ======================================================
    // @simpleForm
    // ======================================================
    form: PropTypes.object,
    onUpdateForm: PropTypes.func,
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
  renderUniTable() {
    return (
      <Segment
        label="Table"
        className="TestPage__uniTable TestPage__item"
      >
        <Button onClick={ () => this.props.setTitle('setTitle') }>setTitle</Button>
        <Button onClick={ () => this.props.setHeaderTitle('setHeaderTitle') }>setHeaderTitle</Button>
        <Button onClick={ () => this.props.setHeaderDescription('setHeaderDescription') }>setHeaderDescription</Button>
        <Button onClick={ () => this.props.setHeaderLeftPart('setHeaderLeftPart') }>setHeaderLeftPart</Button>
        <Button onClick={ () => this.props.setHeaderRightPart('setHeaderRightPart') }>setHeaderRightPart</Button>

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
      </Segment>
    );
  }

  renderForm() {
    const {
      form,
      onUpdateForm,
    } = this.props;

    return (
      <Segment
        label="Form"
        className="TestPage__item"
      >
        <Form
          fields={ [
            {
              name: 'text',
              label: 'text',
              type: Form.FIELD_TYPES.TEXT,
              value: form.text,
            },
            {
              label: 'LIST',
              name: 'list',
              type: Form.FIELD_TYPES.LIST,
              options: [
                {
                  label: 'label 1',
                  value: 'value 1',
                },
                {
                  label: 'bbbb',
                  value: 'bbbb',
                },
              ],
              value: form.list,
            },
            {
              name: 'datetime',
              label: 'datetime',
              type: Form.FIELD_TYPES.DATETIME,
              value: form.datetime,
            },
            {
              name: 'string',
              label: 'string',
              type: Form.FIELD_TYPES.STRING,
              value: form.string,
            },
            {
              name: 'numeric',
              label: 'numeric',
              type: Form.FIELD_TYPES.NUMERIC,
              value: form.number,
            },
            {
              name: 'boolean',
              label: 'boolean',
              type: Form.FIELD_TYPES.BOOLEAN,
              value: form.boolean,
            },
          ] }
          onChangeField={ onUpdateForm }
        />
      </Segment>
    );
  }

  // ======================================================
  // MAIN RENDER
  // ======================================================
  render() {
    // const {
    // } = this.props;

    return (
      <div className="TestPage">
        { this.renderUniTable() }
        { this.renderForm() }
      </div>
    );
  }
}

import React from 'react';
import PropTypes from 'prop-types';
import bind from 'lodash-decorators/bind';
import {
  Button,
  TextArea,
} from 'semantic-ui-react';

import { isEmpty } from '@reagentum/front-core/lib/common/utils/common';

import i18n from '../../utils/i18n';

import getComponents from '../../get-components';

const { Attachment } = getComponents();

require('./ToggledAddData.scss');

export default class ToggledAddData extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.any,
    dataComponent: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.instanceOf(React.Component),
    ]).isRequired, // class
    dataComponentProps: PropTypes.object,
    dataComponentValueParser: PropTypes.func,
    withAttach: PropTypes.bool,
    onProceed: PropTypes.func,

    textShowDataComponentAction: PropTypes.node,
    textOnProceedAction: PropTypes.node,
  };

  static defaultProps = {
    dataComponent: TextArea,
    textShowDataComponentAction: i18n('components.ToggledAddData.showDataAction'),
    textOnProceedAction: i18n('components.ToggledAddData.onProceedAction'),
  };

  state = {
    proceedData: false,
    showDataComponent: false,
    tempData: '',
    attaches: [],
  };

  // ======================================================
  // UTILS
  // ======================================================
  @bind()
  clear() {
    this.setState({
      proceedData: false,
      showDataComponent: false,
      tempData: '',
      attaches: [],
    });
  }


  // ======================================================
  // HANDLERS
  // ======================================================
  @bind()
  handleShowDataComponent() {
    this.setState({
      showDataComponent: true,
    });
  }

  @bind()
  handleChange(event, ...other) {
    const {
      dataComponentValueParser,
    } = this.props;

    const parsedData = dataComponentValueParser
      ? dataComponentValueParser(event, ...other)
      : event && event.target
                         ? event.target.value
                         : event;

    this.setState({
      tempData: parsedData,
    });
  }

  @bind()
  handleProceed() {
    const {
      onProceed,
    } = this.props;
    const {
      tempData,
      attaches,
    } = this.state;

    const result = onProceed(tempData, attaches);

    // todo @ANKU @LOW - более красивое решение не сбрасывания
    if (typeof result === 'undefined' || result === true) {
      this.clear();
    } else if (result.then) {
      this.setState({
        proceedData: true,
      });
      result.then(this.clear);
    }
  }

  @bind()
  handleAttachChange(attaches) {
    this.setState({
      attaches,
    });
  }


  // ======================================================
  // RENDERS
  // ======================================================
  renderComponent() {
    const {
      dataComponent,
      dataComponentProps = {},
      value,
    } = this.props;
    const {
      tempData,
      proceedData,
    } = this.state;

    return React.createElement(dataComponent, {
      value: tempData || value,
      onChange: this.handleChange,
      readOnly: proceedData,
      ...dataComponentProps,
      className: `DataComponent__content ${dataComponentProps.className || ''}`,
    });
  }

  renderActions() {
    const {
      textShowDataComponentAction,
      textOnProceedAction,
      withAttach,
    } = this.props;
    const {
      attaches,
      showDataComponent,
      proceedData,
      tempData,
    } = this.state;

    return showDataComponent
      ? (
        <div>
          <div className="ToggledAddData__dataComponent DataComponent">
            { this.renderComponent() }

            <Button
              className="ToggledAddData__onProceedAction"
              onClick={ this.handleProceed }
              disabled={ proceedData || isEmpty(tempData) }
            >
              { textOnProceedAction }
            </Button>
          </div>
          {
             withAttach && (
               <Attachment
                 className="ToggledAddData__attaches"
                 value={ attaches }
                 onChange={ this.handleAttachChange }
               />
             )
           }
        </div>
      )
      : (
        <Button
          className="ToggledAddData__showDataComponentAction"
          onClick={ this.handleShowDataComponent }
          disabled={ proceedData }
        >
          { textShowDataComponentAction }
        </Button>
      );
  }


  // ======================================================
  // MAIN RENDER
  // ======================================================
  render() {
    const {
      className,
    } = this.props;
    return (
      <div className={ `ToggledAddData ${className || ''}` }>
        { this.renderActions() }
      </div>
    );
  }

}

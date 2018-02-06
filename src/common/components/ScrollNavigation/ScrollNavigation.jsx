import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bind from 'lodash-decorators/bind';
import {
  Segment,
  Icon,
  Header,
} from 'semantic-ui-react';
import Scroll from 'react-scroll';

import { executeVariable } from '@reagentum/front-core/lib/common/utils/common';
import { MediaQuery } from '@reagentum/front-core/lib/common/components';

import './ScrollNavigation.scss';

export default class ScrollNavigation extends Component {
  static propTypes = {
    segments: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.node,
      content: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
      isValidStep: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
      isShow: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    })),
    children: PropTypes.node,
  };

  // static defaultProps = {
  // };

  state = {
    toggleScrollMenu: false,
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
  @bind()
  handleToggleScrollMenu() {
    this.setState({
      toggleScrollMenu: !this.state.toggleScrollMenu,
    });
  }

  // ======================================================
  // RENDERS
  // ======================================================
  renderStepInfo(step) {
    const {
      id,
      isShow,
      label,
      isStepValid,
    } = step;

    // todo @ANKU @CRIT @MAIN - бага в том, что если меняется внутри контент (к примеру лоадингом) то прекращает работать
    return id && executeVariable(isShow, true, id, 'info') && (
      <MediaQuery
        key={ `${id}_${Math.random()}` }
        mobile={ true }
      >
        {(matches) => (
          <li className="StepInfo">
            <Scroll.Link
              className="ScrollLink"
              activeClass="ScrollLink--active"
              to={ id }
              spy={ true }
              hashSpy={ true }
              smooth={ true }
              isDynamic={ true }
              onClick={ matches ? this.handleToggleScrollMenu : undefined }
            >
              {
                executeVariable(isStepValid, true, id)
                  ? (
                    <span className="StepInfo--circle StepInfo__ready">
                      <Icon name="checkmark" />
                    </span>
                  )
                  : (
                    <span className="StepInfo--circle StepInfo__number">
                      &nbsp;
                    </span>
                  )
              }
              <span className="StepInfo__label">
                { label || id }
              </span>
            </Scroll.Link>
          </li>
        )}
      </MediaQuery>
    );
  }

  renderStep(step, index) {
    const {
      id,
      label,
      content,
      isShow,
    } = step;

    if (!executeVariable(isShow, true, id, 'content')) {
      return null;
    }

    const segmentContent = (
      <Segment
        className={ `ScrollNavigation__Step${id} ${id || ''}` }
        vertical={ true }
        basic={ true }
      >
        {
          (label || id) && (
            <Header
              as="h3"
              content={ label || id }
            />
          )
        }
        <div className="ui segment">
          { executeVariable(content) }
        </div>
      </Segment>
    );

    return id
    ? (
      <Scroll.Element
        key={ id }
        name={ id }
      >
        { segmentContent }
      </Scroll.Element>
    )
    : (
      <div
        key={ index }
        className="ScrollNavigation__noId"
      >
        { segmentContent }
      </div>
    );
  }

  // ======================================================
  // MAIN RENDER
  // ======================================================
  render() {
    const {
      children,
      segments,
    } = this.props;
    const { toggleScrollMenu } = this.state;

    return (
      <div className="ScrollNavigation">
        <div className={ `ScrollNavigation__stepsInfo StepsInfo StepsInfo${toggleScrollMenu ? '--toggled' : ''}` }>
          <ul>
            { segments.map((segment) => this.renderStepInfo(segment)) }
          </ul>
          <div className="ScrollNavigation__expandButton">
            <Icon
              name={ toggleScrollMenu ? 'chevron up' : 'chevron down' }
              onClick={ this.handleToggleScrollMenu }
            />
          </div>
        </div>

        <div className="ScrollNavigation__content">
          { segments.map((segment, index) => this.renderStep(segment, index)) }
          {
            children && (
              <div className="ScrollNavigation__children">
                { children }
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

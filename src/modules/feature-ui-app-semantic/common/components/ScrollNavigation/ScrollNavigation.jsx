import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bind from 'lodash-decorators/bind';
import Scroll from 'react-scroll';

import { executeVariable } from '@reagentum/front-core/lib/common/utils/common';
import { getScrollParent } from '@reagentum/front-core/lib/common/utils/dom-utils';

import getComponents from '../../get-components';

const {
  MediaQuery,
  Segment,
  Icon,
  Header,

  UpBottomButtons,
} = getComponents();

require('./ScrollNavigation.scss');

export default class ScrollNavigation extends Component {
  static propTypes = {
    /**
     * если выставлен в true - то будет использоваться скроллинг внутри эти контрола
     * тогда не работает scrollContainerId
     * boolean - использовать внутренний скроллинг
     * string - тогда это будет id элемента, у которого будет скроллинг
     */
    scrollingOwn: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
    ]),
    /**
     * можно сделать кнопки вверх-вниз для этого скроллинга
     */
    useUpBottomButtons: PropTypes.bool,

    scrollContainer: PropTypes.any,
    scrollContainerId: PropTypes.string,
    segments: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      labelBefore: PropTypes.node,
      label: PropTypes.node,
      labelAfter: PropTypes.node,
      className: PropTypes.string,
      /**
       * можно подать функцию (id) => {}
       */
      content: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
      isValidStep: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
      /**
       * можно подать функцию (id, type) => {}, где type это либо зона 'info', либо зона 'content'
       */
      isShow: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    })),
    className: PropTypes.string,
    children: PropTypes.node,
  };

  static defaultProps = {
    scrollingOwn: false,
  };

  state = {
    toggleScrollMenu: false,
    scrollContainerReady: false,
  };

  elementEl = null;
  contentEl = null;
  scrollContainerEl = null;

  // ======================================================
  // LIFECYCLE
  // ======================================================
  componentDidMount() {
    const {
      scrollingOwn,
      scrollContainer,
      scrollContainerId,
    } = this.props;

    setTimeout(() => {
      if (scrollingOwn) {
        this.scrollContainerEl = this.contentEl;
      } else if (scrollContainer) {
        this.scrollContainerEl = scrollContainer;
      } else if (scrollContainerId) {
        this.scrollContainerEl = document.getElementById(scrollContainerId);
      } else if (this.elementEl) {
        this.scrollContainerEl = getScrollParent(this.elementEl);
      }
      this.setState({
        scrollContainerReady: true,
      });
      // нужно подождать пока все стили подцепятся и правильно определить родителя
    }, 1000);
  }
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
      scrollContainerEl,
    } = this;
    // const {
    // scrollContainerId,
    // } = this.props;
    const {
      id,
      isShow,
      label,
      isStepValid,
    } = step;

    // todo @ANKU @CRIT @MAIN - бага в том, что если меняется внутри контент (к примеру лоадингом) то прекращает работать

    // todo @ANKU @LOW @react-scroll - параметр to может быть только стрингой на цифры падает ошибка (проверка hash = hash ? hash.indexOf('#') === 0 ? hash : '#' + hash : '';)
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
            container={ scrollContainerEl }
            to={ `${id}` }
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
      labelBefore,
      label,
      labelAfter,
      className,
      content,
      isShow,
    } = step;

    if (!executeVariable(isShow, true, id, 'content')) {
      return null;
    }

    const segmentContent = (
      <Segment
        className={ `ScrollNavigation__Step${id} ${id || ''} ${className || ''}` }
        vertical={ true }
        basic={ true }
      >
        { labelBefore }
        {
          (label !== '' && label !== null) && (label || id) && (
            <Header
              as="h3"
              content={ label || id }
            />
          )
        }
        { labelAfter }
        <div className="ui segment">
          { executeVariable(content, '', id) }
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
      scrollContainerId,
      scrollingOwn,
      useUpBottomButtons,
      className,
    } = this.props;
    const {
      toggleScrollMenu,
      scrollContainerReady,
    } = this.state;

    // todo @ANKU @LOW - реализовать fixed через absolute по правому краю - https://stackoverflow.com/a/38730739/344172
    // только нужно протестить в мобильном размере

    return (
      <div
        className={ `ScrollNavigation ${scrollingOwn ? 'ScrollNavigation--scrorllingOwn' : ''} ${className || ''}` }
        ref={ (elementNode) => this.elementEl = elementNode }
      >
        <div className={ `ScrollNavigation__stepsInfo StepsInfo StepsInfo${toggleScrollMenu ? '--toggled' : ''}` }>
          {
            (scrollContainerId || scrollContainerReady) && (
              <ul>
                { segments.map((segment) => this.renderStepInfo(segment)) }
              </ul>
            )
          }
          <div className="ScrollNavigation__expandButton">
            <Icon
              name={ toggleScrollMenu ? 'chevron up' : 'chevron down' }
              onClick={ this.handleToggleScrollMenu }
            />
          </div>
        </div>

        <div
          id={ typeof scrollingOwn === 'string' ? scrollingOwn : undefined }
          className="ScrollNavigation__content"
          ref={ (elementNode) => this.contentEl = elementNode }
        >
          { segments.map((segment, index) => this.renderStep(segment, index)) }
          {
            children && (
              <div className="ScrollNavigation__children">
                { children }
              </div>
            )
          }
        </div>

        {
          (useUpBottomButtons && this.scrollContainerEl) && (
            <UpBottomButtons
              scrollContainer={ this.scrollContainerEl }
            />
          )
        }
      </div>
    );
  }
}

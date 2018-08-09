import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import bind from 'lodash-decorators/bind';

import { getCurrentPage } from '@reagentum/front-core/lib/common/app-redux/selectors';
import * as reduxCurrentPage from '@reagentum/front-core/lib/common/app-redux/reducers/app/current-page';

import i18n from '../../utils/i18n';
import AppHeader from '../../components/AppHeader/AppHeader';

// import './ContextHeaderProvider.scss';

const ContextHeader = React.createContext({
  title: null,
  headerTitle: null,
  headerDescription: null,
  headerLeftPart: null,
  headerRightPart: null,

  setTitle: null,
  setHeaderTitle: null,
  setHeaderDescription: null,
  setHeaderLeftPart: null,
  setHeaderRightPart: null,
});

export const ContextHeaderConsumer = ContextHeader.Consumer;

@connect(
  (globalState) => ({
    /*
     id: null, // id
     title: null,
     metas: {},
     otherInfo: {}
    */
    title: getCurrentPage(globalState).title,
  }),
  {
    ...reduxCurrentPage.actions,
  },
)
export default class ContextHeaderProvider extends Component {
  static Consumer = ContextHeaderConsumer;

  static propTypes = {
    // ======================================================
    // PROPS
    // ======================================================
    children: PropTypes.node,
    headerProps: PropTypes.shape(AppHeader.propTypes),

    // ======================================================
    // @connect
    // ======================================================
    title: PropTypes.node,
    actionCurrentPageChanged: PropTypes.func,
  };

  static defaultProps = {
    title: i18n('pages.AppLayout.title'),
  };

  state = {
    headerTitle: typeof this.props.headerProps.headerTitle !== 'undefined'
      ? this.props.headerProps.headerTitle
      : i18n('pages.AppLayout.Header.title'),
    headerDescription: typeof this.props.headerProps.headerDescription !== 'undefined'
      ? this.props.headerProps.headerDescription
      : i18n('pages.AppLayout.Header.description'),
    leftPart: this.props.headerProps.leftPart,
    rightPart: this.props.headerProps.rightPart,
  };

  // ======================================================
  // LIFECYCLE
  // ======================================================
  // componentWllMount() {
  // }
  // componentDidMount() {
  // }
  // componentWillReceiveProps(newProps) {
  // }

  // ======================================================
  // UTILS
  // ======================================================

  // ======================================================
  // HANDLERS
  // ======================================================
  @bind()
  setTitle(value) {
    this.props.actionCurrentPageChanged({
      title: value,
    });
  }
  @bind()
  setHeaderTitle(value) { return this.setState({ headerTitle: value }); }
  @bind()
  setHeaderDescription(value) { return this.setState({ headerDescription: value }); }
  @bind()
  setHeaderLeftPart(value) { return this.setState({ leftPart: value }); }
  @bind()
  setHeaderRightPart(value) { return this.setState({ rightPart: value }); }

  // ======================================================
  // RENDERS
  // ======================================================


  // ======================================================
  // MAIN RENDER
  // ======================================================
  render() {
    const {
      title,
      children,
    } = this.props;

    const {
      headerTitle,
      headerDescription,
      leftPart,
      rightPart,
    } = this.state;

    return (
      <ContextHeader.Provider
        value={{
          title,
          headerTitle,
          headerDescription,
          leftPart,
          rightPart,

          setTitle: this.setTitle,
          setHeaderTitle: this.setHeaderTitle,
          setHeaderDescription: this.setHeaderDescription,
          setHeaderLeftPart: this.setHeaderLeftPart,
          setHeaderRightPart: this.setHeaderRightPart,
        }}
      >
        { children }
      </ContextHeader.Provider>
    );
  }
}

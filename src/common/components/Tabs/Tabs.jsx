import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

import { Link } from '@reagentum/front-core/lib/common/components';

import i18n from '../../utils/i18n';

import './Tabs.scss';

export { default as TAB_PROP_TYPES } from '../../models/model-tab';

export default class Tabs extends Component {
  static propTypes = {
    className: PropTypes.string,
    tabs: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.node,
      to: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        // https://github.com/ReactTraining/react-router/blob/v3/examples/query-params/app.js
        PropTypes.shape({
          pathname: PropTypes.string,
          query: PropTypes.object,

          basename: PropTypes.string,
          search: PropTypes.string,
          hash: PropTypes.string,
        }),
      ]),
    })),
    /**
     * чтобы индекс без типа считался активной первой табой
     */
    indexPath: PropTypes.string,
    buttonLinkProps: PropTypes.shape({
      compact: PropTypes.bool,
      simple: PropTypes.bool,
    }),
    withOrButtons: PropTypes.bool,
    textOr: PropTypes.node,
    fullWidth: PropTypes.bool,
  };

  static defaultProps = {
    fullWidth: true,
    textOr: i18n('components.Tabs.textOr'),
  };

  render() {
    const {
      className,
      tabs,
      indexPath,
      buttonLinkProps: {
        compact,
        simple,
      } = {},
      withOrButtons,
      textOr,
      fullWidth,
    }
     = this.props;

    let linkClassName = 'ui button Tabs__tab Tab';
    if (compact) {
      linkClassName += ' compact';
    }
    if (simple) {
      linkClassName += ' simple';
    }

    const tabsComponent = tabs.reduce((result, tab, index) => {
      const key = typeof tab.name !== 'object' ? tab.name : index;
      result.push((
        <Link
          key={ key }
          to={
            // для первой табы
            index === 0 && indexPath
              ? ({ pathname }) => {
                if (pathname.indexOf(indexPath) >= 0) {
                  return pathname;
                }
                return indexPath;
              }
              : tab.to
          }
          className={ linkClassName }
          activeClassName="Tab--active"
        >
          { tab.name }
        </Link>
      ));
      if (withOrButtons && index !== tabs.length - 1) {
        result.push((
          <Button.Or
            key={ `or_${key}` }
            text={ textOr }
          />
        ));
      }
      return result;
    }, []);

    return (
      <Button.Group
        widths={ fullWidth ? tabs.length : undefined }
        className={ `Tabs ${className || ''} ${simple ? 'simple' : ''}` }
      >
        { tabsComponent }
      </Button.Group>
    );
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

import { Link } from '@reagentum/front-core/lib/common/components';

import i18n from '../../utils/i18n';

import './Tabs.scss';

export default class Tabs extends Component {
  static propTypes = {
    className: PropTypes.string,
    tabs: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
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
    buttonLinkProps: PropTypes.object,
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
      result.push((
        <Link
          key={ tab.name }
          to={ tab.to }
          className={ linkClassName }
          activeClassName="Tab--active"
        >
          { tab.name }
        </Link>
      ));
      if (withOrButtons && index !== tabs.length - 1) {
        result.push((
          <Button.Or
            key={ `or_${tab.name}` }
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

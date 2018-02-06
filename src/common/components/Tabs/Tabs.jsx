import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

import { Link } from '@reagentum/front-core/lib/common/components';

import './Tabs.scss';

export default class Tabs extends Component {
  static propTypes = {
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
  };

  render() {
    const {
      tabs,
    } = this.props;

    return (
      <Button.Group
        widths={ tabs.length }
        className="Tabs"
      >
        {
          tabs.map((tab) => {
            return (
              <Link
                key={ tab.name }
                to={ tab.to }
                className="ui button Tabs__tab Tab"
                activeClassName="Tab--active"
              >
                { tab.name }
              </Link>
            );
          })
        }
      </Button.Group>
    );
  }
}

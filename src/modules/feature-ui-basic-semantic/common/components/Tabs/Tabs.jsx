import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

import TAB_PROPS from '@reagentum/front-core/lib/modules/feature-ui-basic/common/subModule/model-ui-tab';

import i18n from '../../i18n';
import getComponents from '../../get-components';

const {
  Link,
} = getComponents();

require('./Tabs.scss');

export default class Tabs extends Component {
  static propTypes = {
    className: PropTypes.string,
    tabs: PropTypes.arrayOf(TAB_PROPS),
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

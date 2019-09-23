import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// import i18n from '../../i18n';
import getComponents from '../../get-components';

const {
  Popup,
  Icon,
} = getComponents();

require('./Hint.scss');

export default class Hint extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.string,
  };

  static defaultProps = {
  };

  render() {
    const {
      className,
      children,
    } = this.props;

    return (
      <Popup
        className={ `Hint ${className || ''}` }
        trigger={
          <Icon
            className="Hint__icon"
            name="question circle outline"
            size="large"
          />
        }
        content={ children }
        position="right center"
        size="small"
      />
    );
  }
}

/* eslint-disable max-len */
import React, { PureComponent } from 'react';

export default class FacebookIcon extends PureComponent {
  render() {
    const {
      className,
    } = this.props;

    return (
      <svg
        className={ `FacebookIcon ${className || ''}` }
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 10.607 21"
      >
        <g>
          <path
            id="XMLID_835_"
            d="M77.042 11.185h2.3v9.477a.339.339 0 0 0 .339.339h3.9a.339.339 0 0 0 .339-.339v-9.433h2.65a.339.339 0 0 0 .336-.3l.4-3.489a.339.339 0 0 0-.336-.377h-3.046V4.876c0-.659.355-.994 1.055-.994h1.993a.339.339 0 0 0 .339-.339V.341A.339.339 0 0 0 86.972 0H84.1a5.263 5.263 0 0 0-3.442 1.3 3.609 3.609 0 0 0-1.2 3.208v2.555h-2.416a.339.339 0 0 0-.342.337v3.444a.339.339 0 0 0 .342.341z"
            className="FacebookIcon--icon"
            transform="translate(-76.703)"
          />
        </g>
      </svg>
    );
  }
}

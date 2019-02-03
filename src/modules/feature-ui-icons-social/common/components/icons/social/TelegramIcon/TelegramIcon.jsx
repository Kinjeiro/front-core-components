/* eslint-disable max-len */
import React, { PureComponent } from 'react';

export default class TelegramIcon extends PureComponent {
  render() {
    const {
      className,
    } = this.props;

    return (
      <svg
        className={ `TelegramIcon ${className || ''}` }
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24.119 21"
      >
        <g>
          <path
            id="XMLID_497_"
            d="M.426 29.47l5.558 2.074 2.151 6.918a.654.654 0 0 0 1.039.313l3.1-2.525a.924.924 0 0 1 1.127-.031l5.587 4.057a.655.655 0 0 0 1.026-.4l4.091-19.686a.655.655 0 0 0-.877-.744L.42 28.244a.655.655 0 0 0 .006 1.226zm7.362.97l10.862-6.69a.189.189 0 0 1 .228.3l-8.964 8.332a1.858 1.858 0 0 0-.576 1.112l-.305 2.263a.281.281 0 0 1-.548.04L7.31 31.67a1.094 1.094 0 0 1 .478-1.23z"
            className="TelegramIcon--icon"
            transform="translate(0 -19.401)"
          />
        </g>
      </svg>
    );
  }
}

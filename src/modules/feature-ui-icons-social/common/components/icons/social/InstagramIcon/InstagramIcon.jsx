/* eslint-disable max-len */
import React, { PureComponent } from 'react';

export default class InstagramIcon extends PureComponent {
  render() {
    const {
      className,
    } = this.props;

    return (
      <svg
        className={ `InstagramIcon ${className || ''}` }
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 21.002 21"
      >
        <g>
          <path
            id="XMLID_505_"
            d="M2.7.012h15.61a2.7 2.7 0 0 1 2.7 2.7v15.61a2.7 2.7 0 0 1-2.7 2.694H2.7A2.7 2.7 0 0 1 0 18.317V2.708A2.7 2.7 0 0 1 2.7.012zm12.6 2.332a.949.949 0 0 0-.945.947v2.262a.948.948 0 0 0 .945.947h2.373a.948.948 0 0 0 .945-.946V3.291a.949.949 0 0 0-.945-.947zm3.328 6.548h-1.849a6.141 6.141 0 0 1 .27 1.8 6.43 6.43 0 0 1-6.529 6.324A6.43 6.43 0 0 1 3.992 10.7a6.168 6.168 0 0 1 .27-1.8H2.335v8.872a.835.835 0 0 0 .834.833h14.624a.835.835 0 0 0 .834-.833zM10.521 6.38A4.154 4.154 0 0 0 6.3 10.468a4.154 4.154 0 0 0 4.217 4.087 4.155 4.155 0 0 0 4.218-4.087 4.154 4.154 0 0 0-4.214-4.088z"
            className="InstagramIcon--icon"
            transform="translate(0 -.012)"
          />
        </g>
      </svg>
    );
  }
}

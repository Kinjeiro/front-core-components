/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import bind from 'lodash-decorators/bind';
// http://react-responsive-carousel.js.org/storybook/
// import { Carousel as ReactCarousel } from 'react-responsive-carousel';
// import ReactCarousel from 'nuka-carousel';
import ReactCarousel from 'react-image-gallery';
// import i18n from '../../utils/i18n';

import './Carousel.scss';

export default class Carousel extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    /**
     * https://www.npmjs.com/package/react-image-gallery#props
     */
    items: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        original: PropTypes.string,
        thumbnail: PropTypes.string,
      }),
    ])),
    ...ReactCarousel.propTypes,
  };

  // ======================================================
  // RENDERS
  // ======================================================
  getImageInfo(image) {
    const result = typeof image === 'string'
      ? {
        original: image,
        thumbnail: image,
      }
      : image;

    if (!result.original) {
      result.original = result.src;
    }
    if (!result.thumbnail) {
      result.thumbnail = result.original;
    }

    return result;
  }

  // ======================================================
  // MAIN RENDER
  // ======================================================
  render() {
    const {
      className,
      items,
      ...otherProps
    } = this.props;

    return items.length > 0 && (
      <div className={ `Carousel ${className || ''} ${items.length === 1 ? 'Carousel--oneImage' : ''}` }>
        <ReactCarousel
          showBullets={ true }
          items={ items.map((image) => this.getImageInfo(image)) }
          { ...otherProps }
        />
      </div>
    );
  }
}

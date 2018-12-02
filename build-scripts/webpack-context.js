const path = require('path');

const PARENT_WEBPACK_CONTEXT = require('@igs/front-core/build-scripts/webpack-context');

const CURRENT_FILE_PATH = __dirname;

function inFrontCoreComponentsProject(...args) {
  return path.resolve(CURRENT_FILE_PATH, '..', ...args);
}

module.exports = Object.assign(
  {},
  PARENT_WEBPACK_CONTEXT,
  {
    // appStyleConfig: require('../src/common/app-style/vars'),
    staticPaths: [
      ...PARENT_WEBPACK_CONTEXT.staticPaths,
      // абсолютные, чтобы другие проекты могли добавлять свои
      inFrontCoreComponentsProject('static')
    ]
  }
);

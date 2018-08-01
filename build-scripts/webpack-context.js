const path = require('path');

const PARENT_WEBPACK_CONTEXT = require('@reagentum/front-core/build-scripts/webpack-context');

const CURRENT_FILE_PATH = __dirname;

const useFromFrontCore = CURRENT_FILE_PATH.indexOf('node_modules') < 0;

function inFrontCoreComponentsProject(...args) {
  return path.resolve(CURRENT_FILE_PATH, '..', ...args);
}

const appStyleConfig = require(useFromFrontCore
  ? inFrontCoreComponentsProject('src/common/app-styles/vars.js')
  : inFrontCoreComponentsProject('lib/common/app-styles/vars.js')
);

module.exports = Object.assign(
  {},
  PARENT_WEBPACK_CONTEXT,
  {
    appStyleConfig,
    // appStyleConfig: require('../src/common/app-style/vars'),
    staticPaths: [
      ...PARENT_WEBPACK_CONTEXT.staticPaths,
      // абсолютные, чтобы другие проекты могли добавлять свои
      inFrontCoreComponentsProject('static')
    ]
  }
);

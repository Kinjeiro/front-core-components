const {
  getModulesStatic
} = require('@reagentum/front-core/build-scripts/utils/path-utils');
const PARENT_WEBPACK_CONTEXT = require('@reagentum/front-core/build-scripts/webpack-context');

const {
  inFrontCoreComponentsProject,
  inFrontCoreComponentsSrc
} = require('./coreComponents-utils');

const appStyleConfig = require(inFrontCoreComponentsSrc('common/app-styles/vars.js'));

module.exports = Object.assign(
  {},
  PARENT_WEBPACK_CONTEXT,
  {
    appStyleConfig,
    // appStyleConfig: require('../src/common/app-style/vars'),
    staticPaths: [
      ...PARENT_WEBPACK_CONTEXT.staticPaths,
      // абсолютные, чтобы другие проекты могли добавлять свои
      inFrontCoreComponentsProject('static'),
      ...getModulesStatic(inFrontCoreComponentsSrc())
    ]
  }
);

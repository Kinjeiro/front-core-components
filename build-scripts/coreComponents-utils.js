const path = require('path');

const { pathJoin } = require('@reagentum/front-core/build-scripts/utils/path-utils');

const PROCESS_PATH = process.cwd();
const CURRENT_FILE_PATH = __dirname;

// const useFromFrontCore = CURRENT_FILE_PATH.indexOf('node_modules') < 0;
const useFromFrontCoreComponents = CURRENT_FILE_PATH.indexOf(pathJoin(PROCESS_PATH, 'build-scripts')) >= 0;


function inFrontCoreComponentsProject(...args) {
  return path.resolve(CURRENT_FILE_PATH, '..', ...args);
}
function inFrontCoreComponentsSrc(...args) {
  return path.join(
    inFrontCoreComponentsProject(),
    useFromFrontCoreComponents ? 'src' : 'lib',
    ...args
  );
}

module.exports = {
  useFromFrontCoreComponents,
  inFrontCoreComponentsProject,
  inFrontCoreComponentsSrc
};

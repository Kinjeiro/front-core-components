const path = require('path');

const {
  extendDeep,
  loadFileConfigs
} = require('@reagentum/front-core/config/utils/configLib-utils');
const {
  inNodeModules,
  getI18nModules
} = require('@reagentum/front-core/build-scripts/utils/path-utils');

const {
  useFromFrontCoreComponents,
  inFrontCoreComponentsSrc
} = require('../build-scripts/coreComponents-utils');

const coreComponentsPackageJson = require(path.resolve(__dirname, '..', 'package.json'));

const parentConfigFinal = loadFileConfigs(inNodeModules('@reagentum/front-core/config'));

module.exports = extendDeep(
  // parent config
  parentConfigFinal,
  {
    // ======================================================
    // ОБЩИЕ КОНФИГИ для КЛИЕНТА И СЕРВЕРА
    // ======================================================
    common: {
      coreComponentsVersion: coreComponentsPackageJson.version,

      app: {
        isCoreComponents: useFromFrontCoreComponents
      },
      features: {
        i18n: {
          i18nextOptions: {
            // see \static\i18n\en\project.js
            ns: [
              ...parentConfigFinal.common.features.i18n.i18nextOptions.ns,
              'frontCore-components',
              ...getI18nModules(inFrontCoreComponentsSrc())
            ]
          }
        }
      }
    },

    // ======================================================
    // конфиги для КЛИЕНТА
    // ======================================================
    client: {
    },

    // ======================================================
    // конфиги для СЕРВЕРА
    // ======================================================
    server: {
      features: {
        // ======================================================
        // auth - настройки авторизации
        // ======================================================
        auth: {
        },

        mocking: {
          enable: true,
          // enable: false,
          useMocks: true,
          authMock: true
          // authMock: false
        }
      }
    }
  }
);


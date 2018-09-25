const {
  extendDeep,
  loadFileConfigs
} = require('config/lib/util');

const {
  inNodeModules,
  getI18nModules
} = require('@reagentum/front-core/build-scripts/utils/path-utils');

const {
  useFromFrontCoreComponents,
  inFrontCoreComponentsSrc,
} = require('../build-scripts/coreComponents-utils');

const parentConfigFinal = loadFileConfigs(inNodeModules('@reagentum/front-core/config'));

module.exports = extendDeep(
  // parent config
  parentConfigFinal,
  {
    // ======================================================
    // ОБЩИЕ КОНФИГИ для КЛИЕНТА И СЕРВЕРА
    // ======================================================
    common: {
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


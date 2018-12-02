const {
  extendDeep,
  loadFileConfigs
} = require('config/lib/util');

const { inNodeModules } = require('@igs/front-core/build-scripts/utils/path-utils');

module.exports = extendDeep(
  // parent config
  loadFileConfigs(inNodeModules('@igs/front-core/config')),
  {
    // ======================================================
    // ОБЩИЕ КОНФИГИ для КЛИЕНТА И СЕРВЕРА
    // ======================================================
    common: {
      features: {
        i18n: {
          i18nextOptions: {
            // see \static\i18n\en\project.js
            ns: ['core', 'frontCore-components'],
            language: 'ru',
            fallbackLng: 'ru'
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


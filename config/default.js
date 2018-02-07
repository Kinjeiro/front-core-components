const {
  extendDeep,
  loadFileConfigs
} = require('config/lib/util');

const { createEndpointServiceConfig } = require('@reagentum/front-core/config/utils/create-config');
const { inNodeModules } = require('@reagentum/front-core/build-scripts/utils/path-utils');

/* eslint-disable */
//const { createEndpointFactoryFromEnv } = require('@reagentum/front-core/config/create-config');
//const endpoint = createEndpointFactoryFromEnv();

const {
  /** Марафон при запуска автоматически добавляет адресс хоста в эту переменную */
  HOST,
  SERVICES_HOST,
  SERVICES_PORT,
  /** Первый запуск мидловых сервисов бывает до 20 сек*/
  REQUEST_TIMEOUT = 120000,
} = process.env;

module.exports = extendDeep(
  // parent config
  loadFileConfigs(inNodeModules('@reagentum/front-core/config')),
  {
    // ======================================================
    // ОБЩИЕ КОНФИГИ для КЛИЕНТА И СЕРВЕРА
    // ======================================================
    common: {
      features: {
        i18n: {
          i18nextOptions: {
            //see \static\i18n\en\project.js
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
        },
      },
    }
  }
);


const { createEndpointServiceConfig } = require('@reagentum/front-core/config/utils/create-config');

const {
  /** Марафон при запуска автоматически добавляет адресс хоста в эту переменную */
  HOST,
  SERVICES_HOST,
  SERVICES_PORT,
  REQUEST_TIMEOUT
} = process.env;

module.exports = {
  // ======================================================
  // ОБЩИЕ КОНФИГИ для КЛИЕНТА И СЕРВЕРА
  // ======================================================
  common: {
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
    // features: {
    //   mocking: {
    //     authMock: false
    //   }
    // },

    // endpointServices: {
      // middlewareApiService: createEndpointServiceConfig({
      //   host: HOST || SERVICES_HOST || '127.0.0.1',
      //   port: SERVICES_PORT || 37878,
      //   timeout: REQUEST_TIMEOUT
      // })
    // }
  }
};

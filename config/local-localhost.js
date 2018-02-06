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
    // endpointServices: {
    //   middlewareApiService: createEndpointServiceConfig({
    //     host: HOST || SERVICES_HOST || 'localhost',
    //     port: SERVICES_PORT || 37878,
    //     timeout: REQUEST_TIMEOUT
    //   })
    // }
  }
};

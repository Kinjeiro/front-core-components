// const { createEndpointServiceConfig } = require('@reagentum/front-core/config/utils/create-config');

module.exports = {
  // ======================================================
  // ОБЩИЕ КОНФИГИ для КЛИЕНТА И СЕРВЕРА
  // ======================================================
  common: {
    app: {
      // contextRoot: ''
    },

    features: {
      auth: {
        allowSignup: true,
        allowResetPasswordByEmail: true,
        emailAsLogin: true
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
    // endpointServices: {
    //   middlewareApiService: createEndpointServiceConfig({
    //     host: HOST || SERVICES_HOST || 'localhost',
    //     port: SERVICES_PORT || 37878,
    //     timeout: REQUEST_TIMEOUT
    //   })
    // }
  }
};

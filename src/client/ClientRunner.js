/* eslint-disable global-require */
import ParentClientRunner from '@reagentum/front-core/lib/client/CoreClientRunner';

export default class ClientRunner extends ParentClientRunner {
  getRoutes(store) {
    const moduleCreateRoutes = require('../common/create-routes').default;
    return moduleCreateRoutes(store);
  }

  hotReloadListeners() {
    super.hotReloadListeners();

    module.hot.accept('../common/create-routes', this.reloadUi);
  }
}

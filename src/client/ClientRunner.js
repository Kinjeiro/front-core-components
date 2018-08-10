/* eslint-disable global-require */
import ParentClientRunner from '@reagentum/front-core/lib/client/CoreClientRunner';

// ======================================================
// PROJECT
// ======================================================
import { initComponents } from '../common/get-components';

export default class ClientRunner extends ParentClientRunner {
  initComponents(COMPONENTS_BASE) {
    super.initComponents(COMPONENTS_BASE);
    return initComponents(COMPONENTS_BASE);
  }

  getRoutes(store) {
    const moduleCreateRoutes = require('../common/create-routes').default;
    return moduleCreateRoutes(store);
  }

  hotReloadListeners() {
    super.hotReloadListeners();
    module.hot.accept('../common/create-routes', this.reloadUi);
  }
}

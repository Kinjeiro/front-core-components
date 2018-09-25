/* eslint-disable global-require */
import ParentClientRunner from '@reagentum/front-core/lib/client/CoreClientRunner';

// ======================================================
// PROJECT
// ======================================================
import { initComponents } from '../common/get-components';

export default class ClientRunner extends ParentClientRunner {
  loadCommonSubModulesContexts() {
    return [
      ...super.loadCommonSubModulesContexts(),
      require.context('../modules', true, /^\.\/(.*)\/common\/index\.js/gi),
    ];
  }

  initComponents(COMPONENTS_BASE) {
    super.initComponents(COMPONENTS_BASE);
    return initComponents(COMPONENTS_BASE);
  }
}

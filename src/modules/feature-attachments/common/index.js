import SubModuleFactory from '@reagentum/front-core/lib/modules/SubModuleFactory';

import MODULE_NAME from './module-name';

import { initComponents } from './get-components';

export default SubModuleFactory.createCommonSubModule({
  MODULE_NAME,
  initComponents,

  getApi: () => require('./api-attachments'),
  getRootReducers: () => require('./redux-module-attachments').default,

  hotReloadFunc: (reloadUi, reloadStore, reloadAll) => {
    module.hot.accept('./api-attachments', reloadAll);
    module.hot.accept('./redux-module-attachments', reloadStore);
  },
});

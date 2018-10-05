import SubModuleFactory from '@reagentum/front-core/lib/modules/SubModuleFactory';

import MODULE_NAME from './module-name';

import { initComponents } from './get-components';

import * as reduxSelectors from './redux-selectors-sidebar';

export default SubModuleFactory.createCommonSubModule({
  MODULE_NAME,
  initComponents,

  getRootReducers: () => require('./redux-module-sidebar').default,
  reduxSelectors,
  reduxActions: (api) => {
    const redux = require('./redux-sidebar');
    return api ? redux.getBindActions(api) : redux.actions;
  },

  hotReloadFunc: (reloadUi, reloadStore, reloadAll) => {
    module.hot.accept('./redux-module-sidebar', reloadStore);
    module.hot.accept('./redux-sidebar', reloadStore);
  },
});

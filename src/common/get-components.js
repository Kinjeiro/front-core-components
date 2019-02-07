let CB = null;

import clientConfig from '@reagentum/front-core/lib/common/client-config';

export function initComponents(COMPONENTS_BASE) {
  // todo @ANKU @LOW - как нибудь запихнуть в модули
  require('./app-styles/init.scss');

  // ======================================================
  // CONTAINERS
  // ======================================================
  if (clientConfig.common.app.isCoreComponents) {
    COMPONENTS_BASE.replace('TestPage', () => require('./containers/TestPage/TestPage').default);
    COMPONENTS_BASE.replace('TestLayout', () => require('./containers/TestLayout/TestLayout').default);
  }

  CB = COMPONENTS_BASE;
  return COMPONENTS_BASE;
}

export default function getComponentsBase() {
  return CB;
}

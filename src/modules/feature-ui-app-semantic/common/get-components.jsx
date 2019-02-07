let CB = null;

export function initComponents(COMPONENTS_BASE) {
  // ======================================================
  // COMPONENTS
  // ======================================================
  COMPONENTS_BASE.replace('AppHeader', () => require('./components/AppHeader/AppHeader').default);
  COMPONENTS_BASE.replace('Breadcrumbs', () => require('./components/Breadcrumbs/Breadcrumbs').default);
  COMPONENTS_BASE.replace('ScrollNavigation', () => require('./components/ScrollNavigation/ScrollNavigation').default);
  COMPONENTS_BASE.replace('ToggledAddData', () => require('./components/ToggledAddData/ToggledAddData').default);
  COMPONENTS_BASE.replace('TwoColumnMobileRow', () => require('./components/TwoColumnMobileRow/TwoColumnMobileRow').default);
  COMPONENTS_BASE.replace('UpBottomButtons', () => require('./components/UpBottomButtons/UpBottomButtons').default);

  // ======================================================
  // CONTAINERS
  // ======================================================
  COMPONENTS_BASE.replace('ContextHeaderProvider', () => require('./contexts/ContextHeader/ContextHeaderProvider').default);
  COMPONENTS_BASE.replace('AppLayout', () => require('./containers/AppLayout/AppLayout').default);

  CB = COMPONENTS_BASE;
  return COMPONENTS_BASE;
}

export default function getComponents() {
  return CB;
}

let CB = null;

export function initComponents(COMPONENTS_BASE) {
  // ======================================================
  // COMPONENTS
  // ======================================================
  COMPONENTS_BASE.replace('Sidebar', () => require('semantic-ui-react').Sidebar);
  COMPONENTS_BASE.replace('AppSidebar', () => require('./containers/AppSidebar/AppSidebar').default);

  CB = COMPONENTS_BASE;
  return COMPONENTS_BASE;
}

export default function getComponents() {
  return CB;
}

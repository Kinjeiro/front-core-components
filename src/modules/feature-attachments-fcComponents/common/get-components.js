let CB = null;

export function initComponents(COMPONENTS_BASE) {
  // ======================================================
  // FORM
  // ======================================================
  COMPONENTS_BASE.replace('Attachment', () => require('./components/form/Attachment/Attachment').default);

  // ======================================================
  // CONTAINERS
  // ======================================================
  COMPONENTS_BASE.replace('InstanceAttachment', () => require('./containers/InstanceAttachment').default);

  CB = COMPONENTS_BASE;
  return COMPONENTS_BASE;
}

export default function getComponents() {
  return CB;
}

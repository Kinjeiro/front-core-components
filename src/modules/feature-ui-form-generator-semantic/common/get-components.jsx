let CB = null;

export function initComponents(COMPONENTS_BASE) {
  CB = COMPONENTS_BASE;
  return COMPONENTS_BASE;
}

export default function getComponents() {
  return CB;
}

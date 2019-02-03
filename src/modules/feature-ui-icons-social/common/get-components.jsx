let CB = null;

export function initComponents(COMPONENTS_BASE) {
  // ======================================================
  // COMPONENTS
  // ======================================================
  COMPONENTS_BASE.replace('VkIcon', () => require('./components/icons/social/VkIcon/VkIcon').default);
  COMPONENTS_BASE.replace('FacebookIcon', () => require('./components/icons/social/FacebookIcon/FacebookIcon').default);
  COMPONENTS_BASE.replace('InstagramIcon', () => require('./components/icons/social/InstagramIcon/InstagramIcon').default);
  COMPONENTS_BASE.replace('TelegramIcon', () => require('./components/icons/social/TelegramIcon/TelegramIcon').default);
  COMPONENTS_BASE.replace('TwitterIcon', () => require('./components/icons/social/TwitterIcon/TwitterIcon').default);

  CB = COMPONENTS_BASE;
  return COMPONENTS_BASE;
}

export default function getComponents() {
  return CB;
}

let CB = null;

export function initComponents(COMPONENTS_BASE) {
  // ======================================================
  // from FRONT_CORE
  // ======================================================
  // COMPONENTS_BASE.replace('Button', () => require('./components/Button/Button').default);
  COMPONENTS_BASE.replace('ButtonView', () => require('./components/Button/ButtonView').default);
  COMPONENTS_BASE.replace('SimpleButton', () => require('./components/SimpleButton/SimpleButton').default);

  COMPONENTS_BASE.replace('Image', () => require('semantic-ui-react').Image);
  COMPONENTS_BASE.replace('Icon', () => require('semantic-ui-react').Icon);
  // COMPONENTS_BASE.replace('ActionStatus', () => require('./components/ActionStatus/ActionStatus').default);

  // todo @ANKU @LOW - подправить стили модалки, коравская более красивая на flex
  // COMPONENTS_BASE.replace('Modal', () => require('./Modal/Modal').default);

  // COMPONENTS_BASE.replace('ErrorBoundary', () => require('./components/ErrorBoundary/ErrorBoundary').default);
  // COMPONENTS_BASE.replace('ListItem', () => require('./components/ListItem/ListItem').default);
  COMPONENTS_BASE.replace('Loading', () => require('./components/Loading/Loading').default);
  // COMPONENTS_BASE.replace('MediaQuery', () => require('./components/MediaQuery/MediaQuery').default);
  // COMPONENTS_BASE.replace('Notifications', () => require('./components/Notifications/Notifications').default);
  COMPONENTS_BASE.replace('Notice', (PrevClass) => require('./components/Notice/Notice').default(PrevClass), true);
  // COMPONENTS_BASE.replace('ReadMore', () => require('./components/ReadMore/ReadMore').default);
  // COMPONENTS_BASE.replace('UniError', () => require('./components/UniError/UniError').default);
  // COMPONENTS_BASE.replace('UnescapedHtml', () => require('./components/UnescapedHtml/UnescapedHtml').default);
  // COMPONENTS_BASE.replace('ErrorLabel', () => require('./components/ErrorLabel/ErrorLabel').default);
  COMPONENTS_BASE.replace('Segment', () => require('./components/Segment/Segment').default);
  COMPONENTS_BASE.replace('Hint', () => require('./components/Hint/Hint').default);

  // ======================================================
  // NEW
  // ======================================================
  COMPONENTS_BASE.replace('Label', () => require('semantic-ui-react').Label);
  COMPONENTS_BASE.replace('Header', () => require('semantic-ui-react').Header);
  COMPONENTS_BASE.replace('Tabs', () => require('./components/Tabs/Tabs').default);
  COMPONENTS_BASE.replace('Container', () => require('semantic-ui-react').Container);
  COMPONENTS_BASE.replace('Dimmer', () => require('semantic-ui-react').Dimmer);
  COMPONENTS_BASE.replace('Menu', () => require('semantic-ui-react').Menu);
  COMPONENTS_BASE.replace('Message', () => require('semantic-ui-react').Message);
  // COMPONENTS_BASE.replace('Sidebar', () => require('semantic-ui-react').Sidebar);
  COMPONENTS_BASE.replace('Search', () => require('semantic-ui-react').Search);
  COMPONENTS_BASE.replace('Card', () => require('semantic-ui-react').Card);
  COMPONENTS_BASE.replace('Popup', () => require('semantic-ui-react').Popup);
  COMPONENTS_BASE.replace('Carousel', () => require('./components/Carousel/Carousel').default);

  COMPONENTS_BASE.replace('UniTable', () => require('./components/UniTable/UniTable').default);
  COMPONENTS_BASE.replace('Pagination', () => require('./components/Pagination/Pagination').default);

  CB = COMPONENTS_BASE;
  return COMPONENTS_BASE;
}

export default function getComponents() {
  return CB;
}

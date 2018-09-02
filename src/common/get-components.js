let CB = null;

export function initComponents(COMPONENTS_BASE) {
  require('./app-styles/init.scss');

  COMPONENTS_BASE.replace('BaseButton', () => require('./components/Button/Button').default);
  COMPONENTS_BASE.replace('AppHeader', () => require('./components/AppHeader/AppHeader').default);
  COMPONENTS_BASE.replace('Loading', () => require('./components/Loading/Loading').default);
  // todo @ANKU @LOW - подправить стили модалки, коравская более красивая на flex
  // COMPONENTS_BASE.replace('Modal', () => require('./Modal/Modal').default);
  COMPONENTS_BASE.replace('Notice', () => require('./components/Notice/Notice').default);
  COMPONENTS_BASE.replace('Segment', () => require('./components/Segment/Segment').default);
  COMPONENTS_BASE.replace('Tabs', () => require('./components/Tabs/Tabs').default);
  COMPONENTS_BASE.replace('UniTable', () => require('./components/UniTable/UniTable').default);
  COMPONENTS_BASE.replace('UpBottomButtons', () => require('./components/UpBottomButtons/UpBottomButtons').default);
  COMPONENTS_BASE.replace('Container', () => require('semantic-ui-react').Container);
  COMPONENTS_BASE.replace('Dimmer', () => require('semantic-ui-react').Dimmer);
  COMPONENTS_BASE.replace('Menu', () => require('semantic-ui-react').Menu);
  COMPONENTS_BASE.replace('Icon', () => require('semantic-ui-react').Icon);
  COMPONENTS_BASE.replace('Sidebar', () => require('semantic-ui-react').Sidebar);
  COMPONENTS_BASE.replace('Label', () => require('semantic-ui-react').Label);
  COMPONENTS_BASE.replace('Image', () => require('semantic-ui-react').Image);
  COMPONENTS_BASE.replace('Search', () => require('semantic-ui-react').Search);
  COMPONENTS_BASE.replace('Card', () => require('semantic-ui-react').Card);
  COMPONENTS_BASE.replace('Pagination', () => require('./components/Pagination/Pagination').default);

  // ======================================================
  // FORM
  // ======================================================
  // todo @ANKU @LOW - их ний input своим ui.input input все стили для fieldLaout перебивает + error не срабатывает
  // COMPONENTS_BASE.replace('BaseInput', () => require('semantic-ui-react').Input);
  // COMPONENTS_BASE.replace('BaseNumberInput', () => require('semantic-ui-react').Input);
  COMPONENTS_BASE.replace('BaseTextArea', () => require('./components/Form/semantic-ui/BaseTextArea/BaseTextArea').default);
  COMPONENTS_BASE.replace('BaseSelect', () => require('./components/Form/semantic-ui/BaseSelect/BaseSelect').default);
  COMPONENTS_BASE.replace('DatePicker', () => require('./components/Form/DatePicker/DatePicker').default);
  COMPONENTS_BASE.replace('Attachment', () => require('./components/Form/Attachment/Attachment').default);
  COMPONENTS_BASE.replace('Checkbox', () => require('semantic-ui-react').Checkbox);
  COMPONENTS_BASE.replace('Radio', () => require('semantic-ui-react').Radio);
  COMPONENTS_BASE.replace('ErrorLabel', () => require('./components/Form/ErrorLabel/ErrorLabel').default);

  // ======================================================
  // CONTAINERS
  // ======================================================
  COMPONENTS_BASE.replace('AppLayout', () => require('./containers/AppLayout/AppLayout').default);

  // ======================================================
  // MODULE AUTH
  // ======================================================
  // COMPONENTS_BASE.addClassName('AuthLayout', 'TestClass');
  // COMPONENTS_BASE.wrap('AuthFormLayout', () => require('../modules/module-auth/AuthFormLayoutExt').default);
  // COMPONENTS_BASE.addClassName('AuthFormLayout', () => {
  //   require('../modules/module-auth/AuthFormLayoutExt.scss');
  //   return 'AuthFormLayoutExt';
  // });

  CB = COMPONENTS_BASE;
  return COMPONENTS_BASE;
}

export default function getComponentsBase() {
  return CB;
}

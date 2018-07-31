export default function initComponents(COMPONENTS_BASE) {
  COMPONENTS_BASE.replace('Button', () => require('./Button/Button').default);
  COMPONENTS_BASE.replace('Header', () => require('./Header/Header').default);
  COMPONENTS_BASE.replace('Loading', () => require('./Loading/Loading').default);
  COMPONENTS_BASE.replace('Modal', () => require('./Modal/Modal').default);
  // replace
  COMPONENTS_BASE.replace('Notice', () => require('./Notice/Notice').default);
  COMPONENTS_BASE.replace('Segment', () => require('./Segment/Segment').default);
  COMPONENTS_BASE.replace('Tabs', () => require('./Tabs/Tabs').default);
  COMPONENTS_BASE.replace('UniTable', () => require('./UniTable/UniTable').default);
  COMPONENTS_BASE.replace('UpBottomButtons', () => require('./UpBottomButtons/UpBottomButtons').default);

  // ======================================================
  // FORM
  // ======================================================
  COMPONENTS_BASE.replace('BaseInput', () => require('semantic-ui-react').Input);
  COMPONENTS_BASE.replace('BaseNumberInput', () => require('semantic-ui-react').Input);
  COMPONENTS_BASE.replace('BaseTextArea', () => require('./Form/semantic-ui/BaseTextArea/BaseTextArea').default);
  COMPONENTS_BASE.replace('BaseSelect', () => require('./Form/semantic-ui/BaseSelect/BaseSelect').default);
  COMPONENTS_BASE.replace('DatePicker', () => require('./Form/DatePicker/DatePicker').default);
  COMPONENTS_BASE.replace('Attachment', () => require('./Form/Attachment/Attachment').default);
  COMPONENTS_BASE.replace('Checkbox', () => require('semantic-ui-react').Checkbox);
  COMPONENTS_BASE.replace('Radio', () => require('semantic-ui-react').Radio);
  COMPONENTS_BASE.replace('ErrorLabel', () => require('./Form/ErrorLabel/ErrorLabel').default);

  // ======================================================
  // MODULE AUTH
  // ======================================================
  // COMPONENTS_BASE.addClassName('AuthLayout', 'TestClass');
  COMPONENTS_BASE.wrap('AuthFormLayout', () => require('../modules/module-auth/AuthFormLayoutExt').default);

  return COMPONENTS_BASE;
}

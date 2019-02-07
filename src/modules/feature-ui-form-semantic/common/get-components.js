let CB = null;

export function initComponents(COMPONENTS_BASE) {
  require('./form-semantic-fix.scss');

  // ======================================================
  // FORM
  // ======================================================
  // todo @ANKU @LOW - ихний input своим ui.input input все стили для fieldLaout перебивает + error не срабатывает
  // COMPONENTS_BASE.replace('BaseInput', () => require('semantic-ui-react').Input);
  // COMPONENTS_BASE.replace('BaseNumberInput', () => require('semantic-ui-react').Input);
  COMPONENTS_BASE.replace('BaseTextArea', () => require('./components/TextArea/BaseTextArea').default);
  COMPONENTS_BASE.replace('BaseSelect', () => require('./components/Select/BaseSelect').default);
  COMPONENTS_BASE.replace('DatePicker', () => require('./components/DatePicker/DatePicker').default);

  // COMPONENTS_BASE.replace('Attachment', () => require('../modules/feature-attachments/common/subModule/components/form/Attachment/Attachment').default);
  COMPONENTS_BASE.wrap('AttachmentView', () => require('./components/Attachment/AttachmentViewWrapper').default);
  COMPONENTS_BASE.wrap('AttachmentUploadControl', () => require('./components/Attachment/AttachmentUploadControl').default);
  COMPONENTS_BASE.addInitCallback('AttachmentItemView', () => require('./components/Attachment/AttachmentItem/AttachmentItemView.scss'));

  COMPONENTS_BASE.replace('Checkbox', () => require('./components/Checkbox/Checkbox').default);

  // ======================================================
  // NEW
  // ======================================================
  COMPONENTS_BASE.replace('Radio', () => require('./components/Radio/Radio').default);
  COMPONENTS_BASE.replace('AmountInput', () => require('./components/AmountInput/AmountInput').default);
  COMPONENTS_BASE.replace('TreeSelect', () => require('./components/TreeSelect/TreeSelect').default);

  CB = COMPONENTS_BASE;
  return COMPONENTS_BASE;
}

export default function getComponents() {
  return CB;
}

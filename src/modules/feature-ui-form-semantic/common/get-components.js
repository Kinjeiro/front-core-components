let CB = null;

export function initComponents(COMPONENTS_BASE) {
  require('./form-semantic-fix.scss');

  // ======================================================
  // FORM replace
  // ======================================================
  COMPONENTS_BASE.replace('FormView', () => require('semantic-ui-react').Form);

  // todo @ANKU @LOW - ихний input своим ui.input input все стили для fieldLaout перебивает + error не срабатывает
  // COMPONENTS_BASE.replace('BaseInput', () => require('semantic-ui-react').Input);
  // COMPONENTS_BASE.replace('BaseNumberInput', () => require('semantic-ui-react').Input);
  COMPONENTS_BASE.replace('BaseTextArea', () => require('./components/fields/TextArea/BaseTextArea').default);

  COMPONENTS_BASE.replace('SelectView', () => require('./components/fields/Select/SelectView').default);
  COMPONENTS_BASE.replace('CheckboxView', () => require('./components/fields/Checkbox/CheckboxView').default);

  COMPONENTS_BASE.replace('DatePicker', () => require('./components/fields/DatePicker/DatePicker').default);

  // COMPONENTS_BASE.replace('Attachment', () => require('../modules/feature-attachments/common/subModule/components/form/Attachment/Attachment').default);
  COMPONENTS_BASE.wrap('AttachmentView', () => require('./components/fields/Attachment/AttachmentViewWrapper').default);
  COMPONENTS_BASE.wrap('AttachmentUploadControl', () => require('./components/fields/Attachment/AttachmentUploadControl').default);
  COMPONENTS_BASE.addInitCallback('AttachmentItemView', () => require('./components/fields/Attachment/AttachmentItem/AttachmentItemView.scss'));


  // ======================================================
  // NEW
  // ======================================================
  COMPONENTS_BASE.replace('Radio', () => require('./components/fields/Radio/Radio').default);
  COMPONENTS_BASE.replace('AmountInput', () => require('./components/fields/AmountInput/AmountInput').default);
  COMPONENTS_BASE.replace('TreeSelect', () => require('./components/fields/TreeSelect/TreeSelect').default);

  CB = COMPONENTS_BASE;
  return COMPONENTS_BASE;
}

export default function getComponents() {
  return CB;
}

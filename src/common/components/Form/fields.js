import omit from 'lodash/omit';
import {
  Radio,
  Checkbox,
} from 'semantic-ui-react';

import semanticFieldWrapper from './semantic-field-wrapper';

import InputWithState from './InputWithState/InputWithState';
import TextAreaWithState from './TextAreaWithState/TextAreaWithState';

import getComponents from '../../get-components';

const {
  Select,
  DatePicker,
  Attachment,
} = getComponents();

require('./fields.scss');

export const SelectField = semanticFieldWrapper(Select, {
  supportOutLabel: true,
});
export const InputField = semanticFieldWrapper(InputWithState, {
  supportOutLabel: true,
});
export const TextAreaField = semanticFieldWrapper(TextAreaWithState, {
  supportOutLabel: true,
});
export const DateRangeField = semanticFieldWrapper(DatePicker, {
  supportOutLabel: true,
});

export const RadioField = semanticFieldWrapper(Radio, {
  componentPropsFn: ({ label, radioValue }) => ({
    // label: <label>{ label }</label>,
    // checked: radioValue,
    // onChange: (event, data) => {
    //   if (data.checked) {
    //     input.onChange(radioValue);
    //   }
    // },
  }),
  clearPropsFn: (resultProps) => omit(resultProps, [
    'error', 'radioValue', 'onBlur', 'onFocus',
  ]),
});
export const AttachmentField = semanticFieldWrapper(Attachment, {
  supportOutLabel: true,
});

export const CheckboxField = semanticFieldWrapper(Checkbox, {
  componentPropsFn: ({ value }) => ({
    checked: !!value,
  }),
  clearPropsFn: (resultProps) => omit(resultProps, [
    'error', 'value',
  ]),
});

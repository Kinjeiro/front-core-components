import semanticFieldWrapper from './semantic-field-wrapper';

import Select from './SelectFix/SelectFix';
import InputWithState from './InputWithState/InputWithState';
import TextAreaWithState from './TextAreaWithState/TextAreaWithState';
import DatePicker from './DatePicker/DatePicker';

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

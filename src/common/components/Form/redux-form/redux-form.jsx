/* eslint-disable react/prop-types,jsx-a11y/label-has-for */
import omit from 'lodash/omit';
import React from 'react';
import {
  Form,
  // Label,
  Input as InputComponent,
  Radio as RadioComponent,
  Checkbox as CheckboxComponent,
  // Select as SelectComponent,
  TextArea as TextAreaComponent,
  // Dropdown as DropdownComponent,
} from 'semantic-ui-react';

import SelectFix from '../SelectFix/SelectFix';
import Labeled from '../Labeled/Labeled';
import ErrorLabel from '../ErrorLabel/ErrorLabel';
import DatePicker from '../DatePicker/DatePicker';

// import './Form.scss';
import FileInput from '../FileInput/FileInput';

import reduxFormSemanticWrapper from '../semantic-field-wrapper';

// export Input from './input';
// export Select from './select';
export RadioGroup from './RadioGroup';

// todo @ANKU @LOW @toCore - в компнентную базу коры

export const LabelField = reduxFormSemanticWrapper(Labeled, {
  supportOutLabel: true,
});

export const InputField = reduxFormSemanticWrapper(InputComponent, {
  supportOutLabel: true,
  componentPropsFn: ({ input }) => ({
    onChange: (param, data) => input.onChange(data.value),
  }),
});
export const Input = InputField;

export const TextAreaField = reduxFormSemanticWrapper(TextAreaComponent, {
  supportOutLabel: true,
  clearPropsFn: (resultProps) => omit(resultProps, [
    'error',
  ]),
});



export const SelectField = reduxFormSemanticWrapper(SelectFix, {
  componentPropsFn: ({ input }) => ({
    onChange: (event, data) => input.onChange(data.value),
  }),
});


export const ToggleField = reduxFormSemanticWrapper(RadioComponent, {
  componentPropsFn: ({ input, defaultChecked }) => ({
    toggle: true,
    checked: !!input.value,
    defaultChecked,
    onClick: (event, data) => input.onChange(!data.checked),
  }),
});

export const RadioField = reduxFormSemanticWrapper(RadioComponent, {
  componentPropsFn: ({ input, label, radioValue }) => ({
    label: <label>{ label }</label>,
    checked: input.value === radioValue,
    onChange: (event, data) => {
      if (data.checked) {
        input.onChange(radioValue);
      }
    },
  }),
  clearPropsFn: (resultProps) => omit(resultProps, [
    'error', 'radioValue', 'onBlur', 'onFocus',
  ]),
});



// export const CheckboxField = ({ input, label, meta: { touched, error }, ...custom }) => (
//   <Form.Field
//     control={ CheckboxComponent }
//     label={ <label>{ label }</label> }
//     checked={ !!input.value }
//     onClick={ (event, data) => input.onChange(data.checked) }
//     { ...custom }
//   />
// );
export const CheckboxField = reduxFormSemanticWrapper(CheckboxComponent, {
  componentPropsFn: ({ input, label, radioValue }) => ({
    label: <label>{ label }</label>,
    checked: !!input.value,
    onChange: (event, data) => {
      if (data.checked) {
        input.onChange(radioValue);
      }
    },
    onClick: (event, data) => input.onChange(data.checked),
  }),
  clearPropsFn: (resultProps) => omit(resultProps, [
    'error', 'value',
  ]),
});


// export const Range = ({ input, min, max, required, meta: { touched, error }, ...rest }) => (
//   <input
//     type="range"
//     required={ required }
//     min={ min }
//     max={ max }
//     { ...input }
//     { ...rest }
//   />
// );
// export const RangeField = ({ input, label, min, max, required, meta: { touched, error }, ...rest }) => (
//   <Form.Field
//     error={ !!(touched && error) }
//     required={ required }
//   >
//     <label>{label} : {input.value}</label>
//     <input
//       type="range"
//       required={ required }
//       min={ min }
//       max={ max }
//       { ...input }
//       { ...rest }
//     />
//     <ErrorLabel
//       touched={ touched }
//       error={ error }
//     />
//   </Form.Field>
// );



//
// export const Dropdown = ({ input, required, options, meta: { touched, error }, ...rest }) => (
//   <DropdownComponent
//     search={ true }
//     value={ input.value }
//     required={ required }
//     options={ options }
//     onChange={ (event, data) => input.onChange(data.value) }
//     { ...rest }
//   />
// );
// export const DropdownField = ({ input, label, required, options, meta: { touched, error }, ...custom }) => (
//   <Form.Field
//     error={ !!(touched && error) }
//     required={ required }
//   >
//     <label>{label}</label>
//     <DropdownComponent
//       search={ true }
//       value={ input.value }
//       required={ required }
//       options={ options }
//       onChange={ (event, data) => input.onChange(data.value) }
//       { ...custom }
//     />
//     <ErrorLabel
//       touched={ touched }
//       error={ error }
//     />
//   </Form.Field>
// );

export const FileInputField = ({ input, label, required, options, meta: { touched, error }, ...custom }) => (
  <Form.Field
    error={ !!(touched && error) }
    required={ required }
  >
    <FileInput
      { ...{
        value: input.value,
        inputProps: input,
        onBlur: input.onBlur.bind(input),
        onChange: input.onChange.bind(input),

        label,
        required,
        options,
        meta: {
          touched, error,
        },
        ...custom,
      } }
    />
  </Form.Field>
);

export const DatePickerField = reduxFormSemanticWrapper(DatePicker, {
  supportOutLabel: true,
  clearPropsFn: (resultProps) => omit(resultProps, [
    'error', 'label', 'onBlur', 'onDragStart', 'onDrop', 'onFocus',
  ]),
});

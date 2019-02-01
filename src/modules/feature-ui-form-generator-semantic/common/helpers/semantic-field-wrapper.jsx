import React from 'react';

import {
  Form,
} from 'semantic-ui-react';

import ErrorLabel from '../components/ErrorLabel/ErrorLabel';

export default function reduxFormSemanticWrapper(Component, {
  wrapIntoFormField = true,
  errorLabel = true,
  componentPropsFn = null,
  clearPropsFn = null,
  supportOutLabel = false,
} = {}) {
  return (props) => {
    // ======================================================
    // PARSING
    // ======================================================
    const {
      // для redux-form
      input,
      meta: { touched, error } = {},

      label,
      required,
      ...outerProps
    } = props;

    const showError = touched && !!error;

    const innerProps = {
      error: showError,
      required,
      label: supportOutLabel ? undefined : label,
      ...input,
    };

    const componentProps = componentPropsFn ? componentPropsFn(props) : {};

    let resultProps = {
      ...innerProps,
      ...componentProps,
      ...outerProps,
    };


    // ======================================================
    // RESULT PROPS
    // ======================================================
    const {
      readOnly,
      disabled,
      checked,
      hideOnEmpty,
      value,
      readOnlyAsText,
    } = resultProps;

    // в режиме readOnly или disabled если нет значения - не показывать
    const editable = !readOnly && !disabled;
    const hasValue = typeof checked !== 'undefined'
      ? checked
      : !!value;

    // скрываем если пустой
    if (hideOnEmpty && !editable && !hasValue) {
      // return (
      //   <div className="FormField--hideOnEmpty" />
      // );
      return null;
    }
    delete resultProps.hideOnEmpty;
    delete resultProps.readOnlyAsText;

    // очищаем от лишних мета полей
    if (clearPropsFn) {
      resultProps = clearPropsFn(resultProps);
    }


    // ======================================================
    // RENDER
    // ======================================================
    let resultComponent = (
      <Component { ...resultProps } />
    );

    if (wrapIntoFormField) {
      resultComponent = (
        <Form.Field
          error={ showError }
          required={ required }
        >
          { supportOutLabel && label && (
            <label>{label}</label>
          ) }

          {
            (readOnly || disabled) && readOnlyAsText
            ? value
            : resultComponent
          }

          { errorLabel && showError && (
            <ErrorLabel
              touched={ touched }
              error={ error }
            />
          ) }
        </Form.Field>
      );
    } else if (supportOutLabel || errorLabel) {
      resultComponent = (
        <div>
          { supportOutLabel && label && (
            <label>{label}</label>
          ) }

          { resultComponent }

          { errorLabel && showError && (
            <ErrorLabel
              touched={ touched }
              error={ error }
            />
          ) }
        </div>
      );
    }

    return resultComponent;
  };
}

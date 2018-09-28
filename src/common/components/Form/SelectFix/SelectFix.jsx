import omit from 'lodash/omit';

import React from 'react';
import { Form } from 'semantic-ui-react';

import './SelectFix.scss';

export default function SelectFix(props) {
  const {
    label,
    readOnly,
  } = props;

  return readOnly
  ? (
    <div className="SelectFix">
      {
        label && (
          <label>{ label }</label>
        )
      }
      <input
        { ...omit(props, ['options', 'fluid', 'search', 'error', 'selection']) }
      />
    </div>
  )
  : (
    <Form.Select { ...props } />
  );
}

import React, { PureComponent } from 'react';

import PROP_TYPES from '@reagentum/front-core/lib/modules/feature-ui-form/common/subModule/components/fields/Attachment/attachment-view-props';

// ======================================================
// MODULE
// ======================================================
import getComponents from '../../get-components';

const {
  Button,
} = getComponents();

export default class AttachmentUploadControl extends PureComponent {
  static propTypes = PROP_TYPES;

  render() {
    const {
      readOnly,
      hasMaxValues,
      isProcessing,

      addButtonText,

      openUploadDialogFn,
    } = this.props;

    // required={ required }

    return (
      <div className="AttachmentUploadControl">
        <Button
          className="AttachmentUploadControl__addButton"
          disabled={ readOnly || hasMaxValues }
          loading={ isProcessing }

          onClick={ openUploadDialogFn }
        >
          { addButtonText }
        </Button>
      </div>
    );
  }
}

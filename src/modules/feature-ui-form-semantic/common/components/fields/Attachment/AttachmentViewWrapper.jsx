/* eslint-disable react/sort-comp,comma-dangle,max-len */
import React from 'react';
import PropTypes from 'prop-types';
import bind from 'lodash-decorators/bind';
import Dropzone from 'react-dropzone';

import PROPS from '@reagentum/front-core/lib/modules/feature-ui-form/common/subModule/components/fields/Attachment/attachment-view-props';

// ======================================================
// MODULE
// ======================================================
require('./AttachmentViewWrapper.scss');

export default class AttachmentViewWrapper extends React.Component {
  static propTypes = {
    ...PROPS,
    // accept: PropTypes.string,
    // children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    // disableClick: PropTypes.bool,
    // disabled: PropTypes.bool,
    // disablePreview: PropTypes.bool,
    // preventDropOnDocument: PropTypes.bool,
    // inputProps: PropTypes.object,
    // multiple: PropTypes.bool,
    // name: PropTypes.string,
    // maxSize: PropTypes.number,
    // minSize: PropTypes.number,
    // className: PropTypes.string,
    // activeClassName: PropTypes.string,
    // acceptClassName: PropTypes.string,
    // rejectClassName: PropTypes.string,
    // disabledClassName: PropTypes.string,
    // style: PropTypes.object,
    // activeStyle: PropTypes.object,
    // acceptStyle: PropTypes.object,
    // rejectStyle: PropTypes.object,
    // disabledStyle: PropTypes.object,
    // onClick: PropTypes.func,
    // onDrop: PropTypes.func,
    // onDropAccepted: PropTypes.func,
    // onDropRejected: PropTypes.func,
    // onDragStart: PropTypes.func,
    // onDragEnter: PropTypes.func,
    // onDragOver: PropTypes.func,
    // onDragLeave: PropTypes.func,
    // onFileDialogCancel: PropTypes.func,
    // ...Dropzone.propTypes,
    /**
     * https://react-dropzone.netlify.com/#proptypes
     maxSize
     */
    dropZoneProps: PropTypes.shape(Dropzone.propTypes),
  };

  // ======================================================
  // HANDLERS
  // ======================================================
  @bind()
  handleRef(node) {
    this.dropzoneRef = node;
  }

  @bind()
  handleOpenUploadDialog() {
    this.dropzoneRef.open();
  }

  @bind()
  handleDropOrClick(acceptedFiles, rejectedFiles, event) {
    const {
      onAdd,
    } = this.props;

    let addedFiles;
    if (event.type === 'drop') {
      if (acceptedFiles.length) {
        // convert FileList or [File] to array
        addedFiles = [...((event.dataTransfer && event.dataTransfer.files) || acceptedFiles)];
      } else {
        addedFiles = [];
      }
    } else if (event.type === 'change') {
      addedFiles = [...event.target.files];
    } else {
      addedFiles = event;
    }

    return onAdd(addedFiles, event);
  }

  // ======================================================
  // MAIN RENDER
  // ======================================================
  render() {
    const {
      editable,
      readOnly,
      multiple,
      accept,
      constraints: {
        maxBytes,
        minBytes,
      },
      dropzoneText,
      children,

      dropZoneProps,
    } = this.props;

    let component = children;

    if (editable) {
      component = (
        <Dropzone
          ref={ this.handleRef }
          className="Attachment__dropzone AttachmentDropzone"
          activeClassName="AttachmentDropzone--active"
          disabled={ readOnly || !editable }
          multiple={ multiple }
          disableClick={ true }
          maxSize={ maxBytes }
          minSize={ minBytes }
          accept={ accept }

          onDrop={ this.handleDropOrClick }
          { ...dropZoneProps }
        >
          {
            dropzoneText && (
              <div className="AttachmentDropzone__background">
                <p className="AttachmentDropzone__backgroundText">
                  { dropzoneText }
                </p>
              </div>
            )
          }

          { React.cloneElement(component, { openUploadDialogFn: this.handleOpenUploadDialog })}
        </Dropzone>
      );
    }

    return component;
  }
}

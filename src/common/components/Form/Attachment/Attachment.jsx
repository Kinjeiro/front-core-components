/* eslint-disable react/sort-comp */
import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import bind from 'lodash-decorators/bind';
import {
  Icon,
  Input,
  Button,
} from 'semantic-ui-react';

import { generateId } from '@igs/front-core/lib/common/utils/common';

import i18n from '../../../utils/i18n';

import ErrorLabel from '../ErrorLabel/ErrorLabel';

import './Attachment.scss';

export default class Attachment extends React.Component {
  static propTypes = {
    label: PropTypes.node,
    usePreview: PropTypes.bool,
    previews: PropTypes.object,
    actions: PropTypes.node,
    dropzoneText: PropTypes.node,
    className: PropTypes.string,
    readOnly: PropTypes.bool,
    editable: PropTypes.bool,
    multiple: PropTypes.bool,

    value: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      fileName: PropTypes.string.isRequired,
      preview: PropTypes.string,
      description: PropTypes.string,
      uploadedOn: PropTypes.any,
      size: PropTypes.number,
      type: PropTypes.string,
    })),

    parseValue: PropTypes.func,

    withDescriptions: PropTypes.bool,
    descriptionInputProps: PropTypes.object,

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
    dropZoneProps: PropTypes.shape(Dropzone.propTypes),

    showAddButton: PropTypes.bool,
    addButtonText: PropTypes.node,

    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.string,
    }),

    onAdd: PropTypes.func,
    onRemove: PropTypes.func,
    onDescriptionChange: PropTypes.func,
    onAttachClick: PropTypes.func,

    onChange: PropTypes.func,
    onBlur: PropTypes.func,
  };

  static defaultProps = {
    readOnly: false,
    editable: true,
    multiple: true,
    dropzoneText: i18n('components.Attachment.dropThere'),
    usePreview: true,
    previews: {},

    showAddButton: true,
    addButtonText: i18n('components.Attachment.addButton'),
  };

  state = {
    previews: {},
    descriptions: {},
  };

  dropzoneRef = null;

  // ======================================================
  // UTILS
  // ======================================================
  getValues() {
    const {
      value,
    } = this.props;

    return Array.isArray(value)
      ? value
      : value
        ? [value]
        : [];
  }

  // addPreview(fileName, previewData) {
  //   this.setState({
  //     previews: {
  //       ...this.state.previews,
  //       [fileName]: previewData,
  //     },
  //   });
  // }

  parseValueFromFile(file) {
    /*
     FILE: {
       lastModified: 1463127849264,
       lastModifiedDate: Fri May 13 2016 11:24:09 GMT+0300 (RTZ 2 (зима)) {},
       name: "test name.jpg",
       preview: "blob:http://localhost:8080/3b5f332a-45a7-49a8-9a1e-5b9225bd831e",
       size: 57613,
       type: "image/jpeg",
       webkitRelativePath: "",
     }
     */

    return {
      // service info
      uuid: generateId(),
      file,
      isNew: true,

      // common info
      id: null,
      fileName: file.name,
      preview: null,
      description: null,
      uploadedOn: null,
      size: file.size,
      type: file.type,
    };
  }

  update(resultValues, affectedValues) {
    const {
      multiple,
      onChange,
      onBlur,
    } = this.props;

    let resultValuesFinal = resultValues;
    if (!multiple) {
      resultValuesFinal = resultValuesFinal[0];
    }
    if (onBlur) {
      // update touched
      onBlur(resultValuesFinal, affectedValues);
    }
    if (onChange) {
      // update value
      onChange(resultValuesFinal, affectedValues);
    }
  }

  // ======================================================
  // HANDLERS
  // ======================================================
  @bind()
  handleDropOrClick(acceptedFiles, rejectedFiles, event) {
    const {
      usePreview,
      parseValue,
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

    if (usePreview) {
      const previews = {};
      addedFiles.forEach((file) => {
        if (file.preview) {
          previews[file.name] = file.preview;
        } else {
          // todo @ANKU @LOW - надо сделать удаленную загрузку Promise.all а потом только вызвать один раз setState
          // const reader = new FileReader();
          // reader.onload = (onloadEvent) =>
          //   this.addPreview(file.name, onloadEvent.target.result);
          // reader.readAsDataURL(file);
        }
      });
      this.setState({
        previews,
      });
    }

    const newAttachments = addedFiles.map((file) => (parseValue
      ? parseValue(file)
      : this.parseValueFromFile(file)
    ));

    const resultAttachments = [
      ...this.getValues(),
      ...newAttachments,
    ];

    if (onAdd) {
      onAdd(addedFiles, resultAttachments, newAttachments);
    }
    this.update(resultAttachments, newAttachments, addedFiles);
  }

  @bind()
  handleAttachClick(attach) {
    const {
      onAttachClick,
    } = this.props;
    if (onAttachClick) {
      onAttachClick(attach);
    }
  }

  @bind()
  handleAttachRemove(attach, event) {
    const {
      onRemove,
    } = this.props;
    const {
      previews,
      descriptions,
    } = this.state;

    event.preventDefault();
    event.stopPropagation();

    const values = this.getValues();
    const resultValues = values.filter((attachItem) => attachItem.fileName !== attach.fileName);

    if (onRemove) {
      onRemove(attach, resultValues);
    }

    this.update(resultValues, attach);

    delete previews[attach.fileName];
    delete descriptions[attach.fileName];

    this.setState({
      previews,
      descriptions,
    });
  }

  @bind()
  handleDescriptionBlur(attach) {
    const {
      onDescriptionChange,
    } = this.props;
    const { descriptions } = this.state;
    const {
      fileName,
      id,
      description,
    } = attach;


    // let curAttach = values.find((value) => value.fileName === fileName);
    const newDescription = descriptions[fileName];

    if (description !== newDescription) {
      const values = this.getValues();
      const updatedAttach = {
        ...attach,
        description: newDescription,
      };

      const finalResult = values.map((value) => (value.fileName === fileName ? updatedAttach : value));

      if (onDescriptionChange) {
        onDescriptionChange(id || fileName, newDescription, finalResult, updatedAttach);
      }
      if (updatedAttach) {
        this.update(finalResult, updatedAttach);
      }
    }
  }

  // ======================================================
  // RENDERS
  // ======================================================
  renderAttach(attach) {
    const {
      usePreview,
      previews: propsPreviews,
      readOnly,
      editable,
      withDescriptions,
      descriptionInputProps,
    } = this.props;

    const {
      previews: tempPreviews,
      descriptions,
    } = this.state;

    const {
      id,
      fileName,
      preview,
      description,
    } = attach;

    const finalPreview = tempPreviews[fileName] || propsPreviews[fileName] || preview;

    // todo @ANKU @LOW - убрать bind с remove через отдельный компонент
    return (
      <div
        key={ id || fileName }
        className="Attachment__AttachInfo AttachInfo"
      >
        {
          withDescriptions && (
            <Input
              { ...descriptionInputProps }
              className="AttachInfo__description"
              value={ descriptions[fileName] || description || '' }
              onChange={ (event) => this.setState({
                descriptions: {
                  ...descriptions,
                  [fileName]: event.target.value,
                },
              }) }
              onBlur={ () => this.handleDescriptionBlur(attach) }
              readOnly={ readOnly }
            />
          )
        }
        <span
          className="AttachInfo__fileName"
          onClick={ this.handleAttachClick.bind(this, attach) }
        >
          { fileName }
        </span>
        {
          !readOnly && editable === true && (
            <span
              className="AttachInfo__remove"
              onClick={ this.handleAttachRemove.bind(this, attach) }
            >
              <Icon name="remove" />
            </span>
          )
        }
        {
          usePreview && finalPreview && (
            <img
              className="AttachInfo__preview"
              src={ finalPreview }
            />
          )
        }
      </div>
    );
  }

  // ======================================================
  // MAIN RENDER
  // ======================================================
  render() {
    const {
      label,
      actions,

      onBlur,
      onChange,
      meta,
      usePreview,
      previews,
      dropzoneText,
      options,
      className = '',
      readOnly,
      editable,
      withDescriptions,
      multiple,

      dropZoneProps = {},

      showAddButton,
      addButtonText,
    } = this.props;

    // FileList
    const selectedFiles = this.getValues();


    // todo @ANKU @LOW - style for dropzone
    return (
      <div className={ `Attachment ${readOnly ? 'Attachment--readOnly' : ''} ${className} ${withDescriptions ? 'Attachment--withDescription' : ''}` }  >
        {
          readOnly
          ? [
            <div
              key="label"
              className="Attachment__label"
            >
              {label}
            </div>,

            selectedFiles && (
              <div
                key="attaches"
                className="Attachment__attaches"
              >
                { selectedFiles.map((fileInfo) => this.renderAttach(fileInfo)) }
              </div>
            ),
          ]
          : (
            <div>
              <Dropzone
                ref={ (node) => { this.dropzoneRef = node; } }
                className="Attachment__dropzone"
                activeClassName="Attachment__dropzone--active"
                onDrop={ this.handleDropOrClick }
                disabled={ readOnly || !editable }
                multiple={ multiple }
                disableClick={ true }
                { ...dropZoneProps }
              >
                <div className="Attachment__dropzoneBackground">
                  <p className="dropzoneBackground__text">
                    { dropzoneText }
                  </p>
                </div>

                <div className="Attachment__label">
                  {label}
                </div>

                {selectedFiles && (
                  <div className="Attachment__attaches">
                    { selectedFiles.map((fileInfo) => this.renderAttach(fileInfo)) }
                  </div>
                )}
              </Dropzone>

              { editable && showAddButton && (
                <div className="Attachment__actions">
                  <Button
                    className="Attachment__addButton"
                    onClick={ () => { this.dropzoneRef.open(); } }
                    disabled={ readOnly }
                  >
                    { addButtonText }
                  </Button>
                </div>
              )}

              <ErrorLabel { ...meta } />
            </div>
          )
        }
      </div>
    );
  }
}

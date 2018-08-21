/* eslint-disable react/sort-comp */
import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import bind from 'lodash-decorators/bind';

import {
  generateId,
  wrapToArray,
  valueFromRange,
} from '@reagentum/front-core/lib/common/utils/common';
import CONSTRAINTS_PROP_TYPE from '@reagentum/front-core/lib/common/models/model-constraints';

import i18n from '../../../utils/i18n';

import getComponents from '../../../get-components';

const {
  Icon,
  BaseInput: Input,
  Button,
  ErrorLabel,
} = getComponents();

require('./Attachment.scss');

export const DEFAULT_MULTIPLE_MAX_SIZE = 10;
export const DEFAULT_MAX_BYTES = 10485760; // 10Mb

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
    constraints: CONSTRAINTS_PROP_TYPE,
    /**
     https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Limiting_accepted_file_types
     accept="image/png" or accept=".png" — Accepts PNG files.
     accept="image/png, image/jpeg" or accept=".png, .jpg, .jpeg" — Accept PNG or JPEG files.
     accept="image/*" — Accept any file with an image/* MIME type. (Many mobile devices also let the user take a picture with the camera when this is used.)
     accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    */
    accept: PropTypes.string,

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
      loaded: PropTypes.number,
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
    /**
     * https://react-dropzone.netlify.com/#proptypes
      maxSize
     */
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

    onErrors: PropTypes.func,
    onWarnings: PropTypes.func,
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

  static parseValueToString(value) {
    const {
      id,
      fileName,
      // preview,
      // description,
    } = value;

    return fileName || id;
  }

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

    return wrapToArray(value);
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
    const {
      parseValue,
    } = this.props;
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

    const {
      name,
      size,
      type,
      preview,
    } = file;

    return {
      // service info
      uuid: generateId(),
      // // File нельзя хранить в редуксе - лучше мапу возращать uuid: File
      // file,
      isNew: true,
      loaded: 0,
      total: 0,
      isLoaded: false,

      // common info
      id: null,
      fileName: name,
      preview,
      description: null,
      uploadedOn: null,
      size,
      type,

      ...(parseValue ? parseValue(file) : {}),
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
      onAdd,
      constraints: {
        multipleMaxSize = DEFAULT_MULTIPLE_MAX_SIZE,
        maxBytes = DEFAULT_MAX_BYTES,
        minBytes,
      } = {},
      onWarnings,
    } = this.props;

    const values = this.getValues();

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

    const newAmount = values.length + acceptedFiles.length;

    const warnings = [];
    if (typeof multipleMaxSize !== 'undefined' && newAmount > multipleMaxSize) {
      // eslint-disable-next-line no-param-reassign
      addedFiles = addedFiles.slice(0, multipleMaxSize - values.length);
      // todo @ANKU @LOW - @i18n @@
      warnings.push(`Несколько файлов не были добавлены, так как превыше лимит файлов ${multipleMaxSize}.`);
    }
    if (typeof maxBytes !== 'undefined') {
      const filteredFiles = addedFiles.filter(({ size }) => size <= maxBytes);
      // eslint-disable-next-line no-param-reassign
      if (addedFiles.length !== filteredFiles.length) {
        // todo @ANKU @LOW - @i18n @@
        warnings.push(`Несколько файлов не были добавлены, так как превыше лимит размера файлов ${parseInt(maxBytes / 1000, 10)} кБ.`);
        addedFiles = filteredFiles;
      }
    }
    if (typeof minBytes !== 'undefined') {
      const filteredFiles = addedFiles.filter(({ size }) => size >= minBytes);
      // eslint-disable-next-line no-param-reassign
      if (addedFiles.length !== filteredFiles.length) {
        // todo @ANKU @LOW - @i18n @@
        warnings.push(`Несколько файлов не были добавлены, так как размер файлов меньше минимального ${parseInt(minBytes / 1000, 10)} кБ.`);
        addedFiles = filteredFiles;
      }
    }
    if (warnings.length) {
      // чтобы сработало после onChange, ибо по нему очищается
      window.setTimeout(() => onWarnings(warnings, true), 10);
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

    // todo @ANKU @LOW - мапа не очень подходит ибо важна последовательность выбора в FileChooser
    const newFilesMap = {};
    const newAttachments = addedFiles.map((file) => {
      const newAttach = this.parseValueFromFile(file);

      newFilesMap[newAttach.uuid] = file;
      return newAttach;
    });

    const resultAttachments = [
      ...this.getValues(),
      ...newAttachments,
    ];

    if (onAdd) {
      onAdd(newFilesMap, newAttachments, resultAttachments);
    }
    this.update(resultAttachments, newAttachments, newFilesMap);
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
      isNew,
      loaded,

      id,
      fileName,
      preview,
      description,
    } = attach;

    const progress = isNew ? valueFromRange(loaded, [0, 25, 50, 75, 100]) : null;

    const finalPreview = tempPreviews[fileName] || propsPreviews[fileName] || preview;

    // todo @ANKU @LOW - убрать bind с remove через отдельный компонент
    return (
      <div
        key={ id || fileName }
        className={ `Attachment__AttachInfo AttachInfo ${progress !== null ? `AttachInfo--loaded${progress}` : ''}` }
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
      meta,
      dropzoneText,
      className = '',
      readOnly,
      editable,
      withDescriptions,
      multiple,

      dropZoneProps = {},

      constraints: {
        maxBytes = DEFAULT_MAX_BYTES,
        minBytes,
        multipleMaxSize = DEFAULT_MULTIPLE_MAX_SIZE,
      } = {},
      accept,
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
            <React.Fragment>
              <Dropzone
                ref={ (node) => { this.dropzoneRef = node; } }
                className="Attachment__dropzone"
                activeClassName="Attachment__dropzone--active"
                disabled={ readOnly || !editable }
                multiple={ multiple }
                disableClick={ true }
                maxSize={ maxBytes }
                minSize={ minBytes }
                accept={ accept }

                onDrop={ this.handleDropOrClick }
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

                { editable && showAddButton && (!multipleMaxSize || selectedFiles.length < multipleMaxSize) && (
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
              </Dropzone>

              <ErrorLabel { ...meta } />
            </React.Fragment>
          )
        }
      </div>
    );
  }
}

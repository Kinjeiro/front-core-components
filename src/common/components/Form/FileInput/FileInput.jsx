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

import { generateId } from '@reagentum/front-core/lib/common/utils/common';

import i18n from '../../../utils/i18n';

import ErrorLabel from '../ErrorLabel/ErrorLabel';

import './FileInput.scss';

export default class FileInput extends React.Component {
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
      id: PropTypes.string,
      fileName: PropTypes.string.isRequired,
      preview: PropTypes.string,
      description: PropTypes.string,
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

    onChange: PropTypes.func,
    onBlur: PropTypes.func,
  };

  static defaultProps = {
    readOnly: false,
    editable: true,
    multiple: true,
    dropzoneText: i18n('components.FileInput.dropThere'),
    usePreview: true,
    previews: {},

    showAddButton: true,
    addButtonText: i18n('components.FileInput.addButton'),
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

    return (value && Array.isArray(value) ? value : [value]) || [];
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
      id: generateId(),
      fileName: file.name,
      preview: null,
      label: '',
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
    } = this.props;

    let files;
    if (event.type === 'drop') {
      if (acceptedFiles.length) {
        // convert FileList or [File] to array
        files = [...((event.dataTransfer && event.dataTransfer.files) || acceptedFiles)];
      } else {
        files = [];
      }
    } else if (event.type === 'change') {
      files = [...event.target.files];
    } else {
      files = event;
    }

    if (usePreview) {
      const previews = {};
      files.forEach((file) => {
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

    const newValues = files.map((file) => (parseValue
      ? parseValue(file)
      : this.parseValueFromFile(file)
    ));

    const resultValues = [
      ...this.getValues(),
      ...newValues,
    ];

    this.update(resultValues, newValues);
  }

  @bind()
  handleAttachRemove(attach, event) {
    event.preventDefault();
    event.stopPropagation();

    const {
      previews,
      descriptions,
    } = this.state;

    const values = this.getValues();
    const resultValues = values.filter((attachItem) => attachItem.fileName !== attach.fileName);

    this.update(resultValues, attach);

    delete previews[attach.fileName];
    delete descriptions[attach.fileName];

    this.setState({
      previews,
      descriptions,
    });
  }

  @bind()
  handleDescriptionBlur(fileName) {
    const values = this.getValues();
    const { descriptions } = this.state;

    let updatedAttach = null;

    const finalResult = values.map((value) => {
      if (value.fileName === fileName && typeof descriptions[fileName] !== 'undefined') {
        updatedAttach = {
          ...value,
          description: descriptions[fileName],
        };
        return updatedAttach;
      }
      return value;
    });

    if (updatedAttach) {
      this.update(finalResult, updatedAttach);
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
        className="FileInput__AttachInfo AttachInfo"
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
              onBlur={ () => this.handleDescriptionBlur(fileName) }
              readOnly={ readOnly }
            />
          )
        }
        <span className="AttachInfo__fileName">
          { fileName }
        </span>
        <span
          className="AttachInfo__remove"
          onClick={ readOnly || !editable ? undefined : this.handleAttachRemove.bind(this, attach) }
        >
          <Icon name="remove" />
        </span>
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
      <div className={ `FileInput ${readOnly ? 'FileInput--readOnly' : ''} ${className} ${withDescriptions ? 'FileInput--withDescription' : ''}` }  >
        {
          readOnly
          ? [
            <div
              key="label"
              className="FileInput__label"
            >
              {label}
            </div>,

            selectedFiles && (
              <div
                key="attaches"
                className="FileInput__attaches"
              >
                { selectedFiles.map((fileInfo) => this.renderAttach(fileInfo)) }
              </div>
            ),
          ]
          : (
            <div>
              <Dropzone
                ref={ (node) => { this.dropzoneRef = node; } }
                className="FileInput__dropzone"
                activeClassName="FileInput__dropzone--active"
                onDrop={ this.handleDropOrClick }
                disabled={ readOnly || !editable }
                multiple={ multiple }
                disableClick={ true }
                { ...dropZoneProps }
              >
                <div className="FileInput__dropzoneBackground">
                  <p className="dropzoneBackground__text">
                    { dropzoneText }
                  </p>
                </div>

                <div className="FileInput__label">
                  {label}
                </div>

                {selectedFiles && (
                  <div className="FileInput__attaches">
                    { selectedFiles.map((fileInfo) => this.renderAttach(fileInfo)) }
                  </div>
                )}
              </Dropzone>

              { editable && showAddButton && (
                <div className="FileInput__actions">
                  <Button
                    className="FileInput__addButton"
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

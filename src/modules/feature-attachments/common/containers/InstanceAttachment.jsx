import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import bind from 'lodash-decorators/bind';

import { wrapToArray } from '@reagentum/front-core/lib/common/utils/common';

import {
  ATTACHMENT_PROP_TYPE,
  normalizeAttachment,
} from '../../../../common/models/model-attachment';

import { actions } from '../redux-attachments';
import {
  generateAttachmentUuid,
  getAttachmentsByFieldId,
} from '../redux-selectors-attachments';

import getComponents from '../get-components';

const {
  Attachment,
} = getComponents();

require('./InstanceAttachment.scss');

@connect(
  (globalState, { id }) => ({
    attachmentsMap: getAttachmentsByFieldId(globalState, id),
  }),
  {
    ...actions,
  },
)
export default class InstanceAttachment extends Component {
  static propTypes = {
    /*
     id
     parseValue
     onAdd
     */
    ...Attachment.propTypes,
    /**
     * (uuidToFileMap, newAttachments, resultAttachments) => {} - всегда, даже если multiple=false, так как uuid важен для InstanceAttachments
     */
    onAdd: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
      ATTACHMENT_PROP_TYPE,
      PropTypes.arrayOf(ATTACHMENT_PROP_TYPE),
    ]),

    // ======================================================
    // connect
    // ======================================================
    attachmentsMap: PropTypes.array,
    actionGetAttachmentInfo: PropTypes.func,
    actionDownloadAttachment: PropTypes.func,
    actionUploadAttach: PropTypes.func,
    actionClearAttachment: PropTypes.func,
    actionDeleteAttach: PropTypes.func,
  };

  static defaultProps = {
  };

  // ======================================================
  // UTILS
  // ======================================================
  updateValue(value, props = this.props) {
    const {
      attachmentsMap,
    } = props;

    const additional = value ? attachmentsMap[value.uuid] : null;
    return additional
      ? {
        ...value,
        ...additional,
        preview: additional.preview || value.preview,
      }
      : value;
  }

  /**
   * Наполняем результаты из рудекса (сколько загружено)
   * @return {*}
   */
  updateValues() {
    const {
      value,
    } = this.props;

    const valueFinal = normalizeAttachment(value);

    return Array.isArray(valueFinal)
      ? valueFinal.map((valueItem) => this.updateValue(valueItem))
      : this.updateValue(valueFinal);
  }

  // ======================================================
  // LIFECYCLE
  // ======================================================
  // componentDidMount() {
  // }
  componentWillReceiveProps(newProps) {
    const {
      onChange,
      attachmentsMap,
      value,
      actionClearAttachment,
      warnings,
      onWarnings,
      multiple,
    } = newProps;

    Object.keys(attachmentsMap).forEach((key) => {
      const attach = attachmentsMap[key];
      const old = this.props.attachmentsMap[key];
      if (attach && attach.isNew === false && (!old || old.isNew)) {
        let valueIndex = null;
        const newValues = wrapToArray(value).map((valueItem, index) => {
          if (valueItem.uuid === attach.uuid) {
            valueIndex = index;
            return {
              ...valueItem,
              ...attach,
              preview: attach.preview || valueItem.preview,
            };
          }
          return valueItem;
        });

        onChange(multiple ? newValues : newValues[0], valueIndex);
        actionClearAttachment(attach.uuid);
        // если есть варнинги нужно их пробросить, так как старые затруться после onChange
        if (warnings && warnings.length) {
          // таймаут чтобы сбросились старые в onChange
          setTimeout(() => onWarnings(warnings), 10);
        }
      }
    });
  }

  // ======================================================
  // HANDLERS
  // ======================================================
  @bind()
  parseValueFromFile(file) {
    const {
      id,
      parseValue,
    } = this.props;

    return {
      ...(parseValue ? parseValue(file) : {}),
      uuid: generateAttachmentUuid(id),
    };
  }

  @bind()
  handleAdd(newFilesMap, newAttachments, resultAttachments) {
    const {
      onAdd,
      actionUploadAttach,
    } = this.props;

    let newFileMapFinal = newFilesMap;
    if (newFileMapFinal instanceof File) {
      // multiple: false
      newFileMapFinal = {
        [newAttachments[0].uuid]: newFileMapFinal,
      };
    }

    if (onAdd) {
      onAdd(newFileMapFinal, newAttachments, resultAttachments);
    }

    return Promise.all(
      Object.keys(newFileMapFinal).map((uuid) =>
          actionUploadAttach(uuid, newFileMapFinal[uuid])));
  }

  @bind()
  handleRemove(attachment, resultValues) {
    const {
      onRemove,
      actionClearAttachment,
    } = this.props;

    if (typeof attachment.uuid !== 'undefined') {
      actionClearAttachment(attachment.uuid);
    }

    if (onRemove) {
      onRemove(attachment, resultValues);
    }
  }

  // ======================================================
  // MAIN RENDER
  // ======================================================
  render() {
    return (
      <Attachment
        { ...this.props }
        value={ this.updateValues() }
        parseValue={ this.parseValueFromFile }
        onAdd={ this.handleAdd }
        onRemove={ this.handleRemove }
      />
    );
  }
}


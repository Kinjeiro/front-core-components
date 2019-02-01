import React, { PureComponent } from 'react';
import bind from 'lodash-decorators/bind';

import { executeVariable } from '@reagentum/front-core/lib/common/utils/common';

import getComponents from '../get-components';

const { Modal } = getComponents();

/**
 * Более удобный способ хранить состояние модальных окон
 * Добавляет внутрь спец проперть handlerName (по умолчанию, 'onModalDataChange')
 *
 * @param modalPropsFn: (modalData) => modalProps
 * @param handlerName - имя проперти
 */
export default function decoratorModal(
  modalPropsFn,
  handlerName = 'onModalDataChange',
) {
  return (Component) => {
    class Wrapper extends PureComponent {
      state = {
        modalData: null,
      };

      @bind()
      handleModalDataChange(modalData) {
        this.setState({
          modalData,
        });
      }

      render() {
        const {
          modalData,
        } = this.state;

        return (
          <React.Fragment>
            <Component
              { ...this.props }
              {
                ...{
                  [handlerName]: this.handleModalDataChange,
                }
              }
            />
            {
              modalData && (
                <Modal
                  { ...executeVariable(modalPropsFn, null, modalData) }
                />
              )
            }
          </React.Fragment>
        );
      }
    }

    return Wrapper;
  };
}

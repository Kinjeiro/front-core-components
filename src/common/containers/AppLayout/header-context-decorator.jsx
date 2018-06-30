import React from 'react';
import { HeaderContextConsumer } from './AppLayout';

/**
 * Декорирует компонент и добавляет в него значения и методы по изменению header
 - title,
 - headerTitle,
 - headerDescription,
 - headerLeftPart,
 - headerRightPart,

 - setTitle
 - setHeaderTitle
 - setHeaderDescription
 - setHeaderLeftPart
 - setHeaderRightPart
 */
export default function headerContextDecorator() {
  return (ReactComponentClass) => (props) => (
    <HeaderContextConsumer>
      {
        (contextData) => (
          <ReactComponentClass
            { ...props }
            { ...contextData }
          />
        )
      }
    </HeaderContextConsumer>
  );
}

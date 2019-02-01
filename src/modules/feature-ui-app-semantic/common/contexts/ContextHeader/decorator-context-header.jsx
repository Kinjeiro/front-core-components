import createContextDecorator from '@reagentum/front-core/lib/common/utils/decorators/utils/create-context-decorator';

import { ContextHeaderConsumer } from './ContextHeaderProvider';

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
export const decoratorContextHeader = createContextDecorator(ContextHeaderConsumer);
export default decoratorContextHeader;

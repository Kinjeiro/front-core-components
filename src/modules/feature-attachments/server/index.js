import SubModuleFactory from '@reagentum/front-core/lib/modules/SubModuleFactory';

import createApiPlugins from './server-api-attachments';

import ServiceAttachments from './ServiceAttachments';
import ServiceAttachmentsMock from './ServiceAttachmentsMock';

export default SubModuleFactory.createServerSubModule({
  getServerApi: createApiPlugins,
  getServerServices: {
    serviceAttachments: ServiceAttachments,
  },
  getServerMockServices: {
    serviceAttachments: ServiceAttachmentsMock,
  },
});

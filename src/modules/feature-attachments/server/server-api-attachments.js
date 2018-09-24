import omit from 'lodash/omit';

import {
  generateId,
} from '@reagentum/front-core/lib/common/utils/common';
import { DEFAULT_FILES_PARAM_NAME } from '@reagentum/front-core/lib/common/utils/api-utils';

import apiPluginFactory from '@reagentum/front-core/lib/server/utils/api-plugin-factory';
import {
  createDir,
  inProject,
} from '@reagentum/front-core/lib/server/utils/file-utils';
import { downloadFile } from '@reagentum/front-core/lib/server/utils/hapi-utils';
import logger from '@reagentum/front-core/lib/server/helpers/server-logger';

import { createAttachment } from '../../../common/models/model-attachment';

import {
  API_CONFIGS,
  getDownloadUrl,
} from '../common/api-attachments';

// todo @ANKU @CRIT @MAIN - вынести в конфиги
const UPLOAD_PATH = './temp/files';

const fullUploadPath = inProject(UPLOAD_PATH);
createDir(fullUploadPath, true);
logger.log('Create mock attachment directory', fullUploadPath);

export default function createApiPlugins() {
  return [
    apiPluginFactory(
      API_CONFIGS.uploadAttachment,
      async (requestData, request, reply) => {
        const {
          user: {
            username,
          },
          services: {
            serviceAttachments,
          },
        } = request;
        const {
          description,
          [DEFAULT_FILES_PARAM_NAME]: file,
          ...contextParams
        } = requestData;

        /*
         [
         {
         filename: 'marcus_avatar.jpg',
         path: '/var/folders/cq/143/T/146-20-dab',
         headers: {
         'content-disposition': 'form-data; name="avatar"; filename="marcus_avatar.jpg"',
         'content-type': 'image/jpeg'
         },
         bytes: 82521
         },
         ...
         ]
         */
        // const file = request.payload[`${DEFAULT_FILES_PARAM_NAME}[]`];

        const {
          filename,
          path,
          headers: {
            // 'content-disposition',
            'content-type': contentType,
          },
          bytes,
        } = file;

        const id = generateId();
        const attachment = createAttachment(
          id,
          filename,
          bytes,
          contentType,
          username,
          getDownloadUrl(id),
          path,
          null,
          description,
          new Date(),
          contextParams,
        );

        const attachmentFinal = await serviceAttachments.uploadAttachment(attachment, id);
        return reply(omit(attachmentFinal, 'serverPath'));
      },
      {
        routeConfig: {
          payload: {
            /*
             https://futurestud.io/tutorials/hapi-how-to-upload-files

             output: 'data',
             output: 'stream',
             */
            output: 'file',
            parse: true,
            uploads: UPLOAD_PATH,
          },
        },
      },
    ),
    apiPluginFactory(
      API_CONFIGS.downloadAttachment,
      async (requestData, request, reply) => {
        const {
          params: {
            id,
          },
          services: {
            serviceAttachments,
          },
        } = request;

        const {
          fileName,
          type,
          serverPath,
        } = await serviceAttachments.getAttachmentInfo(id);

        return downloadFile(reply, serverPath, fileName, type);
      },
    ),
  ];
}

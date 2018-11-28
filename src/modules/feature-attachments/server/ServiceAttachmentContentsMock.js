import fs from 'fs';

import {
  createTempFile,
  removeFile,
} from '@reagentum/front-core/lib/server/utils/file-utils';
import CoreServiceMock from '@reagentum/front-core/lib/server/services/utils/CoreServiceMock';

export default class ServiceAttachmentContentsMock extends CoreServiceMock {
  // ======================================================
  // CRUD
  // ======================================================
  /**
   *
   * @param filename
   * @param contentType
   * @return {Promise} - attachmentContentId
   */
  async uploadFile(filename, contentType, readStream) {
    const serverPath = await createTempFile(readStream, filename);
    return this.addRecord({
      serverPath,
    });
  }

  /**
   *
   * @param id
   * @return stream
   */
  async downloadFile(id) {
    const content = await this.loadRecord(id);
    return fs.createReadStream(content.serverPath);
  }

  /**
   *
   * @param id
   * @return {Promise}
   */
  async deleteFile(id) {
    const content = await this.loadRecord(id);
    await removeFile(content.serverPath);
    return this.deleteRecord(id);
  }
}

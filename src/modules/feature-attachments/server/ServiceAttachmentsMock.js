import CoreServiceMock from '@reagentum/front-core/lib/server/services/utils/CoreServiceMock';

export default class ServiceAttachmentsMock extends CoreServiceMock {
  // ======================================================
  // CRUD
  // ======================================================
  async getAttachmentInfo(id) {
    return this.loadRecord(id);
  }

  async uploadAttachment(attachment, id) {
    return this.addRecord(attachment, id);
  }
  //
  // async deleteAttachment(id) {
  //   return this.deleteRecord(id);
  // }
}

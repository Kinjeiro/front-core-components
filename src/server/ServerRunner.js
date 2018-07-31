import bind from 'lodash-decorators/bind';

import ParentServerRunner from '@reagentum/front-core/lib/server/CoreServerRunner';
import serverConfig from '@reagentum/front-core/lib/server/server-config';

import ClientRunner from '../client/ClientRunner';

export default class ServerRunner extends ParentServerRunner {
  getClientRunner() {
    return new ClientRunner();
  }
}


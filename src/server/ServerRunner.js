import bind from 'lodash-decorators/bind';

import ParentServerRunner from '@reagentum/front-core/lib/server/CoreServerRunner';
import serverConfig from '@reagentum/front-core/lib/server/server-config';

import ClientRunner from '../client/ClientRunner';

import {
  ROUTES_NAMES,
  PATH_AUTH_INDEX,
} from '../common/routes.pathes';

export default class ServerRunner extends ParentServerRunner {
  getClientRunner() {
    return new ClientRunner();
  }

  @bind()
  noAuthRequireMatcher(pathname) {
    // todo @ANKU @LOW - вынести в константы
    return serverConfig.common.isTest
      || pathname.indexOf(`${PATH_AUTH_INDEX}/`) >= 0
      || super.noAuthRequireMatcher(pathname);
  }

  @bind()
  getLoginPath() {
    // todo @ANKU @LOW - вынести в константы
    return ROUTES_NAMES.auth;
  }
}


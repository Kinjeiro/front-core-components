import ParentServerRunner from './ServerRunner';

import TestClientRunner from '../client/TestClientRunner';

export default class TestServerRunner extends ParentServerRunner {
  getClientRunner() {
    return new TestClientRunner();
  }
}


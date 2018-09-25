import ParentClientRunner from './ClientRunner';

export default class TestClientRunner extends ParentClientRunner {
  getProjectLayoutComponent() {
    return this.getComponents().TestLayout;
  }

  getIndexRoute() {
    return this.getComponents().TestPage;
  }
}

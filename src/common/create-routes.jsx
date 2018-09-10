import React from 'react';
import {
  Route,
  IndexRedirect,
  IndexRoute,
  Redirect,
} from 'react-router';

// import permissionWrapper from '@reagentum/front-core/lib/common/containers/permissionWrapper';
import createParentRoutes from '@reagentum/front-core/lib/common/create-routes';

import getComponents from './get-components';

export default function createRoutes(store) {
  /*
   <IndexRoute
   key={ ROUTES_NAMES.DASHBOARD }
   component={ DashboardPage }
   />,
  */
  /* <IndexRedirect to="catalog" />,*/
  /* component={ permissionWrapper(PERMISSION_CREATE_REQUEST)(TestDatasPage) } */
  const TestPage = require('./containers/TestPage/TestPage').default;

  const { AppLayout } = getComponents();

  const projectLayout = (
    // ======================================================
    // APP
    // ======================================================
    <Route
      key="appLayout"
      component={ (props) => (
        <AppLayout
          { ...props }
          /*
           ifMobileMoveUserMenuToSidebar={ true }
           userMenu={ [
           {
           name: 'user mobile',
           path: 'user',
           mobile: true,
           },
           {
           name: 'user not mobile',
           path: 'user',
           mobile: false,
           },
           {
           name: 'user null',
           path: 'user',
           },
           ] }
           sidebarMenu={ [
           {
           name: 'sidebar mobile',
           path: 'sidebar',
           mobile: true,
           },
           {
           name: 'sidebar not mobile',
           path: 'sidebar',
           mobile: false,
           },
           {
           name: 'sidebar null',
           path: 'sidebar',
           },
           ] }
           headerProps={{
           headerLeftPart: 'LEFT',
           headerRightPart: 'RIGHT',
           }}

            textTitle="testTitle"
           textHeaderTitle="textHeaderTitle"
           textHeaderDescription="textHeaderDescription"
           textMenuLogout="textMenuLogout"
         */
          upBottomButtonsProps={ true }
          footer={ (
            <React.Fragment>
              <div>Test footer 1</div>
              <div>Test footer 2</div>
              <div>Test footer 3</div>
            </React.Fragment>
          ) }
        />
      ) }
    >
      <IndexRoute
        component={ TestPage }
      />
    </Route>
  );

  return createParentRoutes(
    store,
    projectLayout,
  );
}


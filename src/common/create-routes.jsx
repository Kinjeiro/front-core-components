import React from 'react';
import {
  Route,
  IndexRedirect,
  IndexRoute,
  Redirect,
} from 'react-router';

// import permissionWrapper from '@reagentum/front-core/lib/common/containers/permissionWrapper';
import createParentRoutes from '@reagentum/front-core/lib/common/create-routes';

export default function createRoutes(store) {
  /*
   <IndexRoute
   key={ ROUTES_NAMES.DASHBOARD }
   component={ DashboardPage }
   />,
  */
  /* <IndexRedirect to="catalog" />,*/
  /* component={ permissionWrapper(PERMISSION_CREATE_REQUEST)(TestDatasPage) } */
  const AppLayout = require('./containers/AppLayout/AppLayout').default;
  const TestPage = require('./containers/TestPage/TestPage').default;

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


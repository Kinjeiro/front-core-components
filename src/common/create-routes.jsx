import React from 'react';
import {
  Route,
  IndexRedirect,
  IndexRoute,
  Redirect,
} from 'react-router';

// import permissionWrapper from '@reagentum/front-core/lib/common/containers/permissionWrapper';
import createParentRoutes from '@reagentum/front-core/lib/common/create-routes';
import { PATH_LOGIN_PAGE } from '@reagentum/front-core/lib/common/constants/routes.pathes';
// ======================================================
// PROJECT
// ======================================================
import NAMES, * as paths from './routes.pathes';

import { Notice } from './components';

import AuthLayout from './containers/Auth/AuthLayout/AuthLayout';
import Signin from './containers/Auth/Signin/Signin';

import AppLayout from './containers/AppLayout/AppLayout';
import TestPage from './containers/TestPage/TestPage';

export default function createRoutes(store) {
  /*
   <IndexRoute
   key={ ROUTES_NAMES.DASHBOARD }
   component={ DashboardPage }
   />,
  */
  /* <IndexRedirect to="catalog" />,*/
  /* component={ permissionWrapper(PERMISSION_CREATE_REQUEST)(TestDatasPage) } */

  const authLayout = (
    // ======================================================
    // AUTH
    // ======================================================
    <Route
      key="authLayout"
      path={ NAMES.auth }
      component={ AuthLayout }
    >
      <IndexRedirect to={ NAMES.signin } />
      <Route
        path={ NAMES.signin }
        component={ Signin }
      />
    </Route>
  );

  const projectLayout = (
    // ======================================================
    // APP
    // ======================================================
    <Route
      key="appLayout"
      component={ (props) => (
        <AppLayout
          { ...props }
          /* textTitle="testTitle"
           textHeaderTitle="textHeaderTitle"
           textHeaderDescription="textHeaderDescription"
           textMenuLogout="textMenuLogout"*/
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
    {
      beforeRoutes: [
        <Redirect
          key={ `redirect_${PATH_LOGIN_PAGE}` }
          from={ PATH_LOGIN_PAGE }
          to={ paths.PATH_AUTH_INDEX }
        />,
      ],
      authLayout,

      NoticeComponentClass: Notice,
      LoginPageComponentClass: Signin,
      ModalLoginPageComponentClass: Signin,
    },
  );
}


import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import bind from 'lodash-decorators/bind';

// import i18n from '../../utils/i18n';

import getComponents from '../../get-components';

const {
  AppLayout,
} = getComponents();

// require('./TestLayout.scss');

export default class TestLayout extends PureComponent {
  render() {
    return (
      <AppLayout
        { ...this.props }
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
    );
  }
}

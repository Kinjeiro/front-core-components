const coreAppStyleConfig = require('@reagentum/front-core/lib/common/app-style/vars');

// используется в webpack-config.js - для генерешки antd стилей
module.exports = Object.assign(
  {},
  coreAppStyleConfig,
  {
    // Antd override styles vars
    // https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
    // 'primary-color': '#0079c2',
    'color-primary': '#0079c2',

    // 'color-background-auth': var(--color-primary);
    // 'color-text-auth': var(--color-main-background);
    // 'color-primary-auth': #333;

    'font-size-base': '13px',
  },
);

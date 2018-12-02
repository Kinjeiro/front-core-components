import i18n from '@igs/front-core/lib/common/utils/i18n-utils';

const NAMESPACE = 'frontCore-components';

function i18nProjectWrapper(key, ...other) {
  const namespace = key.indexOf(':') < 0
    ? `${NAMESPACE}:`
    : '';

  return i18n(`${namespace}${key}`, ...other);
}

export default i18nProjectWrapper;

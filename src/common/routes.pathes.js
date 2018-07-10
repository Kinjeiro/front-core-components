import { joinPath } from '@reagentum/front-core/lib/common/utils/uri-utils';

/* eslint-disable import/prefer-default-export */
export const ROUTES_NAMES = {
  auth: 'auth',
  signin: 'signin',
};

// ======================================================
// AUTH
// ======================================================
export const PATH_AUTH_INDEX = joinPath(ROUTES_NAMES.auth);
export const PATH_AUTH_SIGNIN = joinPath(PATH_AUTH_INDEX, ROUTES_NAMES.signin);

export default ROUTES_NAMES;

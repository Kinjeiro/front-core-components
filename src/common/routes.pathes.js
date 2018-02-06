import appUrl from '@reagentum/front-core/lib/common/helpers/app-urls';

/* eslint-disable import/prefer-default-export */
export const ROUTES_NAMES = {
  auth: 'auth',
  signin: 'signin',
};

// ======================================================
// MARKET
// ======================================================
// todo @ANKU @LOW @toCore
export const PATH_INDEX = appUrl('/');

// ======================================================
// AUTH
// ======================================================
export const PATH_AUTH_INDEX = appUrl(ROUTES_NAMES.auth);
export const PATH_AUTH_SIGNIN = `${PATH_AUTH_INDEX}/${ROUTES_NAMES.signin}`;

export default ROUTES_NAMES;

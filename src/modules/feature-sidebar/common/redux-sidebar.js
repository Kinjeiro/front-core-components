/* eslint-disable max-len */
import { createReducer } from '@reagentum/front-core/lib/common/app-redux/utils';

// ======================================================
// INITIAL STATE
// ======================================================
const initialState = {
  isSidebarOpen: null,
  sidebarContext: {},
};


// ======================================================
// TYPES
// ======================================================
const PREFIX = 'sidebar';
export const TYPES = {
  OPEN_SIDEBAR: `${PREFIX}/OPEN_SIDEBAR`,
  CLOSE_SIDEBAR: `${PREFIX}/CLOSE_SIDEBAR`,
  CHANGE_SIDEBAR_CONTEXT: `${PREFIX}/CHANGE_SIDEBAR_CONTEXT`,
  CLEAR_SIDEBAR_CONTEXT: `${PREFIX}/CLEAR_SIDEBAR_CONTEXT`,
};


// ======================================================
// ACTION CREATORS
// ======================================================
export function getBindActions() {
  return {
    actionOpenSidebar(sidebarContext) {
      return {
        type: TYPES.OPEN_SIDEBAR,
        payload: sidebarContext,
      };
    },
    actionCloseSidebar() {
      return {
        type: TYPES.CLOSE_SIDEBAR,
      };
    },
    actionChangeSidebarContext(sidebarContext) {
      return {
        type: TYPES.CHANGE_SIDEBAR_CONTEXT,
        payload: sidebarContext,
      };
    },
    actionClearSidebarContext() {
      return {
        type: TYPES.CLEAR_SIDEBAR_CONTEXT,
      };
    },
  };
}

export const actions = getBindActions();

// ======================================================
// REDUCER
// ======================================================
const reducer = createReducer(
  initialState,
  {
    [TYPES.OPEN_SIDEBAR]:
      (state, action, sidebarContext) => ({
        ...state,
        isSidebarOpen: true,
        sidebarContext: sidebarContext
          ? {
            ...state.sidebarContext,
            ...sidebarContext,
          }
          : state.sidebarContext,
      }),
    [TYPES.CLOSE_SIDEBAR]:
      (state) => ({
        ...state,
        isSidebarOpen: false,
      }),
    [TYPES.CHANGE_SIDEBAR_CONTEXT]:
      (state, action, sidebarContext) => ({
        ...state,
        sidebarContext: {
          ...state.sidebarContext,
          ...sidebarContext,
        },
      }),
    [TYPES.CLEAR_SIDEBAR_CONTEXT]:
      (state) => ({
        ...state,
        sidebarContext: {},
      }),
  },
);

export default reducer;

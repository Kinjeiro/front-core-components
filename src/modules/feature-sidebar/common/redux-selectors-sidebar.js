export function getSidebarInfo(globalState) {
  return globalState.sidebar;
}

export function isSidebarOpen(globalState) {
  return getSidebarInfo(globalState).isSidebarOpen;
}
export function getSidebarContext(globalState) {
  return getSidebarInfo(globalState).sidebarContext;
}

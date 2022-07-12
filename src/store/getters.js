const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  collapse: state => state.app.collapse,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  menu: state => state.user.menu,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  orgId: state => state.user.orgId,
  loginInfo: state => state.user.loginInfo,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  roleList: state => state.user.roleList,
  childrenRoutes: state => state.permission.childrenRoutes,
  childrenFullPath: state => state.permission.childrenFullPath,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  contarct: state => state.project.contarct
}
export default getters

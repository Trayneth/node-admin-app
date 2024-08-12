export default ($axios, env) => ({
  getPermissions() {
    const res = $axios.$get(`${env.API_SECRET_PREFIX}/role-permissions/get-all-permission`).catch((e) => {
      console.log(e);
    });
    return res;
  },

  getPermissionByRole(roleId) {
    return $axios.$get(`${env.API_SECRET_PREFIX}/role-permissions/get-permission-by-role/${roleId}`).catch((e) => {
      console.log(e);
    });
  },

  updateRolePermission(payload) {
    return $axios.$post(`${env.API_SECRET_PREFIX}/role-permissions/update`, payload).catch((e) => {
      console.log(e);
    });
  },
});

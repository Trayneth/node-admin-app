export default ($axios, env) => ({
  show() {
    return $axios.$get(env.API_SECRET_PREFIX + `/general-settings`);
  },

  update(payload, id) {
    return $axios.$post(env.API_SECRET_PREFIX + `/general-settings/${id}`, payload);
  },

  // uploadAppLogo(payload) {
  //   return $axios.$post(env.API_SECRET_PREFIX + `/general-settings/upload-app-logo`, payload);
  // },

  deleteAppLogo() {
    return $axios.$post(env.API_SECRET_PREFIX + `/general-settings/delete-app-logo`);
  },
});

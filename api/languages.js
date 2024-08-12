export default ($axios, env)=> ({
  getLocale() {
    return $axios.$get(env.API_SECRET_PREFIX + `/get-locales`);
  },

  createLocale(payload) {
    return $axios.$post(env.API_SECRET_PREFIX + `/create-locales`,payload);
  },

  deleteLocale(id) {
    return $axios.$delete(env.API_SECRET_PREFIX + `/delete-locales/${id}`);
  },

  showLocale(id) {
    return $axios.$post(env.API_SECRET_PREFIX + `/locales/show/${id}`);
  },

  updateLocale(payload,id) {
    return $axios.$patch(env.API_SECRET_PREFIX + `/locales/update/${id}`,payload);
  }

});

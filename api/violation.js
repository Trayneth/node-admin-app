export default ($axios, env) => ({
  show(id) {
    return $axios.$get(env.API_SECRET_PREFIX + `/violations/${id}`);
  },

  update(payload, id) {
    return $axios.$post(env.API_SECRET_PREFIX + `/violations/${id}`, payload);
  },

  create(payload) {
    return $axios.$post(env.API_SECRET_PREFIX + `/violations`, payload);
  },

  delete(id) {
    return $axios.$delete(env.API_SECRET_PREFIX + `/violations/${id}`);
  },
  getLocale() {
    return $axios.$get(env.API_SECRET_PREFIX + `/get-locales`);
  },

});

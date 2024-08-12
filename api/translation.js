export default ($axios, env) => ({
  getLocale() {
    return $axios.$get(env.API_SECRET_PREFIX + `/get-locales`);
  },

  getTranslation() {
    return $axios.$get(env.API_SECRET_PREFIX + `/translations`);
  },

  create(payload) {
    return $axios.$post(env.API_SECRET_PREFIX + `/translations`, payload).catch((e) => {});
  },

  show(id) {
    return $axios.$get(env.API_SECRET_PREFIX + `/translations/${id}`).catch((e) => {});
  },

  update(payload, id) {
    const res = $axios.$patch(env.API_SECRET_PREFIX + `/translations/${id}`, payload);
    return res;
  },

  delete(id) {
    return $axios.$delete(env.API_SECRET_PREFIX + `/translations/${id}`);
  },
});

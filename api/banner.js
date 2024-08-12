export default ($axios, env) => ({
  getBanner(option) {
    return $axios
      .$get(env.API_SECRET_PREFIX + `/banners/getActiveBanner?page=${option.page}&per_page=${option.per_page}`)
      .catch((e) => {});
  },

  show(id) {
    return $axios.$get(env.API_SECRET_PREFIX + `/banners/${id}`);
  },

  update(payload, id) {
    return $axios.$post(env.API_SECRET_PREFIX + `/banners/${id}`, payload);
  },

  create(payload) {
    return $axios.$post(env.API_SECRET_PREFIX + `/banners`, payload);
  },

  delete(id) {
    return $axios.$delete(env.API_SECRET_PREFIX + `/banners/${id}`);
  },
  getLocale() {
    return $axios.$get(env.API_SECRET_PREFIX + `/get-locales`);
  },
});

export default ($axios, env) => ({
    getService() {
      return $axios.$get(env.API_SECRET_PREFIX + `/services`);
    },
    delete(id) {
      return $axios.$delete(env.API_SECRET_PREFIX + `/services/${id}`);
    },
    update(payload, id) {
        return $axios.$post(env.API_SECRET_PREFIX + `/services/${id}`, payload);
    },
    create(payload) {
        return $axios.$post(env.API_SECRET_PREFIX + `/services`, payload);
    },
    
    show(id) {
      return $axios.$get(env.API_SECRET_PREFIX + `/services/${id}`);
    },
    getLocale() {
      return $axios.$get(env.API_SECRET_PREFIX + `/get-locales`);
    }
})
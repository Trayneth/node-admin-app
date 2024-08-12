export default ($axios, env) => ({
    getLocale() {
      return $axios.$get(env.API_SECRET_PREFIX + `/get-locales`);
    },

    show(id) {
      return $axios.$get(env.API_SECRET_PREFIX + `/documents/${id}`);
    },
    create(payload) {
        return $axios.$post(
            env.API_SECRET_PREFIX + `/documents`,
            payload
        );  
    },
    update(payload, id) {
      return $axios.$post(
        env.API_SECRET_PREFIX + `/documents/${id}`,
        payload
      );
    },
    delete(id) {
      return $axios.$delete(env.API_SECRET_PREFIX + `/documents/${id}`);
    },

 
  });

export default ($axios, env) => ({
    index() {
      return $axios.$get(env.API_SECRET_PREFIX + '/seos').catch((e) => {
        console.log(e);
      });
    },
    getLocale() {
      return $axios.$get(env.API_SECRET_PREFIX + `/get-locales`);
    },

    show(id) {
      return $axios.$get(env.API_SECRET_PREFIX + `/seos/${id}`);
    },

    update(payload, id) {
      return $axios.$post(   env.API_SECRET_PREFIX + `/seos/${id}`, payload);
    },

  });

export default ($axios, env) => ({
  index() {
    return $axios.$get(env.API_SECRET_PREFIX + "/example").catch((e) => {
      console.log(e);
    });
  },

  create(payload) {
    return $axios
      .$post(env.API_SECRET_PREFIX + `/example`, payload)
      .catch((e) => {
        console.log(e);
      });
  },

  show(id) {
    return $axios.$get(env.API_SECRET_PREFIX + `/example/${id}`);
  },

  update(payload, id) {
    return $axios.$put(env.API_SECRET_PREFIX + `/example/${id}`, payload);
  },

  delete(id) {
    return $axios.$delete(env.API_SECRET_PREFIX + `/example/${id}`);
  },
});

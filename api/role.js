export default ($axios, env) => ({
  getRoles(option) {
    return $axios
      .$get(env.API_SECRET_PREFIX + `/roles/get-active-role?page=${option.page}&per_page=${option.per_page}`)
      .catch((e) => {
        console.log(e);
      });
  },

  show(id) {
    return $axios.$get(env.API_SECRET_PREFIX + `/roles/${id}`);
  },

  update(payload, id) {
    return $axios.$patch(env.API_SECRET_PREFIX + `/roles/${id}`, payload);
  },

  create(payload) {
    return $axios.$post(env.API_SECRET_PREFIX + `/roles`, payload);
  },

  delete(id) {
    return $axios.$delete(env.API_SECRET_PREFIX + `/roles/${id}`);
  },
});

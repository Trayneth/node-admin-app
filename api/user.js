export default ($axios, env) => ({
  getUsers(option) {
    return $axios
      .$get(env.API_SECRET_PREFIX + `/users/get-active-user?page=${option.page}&per_page=${option.per_page}`)
      .catch((e) => {
        console.log(e);
      });
  },

  create(payload) {
    return $axios.$post(env.API_SECRET_PREFIX + `/users`, payload).catch((e) => {
      console.log(e);
    });
  },

  show(id) {
    return $axios.$get(env.API_SECRET_PREFIX + `/users/${id}`).catch((e) => {
      console.log(e);
    });
  },

  update(payload, id) {
    const res = $axios.$patch(env.API_SECRET_PREFIX + `/users/${id}`, payload);
    return res;
  },

  delete(id) {
    return $axios.$delete(env.API_SECRET_PREFIX + `/users/${id}`);
  },

  updateUserProfile(payload , id ) {
    const res = $axios.$post(env.API_SECRET_PREFIX + `/user-profile/${id}` , payload);
    return res;
  },
  // change password 
  updatepassword(payload , id) {
    const res = $axios.$post(env.API_SECRET_PREFIX + `/change-password/${id}` , payload);
    return res;
  },
});

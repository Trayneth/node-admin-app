export default ($axios, env) => ({
  show() {
    return $axios.$get(env.API_SECRET_PREFIX + `/home-contents`);
  },

  update(payload, id) {
    return $axios.$post(env.API_SECRET_PREFIX + `/home-content/${id}`, payload);
  },

  getLocale() {
    return $axios.$get(env.API_SECRET_PREFIX + `/get-locales`);
  },
// show keyfeature
  showKey(){
    return $axios.$get(env.API_SECRET_PREFIX + `/feature`);
  },
  // update 
updatekey(payload, id) {
  return $axios.$post(env.API_SECRET_PREFIX + `/key-update/${id}`, payload);
}
});
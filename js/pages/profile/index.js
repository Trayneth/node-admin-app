export default {
  middleware: ["auth", "user-permission"],

  data() {
    return {};
  },

  beforeCreate() {
    this.$store.commit("setPageTitle", "User Profile");
  },
};

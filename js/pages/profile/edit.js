import validations from "@/utils/validations";

export default {
  middleware: ["auth", "user-permission"],

  data() {
    return {
      error_messages: [],
      valid: true,
      ...validations,
      name: null,
      username: null,
      email: null,
      phone: null,

      breadcrumbs: [
        { text: "Home", disabled: false, to: "/" },
        { text: "User Profile", disabled: false, to: "/profile" },
        { text: "Edit Profile", disabled: true, to: "" },
      ],
    };
  },

  computed: {
    profileData() {
      return {
        name: this.name,
        username: this.username,
        email: this.email,
        phone: this.phone,
      };
    },

    userId() {
      return this.$auth.user.user.id;
    },
  },

  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        const res = await this.$api.user.updateUserProfile(this.profileData, this.userId);
        if (res.statusCode == 400) {
          this.$toast.error(res.message ? res.message : res.error);
          this.error_messages = res.message;
        } else {
          this.$auth.fetchUser();
          this.$toast.success(res.message);
          this.error_messages = [];
          this.$refs.form.resetValidation();
        }
      }
    },
  },

  mounted() {
    this.name = this.$auth.user.user.name;
    this.username = this.$auth.user.user.username;
    this.email = this.$auth.user.user.email;
    this.phone = this.$auth.user.user.phone;
  },

  beforeCreate() {
    this.$store.commit("setPageTitle", "Edit Profile");
  },
};


export default {
  meta: {
    permission: 'profile:write',
  },
  middleware: ['auth', 'user-permission'],

  data() {
    return {
      error_messages: [],
      valid: true,
      current_password: null,
      new_password: null,
      confirm_new_password: null,

      breadcrumbs: [
        { text: 'Home', disabled: false, to: '/' },
        { text: 'User Profile', disabled: false, to: '/profile' },
        { text: 'Change Password', disabled: true, to: '' },
      ],
    };
  },

  computed: {
    changePasswordData() {
      return {
        current_password: this.current_password,
        new_password: this.new_password,
        confirm_new_password: this.confirm_new_password,
      };
    },

    userId() {
      return this.$auth.user.user.id;
    },
  },

  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        const res = await this.$api.user.updatepassword(this.changePasswordData, this.userId);

        if (!res.success) {
          this.$toast.error(res.message);
          this.error_messages = res.message_details;
        } else {
          this.$toast.success(res.message);
          this.error_messages = [];
          this.$refs.form.reset();
        }
      }
    },
  },

  beforeCreate() {
    this.$store.commit('setPageTitle', 'Change Password');
  },
};

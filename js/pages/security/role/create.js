export default {
  meta: {
    permission: 'role:write',
  },

  middleware: ['auth', 'user-permission'],

  head() {
    return {
      titleTemplate: '%s | Create Role',
    };
  },

  data() {
    return {
      error_messages: [],
      valid: true,

      role: {
        name: null,
        description: null,
        status: 1,
      },
    };
  },

  computed: {
    formRole() {
      return {
        name: this.role.name,
        description: this.role.description,
        status: this.role.status,
      };
    },
  },

  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        const res = await this.$api.role.create(this.formRole);
        if (!res.success) {
          this.$toast.error(res.message);
          this.error_messages = res.message_details;
        } else {
          this.$toast.success(res.message);
          this.resetForm();
        }
      }
    },

    resetForm() {
      this.role.name = null;
      this.role.description = null;
      this.role.status = 1;
      this.error_messages = [];
      this.$refs.form.resetValidation();
    },
  },

  beforeCreate() {
    this.$store.commit('setPageTitle', 'Create Role');
  },
};

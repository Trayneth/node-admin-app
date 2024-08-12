export default {
  meta: {
    permission: 'role:write',
  },

  middleware: ['auth', 'user-permission'],

  head() {
    return {
      titleTemplate: '%s | Edit Role',
    };
  },

  data() {
    return {
      valid: true,
      error_messages: [],

      role: {
        name: null,
        description: null,
        status: 1,
      },
    };
  },

  computed: {
    id() {
      return this.$route.params.id;
    },

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
      if (this.$refs.form_role.validate()) {
        const res = await this.$api.role.update(this.formRole, this.id);
        if (!res.success) {
          this.$toast.error(res.message);
          this.error_messages = res.message_details;
        } else {
          this.mapData(res);
          this.$toast.success(res.message);
          this.error_messages = [];
          this.$refs.form_role.resetValidation();
        }
      }
    },

    async edit() {
      const res = await this.$api.role.show(this.id);
      this.mapData(res);
    },

    mapData(data) {
      this.role.name = data.role.name;
      this.role.description = data.role.description;
      this.role.status = data.role.status;
    },
  },

  beforeCreate() {
    this.$store.commit('setPageTitle', 'Edit Role');
  },

  created() {
    this.edit();
  },
};

export default {
  meta: {
    permission: 'user:write',
  },

  middleware: ['auth', 'user-permission'],

  head() {
    return {
      titleTemplate: '%s | Create User',
    };
  },

  data() {
    return {
      valid: true,
      error_messages: [],
      user: {
        name: null,
        join_date: this.$moment().format('YYYY-MM-DD'),
        email: null,
        username: null,
        password: null,
        roles: [],
        status: 1,
      },
      roles: [],
      option: {
        per_page: 10,
        page: 1,
        last_page: false,
      },
      show_password: false,
    };
  },
  computed: {
    formUser() {
      return {
        name: this.user.name,
        join_date: this.user.join_date,
        email: this.user.email,
        username: this.user.username,
        password: this.user.password,
        roles: this.user.roles,
        status: this.user.status,
      };
    },
  },

  methods: {
    async submit() {
      if (this.$refs.form_user.validate()) {
        const res = await this.$api.user.create(this.formUser);
        if (!res.success) {
          this.$toast.error(res.message);
          this.error_messages = res.message_details;
        } else {
          this.$toast.success(res.message);
          this.resetForm();
        }
      }
    },

    async getRoles() {
      const res = await this.$api.role.getRoles(this.option);
      if (res) {
        if (res.data.length < this.option.per_page) {
          this.option.last_page = true;
        }
        this.roles = [...this.roles, ...res.data];
      }
    },

    getMoreRoleData(entries, observer, isIntersecting) {
      if (isIntersecting) {
        !this.option.last_page ? (this.option.page += 1) : (this.option.page = this.option.page);
        this.getRoles();
      }
    },

    async getBanches() {
      const res = await this.$api.branch.getBranches(this.option);
      if (res) {
        if (res.data.length < this.option.per_page) {
          this.option.last_page = true;
        }
        this.branches = [...this.branches, ...res.data];
      }
    },

    getMoreBranchData(entries, observer, isIntersecting) {
      if (isIntersecting) {
        !this.option.last_page ? (this.option.page += 1) : (this.option.page = this.option.page);
        this.getBanches();
      }
    },

    resetForm() {
      this.user.name = null;
      this.user.join_date = null;
      this.user.email = null;
      this.user.username = null;
      this.user.password = null;
      this.user.roles = [];
      this.user.status = 1;
      this.$refs.form_user.resetValidation();
      this.error_messages = [];
    },
  },

  beforeCreate() {
    this.$store.commit('setPageTitle', 'Create User');
  },

  created() {
    this.getRoles();
    this.getBanches();
  },
};

export default {
  meta: {
    permission: 'user:write',
  },

  middleware: ['auth', 'user-permission'],

  head() {
    return {
      titleTemplate: '%s | Edit User',
    };
  },

  data() {
    return {
      valid: true,
      error_messages: [],
      user: {
        name: null,
        join_date: null,
        email: null,
        username: null,
        password: null,
        roles: [],
        status: 1,
      },
      change_password: false,
      show_password: false,
      branches: [],
      roles: [],
      option: {
        per_page: 10,
        page: 1,
        last_page: false,
      },
    };
  },

  computed: {
    id() {
      return this.$route.params.id;
    },

    formUser() {
      return {
        name: this.user.name,
        join_date: this.user.join_date,
        email: this.user.email,
        phone_number: this.user.phone_number,
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
        const res = await this.$api.user.update(this.formUser, this.id);
        if (!res.success) {
          this.$toast.error(res.message);
          this.error_messages = res.message_details;
        } else {
          this.mapData(res.data);
          this.$toast.success(res.message);
          this.error_messages = [];
          this.change_password = false;
          this.user.password = null;
          this.$refs.form_user.resetValidation();
        }
      }
    },

    async edit() {
      const res = await this.$api.user.show(this.id);
      this.mapData(res);
    },

    mapData(data) {
      let user = data.user;
      let roles = data.roles;
      this.roles = roles;
      this.user.name = user.name;
      this.user.email = user.email;
      this.user.join_date = user.join_date;
      this.user.username = user.username;
      let roleIds = roles.map((item) => {s
        return item.id;
      });
      this.user.roles = roleIds;
      this.user.status = user.status;
      this.roles_options = roles;
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
  },

  beforeCreate() {
    this.$store.commit('setPageTitle', 'Edit User');
  },

  created() {
    this.edit();
    this.getRoles();
    this.getBanches();
  },
};

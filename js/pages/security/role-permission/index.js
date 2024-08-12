export default {
  meta: {
    permission: 'role_permission:read',
  },

  middleware: ['auth', 'user-permission'],

  head() {
    return {
      titleTemplate: '%s | Role Permission',
    };
  },

  data() {
    return {
      headers: [
        {
          text: 'Menus',
          value: 'module',
          divider: true,
        },
        { text: 'Permissions', value: 'permissions' },
      ],
      option: {
        per_page: 10,
        page: 1,
        last_page: false,
      },
      roles: [],
      role_selected: null,
      permissions_selected: [],
      permissions: [],
      search_permission: null,
      layout_data: ['Tree', 'List'],
      select_layout: 'tree',
    };
  },

  computed: {
    formRolePermission() {
      let permissionIds = this.permissions_selected.map(function (data) {
        return data.id;
      });

      return {
        role_id: this.role_selected,
        permission_ids: permissionIds,
      };
    },

    filter() {
      return;
    },
  },

  methods: {
    async submit() {
      const res = await this.$api.rolePermission.updateRolePermission(this.formRolePermission);

      if (!res.success) {
        this.$toast.error(res.message);
      } else {
        this.permissions_selected = res.data.data;
        this.$toast.success(res.message);
      }
    },

    async getPermissions() {
      const res = await this.$api.rolePermission.getPermissions();
      this.permissions = res;
      console.log(this.permissions);
    },

    async onChangeRole(roleId) {
      if (roleId) {
        this.getPermissionByRoleId(roleId);
      }
    },

    async getPermissionByRoleId(roleId) {
      if (roleId) {
        const res = await this.$api.rolePermission.getPermissionByRole(roleId);
        this.permissions_selected = res.data;
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

    onIntersect(entries, observer, isIntersecting) {
      if (isIntersecting) {
        !this.option.last_page ? (this.option.page += 1) : (this.option.page = this.option.page);
        this.getRoles();
      }
    },

    groupByPermissionSelected(items) {
      const groupArrayObject = items.reduce((group, item) => {
        const { module } = item;
        group[module] = group[module] ?? [];
        group[module].push(item);
        return group;
      }, {});
      return groupArrayObject;
    },

    removePermission(i) {
      this.permissions_selected.splice(i, 1);
    },
  },

  beforeCreate() {
    this.$store.commit('setPageTitle', 'Role Permission');
  },

  created() {
    this.getPermissions();
    this.getRoles();
  },
};

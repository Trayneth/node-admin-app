export default {
  meta: {
    permission: 'role:read',
  },

  middleware: ['auth', 'user-permission'],

  head() {
    return {
      titleTemplate: '%s | Role Detail',
    };
  },

  data() {
    return {
      role: {},
      permissions: [],
    };
  },

  computed: {
    id() {
      return this.$route.params.id;
    },
  },

  methods: {
    async show() {
      const res = await this.$api.role.show(this.id);
      this.mapData(res);
    },

    mapData(data) {
      this.role = data.role;
      this.permissions = data.role.permissions;
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
  },

  beforeCreate() {
    this.$store.commit('setPageTitle', 'Role Detail');
  },

  created() {
    this.show();
  },
};

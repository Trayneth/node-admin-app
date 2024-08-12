export default {
  meta: {
    permission: 'user:read',
  },

  middleware: ['auth', 'user-permission'],

  head() {
    return {
      titleTemplate: '%s | User Detail',
    };
  },

  data() {
    return {
      user: {},
      roles: [],
    };
  },

  computed: {
    id() {
      return this.$route.params.id;
    },
  },

  methods: {
    async show() {
      const res = await this.$api.user.show(this.id);
      this.mapData(res);
    },

    mapData(data) {
      this.user = data.user;
      this.roles = data.user.roles;
    },
  },

  beforeCreate() {
    this.$store.commit('setPageTitle', 'User Detail');
  },

  created() {
    this.show();
  },
};

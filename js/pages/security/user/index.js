import UserTable from '@/components/tables/UserTable';

export default {
  meta: {
    permission: 'user:read',
  },

  middleware: ['auth', 'user-permission'],

  head() {
    return {
      titleTemplate: '%s | User',
    };
  },

  components: { UserTable },

  data() {
    return {};
  },

  beforeCreate() {
    this.$store.commit('setPageTitle', 'Users');
  },
};

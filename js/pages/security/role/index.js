import RoleTable from '@/components/tables/RoleTable';
export default {
  meta: {
    permission: 'role:read',
  },

  middleware: ['auth', 'user-permission'],

  head() {
    return {
      titleTemplate: '%s | Role',
    };
  },

  components: { RoleTable },

  data() {
    return {};
  },

  beforeCreate() {
    this.$store.commit('setPageTitle', 'Roles');
  },
};

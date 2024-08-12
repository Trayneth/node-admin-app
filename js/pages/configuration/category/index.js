import CategoryTable from '@/components/tables/CategoryTable';

export default {
  meta: {
    permission: 'page:read',
  },

  middleware: ['auth', 'user-permission'],

  head() {
    return {
      titleTemplate: '%s | Category',
    };
  },

  components: { CategoryTable },

  data() {
    return {};
  },

  beforeCreate() {
    this.$store.commit('setPageTitle', 'Categories');
  },
};

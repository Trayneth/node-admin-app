import TranslationTable from '@/components/tables/TranslationTable';

export default {
  meta: {
    permission: 'translation:read',
  },

  middleware: ['auth', 'user-permission'],

  head() {
    return {
      title: 'TranSparency - TRANSLATION',
    };
  },

  components: { TranslationTable },

  data() {
    return {};
  },

  beforeCreate() {
    this.$store.commit('setPageTitle', 'Translations');
  },
};

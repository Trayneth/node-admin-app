import BannerTable from '@/components/tables/BannerTable';
export default {
  meta: {
    permission: 'banner:read',
  },

  middleware: ['auth', 'user-permission'],

  head() {
    return {
      titleTemplate: '%s | Banner',
    };
  },

  components: { BannerTable },
};

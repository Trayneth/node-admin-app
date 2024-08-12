import ConfirmDelete from '@/components/alerts/ConfirmDelete';

export default {
  meta: {
    permission: 'banner:read',
  },
  components: { ConfirmDelete },

  middleware: ['auth', 'user-permission'],

  head() {
    return {
      titleTemplate: '%s | Show Banner',
    };
  },

  data() {
    return {
      error_messages: [],
      valid: true,
      language_options: [],
      select_language: {},
      title: {},
      description: {},
      title_btn: {},
      image: null,
      image_src: null,
      order_number: null,
      status: null,

      breadcrumb_items: [
        {
          text: 'Home',
          disabled: false,
          to: '/',
        },
        {
          text: 'Banner',
          disabled: false,
          to: '/home/banner',
        },
        {
          text: 'Show Banner',
          disabled: true,
          to: '',
        },
      ],
    };
  },

  computed: {
    id() {
      return this.$route.params.id;
    },
    formBanner() {
      const formData = new FormData();
      formData.append('title', JSON.stringify(this.title));
      formData.append('description', JSON.stringify(this.description));
      formData.append('link', this.link);
      formData.append('title_btn', JSON.stringify(this.title_btn));
      formData.append('order_number', this.order_number);
      formData.append('status', this.status);
      if (this.image instanceof File) {
        formData.append('image', this.image);
      }
      return formData;
    },
  },
  methods: {
    async getLanguage() {
      const res = await this.$api.banner.getLocale();
      this.language_options = res.data.all;
    },
    async edit() {
      const res = await this.$api.banner.show(this.id);
      this.mapData(res);
      console.log('res', res);
    },
    mapData(data) {
      this.title = data.title;
      this.description = data.description;
      this.title_btn = data.title_btn;
      this.image_src = data.image;
      this.order_number = data.order_number;
      this.status = data.status;
    },
    getDynamicLabel(field) {
      return field + ' ' + this.select_language.language;
    },
  },

  beforeCreate() {
    this.$store.commit('setPageTitle', 'Edit Banner');
  },

  created() {
    this.edit();
    this.getLanguage();
  },
};

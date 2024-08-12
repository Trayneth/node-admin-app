import ConfirmDelete from '@/components/alerts/ConfirmDelete';

export default {
  meta: {
    permission: 'banner:write',
  },
  components: { ConfirmDelete },

  middleware: ['auth', 'user-permission'],

  head() {
    return {
      titleTemplate: '%s | Edit Banner',
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
          text: 'Create Banner',
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
      formData.append('_method', 'PUT');
      formData.append('title', JSON.stringify(this.title));
      formData.append('description', JSON.stringify(this.description));
      formData.append('title_btn', JSON.stringify(this.title_btn));
      formData.append('order_number', this.order_number);
      formData.append('status', this.status);
      if (this.image !== null)
        formData.append('image', this.image);
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
    },

    async submit() {
      if (this.$refs.form.validate()) {
        const res = await this.$api.banner.update(this.formBanner, this.id);
        if (!res.success) {
          this.$toast.error(res.message);
          this.error_messages = res.message_details ? res.message_details : [];
        } else {
          this.edit();
          this.$toast.success(res.message);
          this.error_messages = [];
          this.$refs.form.resetValidation();
        }
      }
    },
    
    mapData(data) {
      this.title = data.title;
      this.description = data.description;
      this.title_btn = data.title_btn;
      this.order_number = data.order_number;
      this.status = data.status;
      this.image_src = data.image
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

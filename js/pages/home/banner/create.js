export default {
  meta: {
    permission: 'banner:write',
  },

  middleware: ['auth', 'user-permission'],

  head() {
    return {
      titleTemplate: '%s | Create Banner',
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
      title_btn:{},
      image: null,
      image_src: null,
      order_number: null,
      status: 1,
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
    formBanner() {
      return {
        title: this.title,
        description: this.description,
        title_btn:this.title_btn,
        image: this.image,
        order_number: this.order_number,
        status: this.status,
      };
    },
  },

  methods: {
    async getLanguage() {
      const res = await this.$api.banner.getLocale();
      this.language_options = res.data.all;
    },
    async submit(isBack) {
      if (this.$refs.formBanner.validate()) {
        const formData = new FormData();
        formData.append('title', JSON.stringify(this.formBanner.title));
        formData.append('description', JSON.stringify(this.formBanner.description));
        formData.append('title_btn', JSON.stringify(this.formBanner.title_btn));
        formData.append('order_number', this.formBanner.order_number);
        formData.append('status', this.formBanner.status);
        if (this.image) formData.append('image', this.image);
        const res = await this.$api.banner.create(formData);
        if (!res.success) {
          this.$toast.error(res.message);
          this.error_messages = res.message_details;
        } else {
          this.$toast.success(res.message);
          this.resetForm();
          if (isBack) {
            this.goBack();
          }
        }
      }
    },

    getDynamicLabel(field) {
      return field + ' ' + this.select_language.language;
    },
    resetForm() {
      this.title = {};
      this.image = null;
      this.description = {};
      this.title_btn = {};
      this.order_number = null;
      this.status = 1;
      this.$refs.formBanner.resetValidation();
    },
  },

  beforeCreate() {
    this.$store.commit('setPageTitle', 'Create Banner');
  },
  created() {
    this.getLanguage();
  }
};


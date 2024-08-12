import ConfirmDelete from '@/components/alerts/ConfirmDelete';

export default {
  middleware: ['auth', 'user-permission'],

  meta: {
    permission: 'homecontent:read',
  },

  components: {
    ConfirmDelete,
  },

  head() {
    return {
      title: 'Home Content',
    };
  },

  data() {
    return {
      valid: false,
      error_messages: [],
      about_title: {},
      about_description: {},
      category_description: {},
      category_title: {},
      object_description: {},
      language_options: [],
      select_language: {},
      dynamic_field_title: {},
      //  dynamic fields
      input_option: {}, // Example input options object
      
      breadcrumb_items: [
        {
          text: 'Home',
          disabled: false,
          to: '/',
        },
        {
          text: 'Home Content',
          disabled: false,
          to: '/home/home-content',
        },
        {
          text: 'Edit Our Home Content',
          disabled: true,
          to: '',
        },
      ],
    };
  },

  computed: {
    formHomeContent() {
      const formData = new FormData();
      formData.append('about_description', JSON.stringify(this.about_description));
      formData.append('about_title', JSON.stringify(this.about_title));
      formData.append('category_description', JSON.stringify(this.category_description));
      formData.append('category_title', JSON.stringify(this.category_title));
      formData.append('object_description', JSON.stringify(this.object_description));
      return formData;
    },
  },

  methods: {
    async show() {
      const res = await this.$api.homeContent.show();
      this.mapData(res);
    },

    async getLanguage() {
      const res = await this.$api.homeContent.getLocale();
      this.language_options = res.data.all;
    },

    getDynamicLabel(field) {
      return field + ' ' + this.select_language.language;
    },

    async submit() {
      if (this.$refs.form.validate()) {
        const res = await this.$api.homeContent.update(this.formHomeContent, 1);
        if (!res.success) {
          this.$toast.error(res.message);
          this.error_messages = res.message_details ? res.message_details : [];
        } else {
          this.show();
          this.$toast.success(res.message);
          this.error_messages = [];
          this.$refs.form.resetValidation();
        }
      }
    },

    mapData(homeContent) {
      this.about_description = homeContent.about_description;
      this.about_title = homeContent.about_title;
      this.category_description = homeContent.category_description;
      this.category_title = homeContent.category_title;
      this.object_description = homeContent.object_description;
    },
  },

  beforeCreate() {
    this.$store.commit('setPageTitle', 'Home Content');
  },

  created() {
    this.show();
    this.getLanguage();
  },
};

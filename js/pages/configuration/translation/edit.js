export default {
  meta: {
    permission: 'translation:write',
  },

  middleware: ['auth', 'user-permission'],

  head() {
    return {
      title: 'TRANSPARENCY- EDIT TRANSLATION',
    };
  },

  data() {
    return {
      error_messages: [],
      valid: true,
      key: null,
      value: {},
      status: null,
      language_options : [],
      select_language: {},
      
      // breadcrumb_items 

      breadcrumb_items: [
        {
          text: 'Home',
          disabled: false,
          to: '/',
        },
        {
          text: 'Translate',
          disabled: false,
          to: '/configuration/translation',
        },
        {
          text: 'Create Translate',
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

    formTranslation() {
      return {
        key: this.key,
        value: this.cleanObject(this.value),
        status: this.status ,
      };
    },
  },

  methods: {
    async submit() {
      if (this.$refs.form_translation.validate()) {
        const res = await this.$api.translation.update(this.formTranslation, this.id);
        if (!res.success) {
          this.$toast.error(res.message);
          this.error_messages = res.message_details ? res.message_details : [];
        } else {
          this.$toast.success(res.message);
          this.error_messages = [];
          this.mapData(res.data);
        }
      }
    },

    async edit() {
      const res = await this.$api.translation.show(this.id);
      this.mapData(res.data);
    },

    async getLanguage() {
      try {
        const res = await this.$api.translation.getLocale();
        this.language_options = res.data.activeLocal;
      } catch (error) {
        console.error(error);
      }
    },

    getDynamicLabel(field) {
      return field  + ' ' + this.select_language.language;
    },

    mapData(data) {
      this.key = data.key;
      this.value = data.value;
      this.status = data.status;
    },
  },

  beforeCreate() {
    this.$store.commit('setPageTitle', 'Edit Translation');
  },

  created() {
    this.edit();
    this.getLanguage();
  },
};

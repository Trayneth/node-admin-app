import validations from '@/utils/validations';

export default {
  meta: {
    permission: 'translation:write',
  },

  middleware: ['auth', 'user-permission'],

  head() {
    return {
      title: 'BBO - CREATE TRANSLATION',
    };
  },

  data() {
    return {
      error_messages: [],
      valid: true,
      ...validations,
      status: 1,
      language_options: [],
      select_language: {},
      key: null,
      value: {},

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
    formTranslation() {
      return {
        key: this.key,
        value: this.cleanObject(this.value),
        status: this.status,
      };
    },
  },

  methods: {
    async submit() {
      if (this.$refs.form_translation.validate()) {
        const res = await this.$api.translation.create(this.formTranslation);
        if (!res.success) {
          this.$toast.error(res.message);
          this.error_messages = res.message_details ? res.message_details : [];
        } else {
          this.$toast.success(res.message);
          this.resetForm();
        }
      }
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
      return field + ' ' + this.select_language.language;
    },

    resetForm() {
      this.key = null;
      this.value = {};
      (this.value = null), (this.status = null), this.$refs.form_translation.resetValidation();
      this.error_messages = [];
    },
  },

  beforeCreate() {
    this.$store.commit('setPageTitle', 'Create Translation');
  },
  created() {
    this.getLanguage();
  },
};

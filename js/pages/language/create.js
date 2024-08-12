import validations from "~/utils/validations";

export default {
  head() {
    return {
      title: 'ADITI-MEDIA - LANGUAGE',
    };
  },
  data() {
    return {
      error_messages: [],
      valid: true,
      ...validations,
      lang: null,
      local:null,
      status: 1,
    }
  },
  computed: {
    formLanguage() {
      return {
        language: this.lang,
        local: this.local,
        status: this.status ,
      }
    },
  },
  methods: {
    async submitLanguage(){
      if (this.$refs.form.validate()) {
        const res = await this.$api.languages.createLocale(this.formLanguage);
        if (res.success === true) {
          this.$toast.success(res.message);
          this.$refs.form.resetValidation();
          this.clearForm();
        } else {
          this.$toast.error(res.message);
        }
      }
    },
    clearForm() {
      this.lang = '';
      this.local = '';
      this.status = null;
    },
  },
  beforeCreate() {
    this.$store.commit('setPageTitle', 'Create Language');
  },
}

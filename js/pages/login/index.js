export default {
  layout: 'login',

  middleware: ['authenticated'],

  head() {
    return {
      titleTemplate: '%s | Login',
    };
  },

  data() {
    return {
      valid: true,

      user: {
        email: '',
        password: '',
      },
    };
  },

  computed: {
    login() {
      return this.user;
    },
  },

  methods: {
    async submit() {
      if (this.$refs.form_login.validate()) {
        try {
          let res = await this.$auth.loginWith('cookie', { data: this.login });
          if (!res.data.success) {
            this.$toast.error(res.data.message);
          } else {
            if (res.data.data.access_token) {
              let user = await this.$auth.fetchUser();
              const redirect = this.$cookies.get('auth.redirect');
              if (user) {
                this.$router.push({
                  path: redirect ? redirect : this.localePath('/'),
                });
                this.$toast.success('You are logged in.');
              }
            }
          }
        } catch (e) {
          console.log(e);
        }
      }
    },
  },
};

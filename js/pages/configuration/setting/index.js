

import ConfirmDelete from '@/components/alerts/ConfirmDelete';

export default {
  middleware: ['auth', 'user-permission'],

  meta: {
    permission: 'general_setting:read',
  },

  components: {
    ConfirmDelete,
  },

  head() {
    return {
      title: 'CAMBIZ - GENERAL INFORMATION',
    };
  },

  data() {
    return {
      valid: false,
      error_messages: [],
      settings: {
        app_name: null,
        email: null,
        phone_number: null,
        address: null,
        description: null,

        copyright: null,
        map_url: null,
        develop: null,
        app_logo: null,
        small_logo: null,
        favicon: null,
        app_logo_src: null,
        small_logo_src: null,
        favicon_src: null,

      },
    };
  },

  computed: {
    assetURL() {
      return '/uploads/images/';
    },
    formSettings() {
      const formData = new FormData();
      formData.append('app_name', this.settings.app_name);
      formData.append('email', this.settings.email);
      formData.append('phone_number', this.settings.phone_number);
      formData.append('description', this.settings.description);
      formData.append('address', this.settings.address);

      formData.append('copyright', this.settings.copyright);
      formData.append('map_url', this.settings.map_url);
      formData.append('develop', this.settings.develop);
      console.log(this.settings.app_logo )

      if (this.settings.app_logo instanceof File) {
        formData.append('app_logo', this.settings.app_logo);
      }
      if (this.settings.small_logo instanceof File) {
        formData.append('small_logo', this.settings.small_logo);
      }
      if (this.settings.favicon instanceof File) {
        formData.append('favicon', this.settings.favicon);
      }
      return formData;

    },
  },

  methods: {
    async show() {
      await this.$api.settings.show().then((res) => {
        if (res.success === true) {
          this.mapData(res.data);
        }
      });
    },

    async submit() {
      if (this.$refs.form_settings.validate()) {
        const res = await this.$api.settings.update(this.formSettings);
        if (res.success === true) {
          this.$toast.success(res.message);
          this.settings.app_logo = null;
          this.settings.small_logo = null;
          this.settings.favicon = null;
          this.error_messages = [];
          this.show();
        } else {
          this.$toast.error(res.message);
          this.error_messages = res.errors
        }
      }
    },

    mapData(data) {
      this.settings.app_name = data.app_name;
      this.settings.email = data.email;
      this.settings.phone_number = data.phone_number;
      this.settings.address = data.address;

      this.settings.description = data.description;
      this.settings.copyright = data.copyright;
      this.settings.develop = data.develop;
      this.settings.app_logo_src = data.app_logo;
      this.settings.small_logo_src = data.small_logo;
      this.settings.favicon_src = data.favicon;
     },

  },

  beforeCreate() {
    this.$store.commit('setPageTitle', 'Settings');
  },

  created() {
    this.show();
  },
};


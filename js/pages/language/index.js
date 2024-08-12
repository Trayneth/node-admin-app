export default {
  meta: {
    permission: 'language:read',
  },
  middleware: ['auth', 'user-permission'],

  head() {
    return {
      title: 'ADITI-MEDIA - LANGUAGE',
    };
  },
  data() {
    return {
      language_options:[],
      headers: [
        { text: 'LANGUAGE', value: 'language' },
        { text: 'STATUS', value: 'status' },
        { text: 'ACTION', value: 'actions', sortable: false },
      ],
    }
  },
  computed: {
    getStatusText() {
      return active => {
        if (active === 1) {
          return "Active";
        } else if (active === 0) {
          return "Inactive";
        } else {
          return "";
        }
      }
    },
    getStatusColor() {
      return active => {
        if (active === 1) {
          return "primary";
        } else if (active === 0) {
          return "";
        } else {
          return "";
        }
      }
    },
    getStatusIcon (){
      return active => {
        if (active ===1){
          return 'mdi-check-circle'
        }else if (active === 0) {
          return "mdi-close-circle";
        } else {
          return "";
        }
      }
    }
  },
  methods: {
    async getLanguage() {
      try {
        const res = await this.$api.languages.getLocale();
        this.language_options = res.data.all;
      } catch (error) {
        console.error(error);
      }
    },
    async deleteLanguage(id){
      if(this.$refs.confirm) {
        if(await this.$refs.confirm.open()){
          const res = await this.$api.languages.deleteLocale(id);
          if(res.success === true) {
            this.$toast.success(res.message);
            this.getLanguage();
          }else {
            this.$toast.error(res.message);
          }
        }
      }
    },
  },
  beforeCreate() {
    this.$store.commit('setPageTitle', 'Language');
  },
  created() {
    this.getLanguage();
  },
}

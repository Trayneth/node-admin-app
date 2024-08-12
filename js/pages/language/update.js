import validations from "~/utils/validations";
export default {
  data() {
    return {
      error_messages: [],
      valid: true,
      ...validations,
      lang: null,
      local:null,
      active: false,
    }
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    formLanguage(){
      return{
        language: this.lang,
        local: this.local,
        active: this.active ? 1 : 0,
      }
    },
    statusLabel() {
      return this.active ? 'Active' : 'Inactive';
    }
  },
  methods:{
    async showLanguage() {
      try {
        const res = await this.$api.languages.showLocale(this.id);
        this.mapData(res.data);
      }catch (error) {
        console.error(error);
      }
    },
    mapData(data){
      this.lang = data.language;
      this.local = data.title;
      this.active = data.active === 1 ? true : false;
    },

    async submitLanguage(){
      if(this.$refs.form){
        const res = await this.$api.languages.updateLocale(this.formLanguage, this.id);
        if(!res.success){
          this.$toast.error(res.message);
        }else {
          this.$toast.success(res.message);
        }
      }
    },
  },
  beforeCreate() {
    this.$store.commit('setPageTitle', 'Edit Language');
  },
  created() {
    this.showLanguage();
  },
}

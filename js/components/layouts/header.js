export default {
  props: ['submitForm'],

  data() {
    return {
      miniVariant: true,
      dark_mode: false,
      search_menu: null,
      menus: [],
    }
  },

  computed: {
    searchData() {
      return this.search_menu
    },
  },

  methods: {
    miniSidebar() {
      this.miniVariant = !this.$store.getters.isMiniSidebar
      this.$store.commit('setMiniSidebar', this.miniVariant)
    },

    changeTheme() {
      this.dark_mode = !this.$store.getters.isDarkMode
      this.$store.commit('setIsDarkMode', this.dark_mode)
      this.$nuxt.$vuetify.theme.dark = this.dark_mode
    },

    searchMenu(data) {
      this.$axios.$get(`/admin/search-menu?search=${data}`).then((res) => {
        this.menus = res
      })
    },

    pushMenu(to) {
      this.$router.push(this.localePath(to))
      this.menus = []
      this.search_menu = null
    },
  },
}

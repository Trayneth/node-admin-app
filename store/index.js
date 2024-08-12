import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

//export store module
export default () =>
  new Vuex.Store({
    state: {
      mini_sidebar: false,
      dark_mode: false,
      loading: false,
      setup_system: {
        languages: {},
        general_info: {},
      },
      page_title: null,
    },

    //to handle state
    getters: {
      isMiniSidebar(state) {
        return state.mini_sidebar;
      },

      isDarkMode(state) {
        return state.dark_mode;
      },

      getSetupSystem(state) {
        return state.setup_system;
      },

      isDataLoading(state) {
        return state.loading;
      },

      products(state) {
        return state.products;
      },

      getPageTitle(state) {
        return state.page_title;
      },
    },

    //to handle actions
    actions: {
      getSetupSystem(context) {
        this.$axios
          .$get("/api/v1/setup-system")
          .then((data) => {
            context.commit("setSetupSystem", {
              setup_system: {
                languages: data.languages,
                general_info: data.general_information,
              },
            });
          })
          .catch(({ response }) => console.log(response));
      },
    },

    //to handle mutations
    mutations: {
      setMiniSidebar(state, payload) {
        state.mini_sidebar = payload;
      },

      setIsDarkMode(state, payload) {
        state.dark_mode = payload;
      },

      setSetupSystem(state, payload) {
        state.setup_system.languages = payload.setup_system.languages;
        state.setup_system.general_info = payload.setup_system.general_info;
      },

      setIsDataLoading(state, payload) {
        state.loading = payload;
      },

      setPageTitle(state, payload) {
        state.page_title = payload;
      },
    },
  });

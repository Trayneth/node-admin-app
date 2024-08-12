<template>
  <v-app>
    <v-layout>
      <Header :submitForm="logout" />
      <Sidebar />

      <v-main class="main-content">
        <div class="content">
          <Nuxt />
        </div>
      </v-main>

      <v-snackbar :value="isDiconnected($nuxt.isOffline)" left bottom color="error">
        <v-icon left>mdi-wifi-off</v-icon> Your internet connection is disconnected.
      </v-snackbar>
      <v-snackbar :value="!is_already_online && !$nuxt.isOffline ? true : false" left bottom color="primary">
        <v-icon left>mdi-wifi</v-icon> Your internet connection was restored.
      </v-snackbar>

      <Footer />
    </v-layout>
  </v-app>
</template>

<script>
import Sidebar from '@/components/layouts/Sidebar'
import Header from '@/components/layouts/Header'
import Footer from '@/components/layouts/Footer'

export default {
  name: 'DefaultLayout',
  components: { Sidebar, Header, Footer },
  head() {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale,
      },
    }
  },

  data() {
    return {
      is_already_online: true,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },

  methods: {
    async logout() {
      try {
        await this.$auth.logout()
        this.$router.push(this.localePath('/login'))
      } catch (err) {
        console.log(err)
      }
    },

    isDiconnected(isOffline) {
      if (isOffline == true) {
        this.is_already_online = false
        return true
      } else {
        return false
      }
    },
  },

  mounted() {
    // this.$store.dispatch("getSetupSystem");
  },
}
</script>

<style scoped>
.offline-container {
  height: calc(100vh - 150px);
}
</style>

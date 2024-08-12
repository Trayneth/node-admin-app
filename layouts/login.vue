<template>
  <v-app>
    <Header />
    <v-main class="login-main-content">
      <div class="login-content">
        <Nuxt />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Header from "@/components/layouts/Header";

export default {
  name: "LoginLayout",

  head() {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale,
      },
    };
  },

  components: { Header },

  created() {
    // this.$store.dispatch("getSetupSystem");
  },
};
</script>

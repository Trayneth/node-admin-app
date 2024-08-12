<template>
  <div id="home">
    <v-row class="welcome-container" justify="center" align="center">
      <v-img :src="require('~/assets/images/logo/small-logo.png')" alt="" width="300" height="300" contain></v-img>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',

  middleware: ['auth'],

  head() {
    return {
      titleTemplate: '%s | Home',
    };
  },

  beforeCreate() {
    this.$store.commit('setPageTitle', 'Home');
  },
};
</script>

<style>
.welcome-container {
  height: calc(100vh - 75px);
}
</style>

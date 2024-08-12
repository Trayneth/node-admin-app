<template>
  <v-row class="error-container" justify="center" align="center">
    <v-col cols="12" class="text-center">
      <h1 id="status-code">404</h1>
      <p>This page doesn't exist</p>
      <v-btn outlined color="primary" :to="localePath('/')">Homepage</v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
#status-code {
  font-size: 100px;
}
</style>

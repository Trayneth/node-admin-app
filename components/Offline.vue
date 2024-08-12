<template>
  <v-row id="offline-container" justify="center" align="center">
    <v-col cols="12" class="text-center">
      <v-icon size="80">mdi-wifi-off</v-icon>
      <h3>You are offline.</h3>
    </v-col>
  </v-row>
</template>

<script>
export default {};
</script>

<style scoped>
#offline-container {
  height: calc(100vh - 150px);
}
</style>

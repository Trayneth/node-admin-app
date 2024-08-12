<template>
  <v-footer padless fixed app inset>
    <v-card class="flex app-card-footer" flat tile>
      <v-card-actions>
        <strong v-html="copy_right" class="text--secondary copy-right"></strong>
        <v-spacer></v-spacer>
        <strong class="text--secondary version">Version: 1.0.0</strong>
      </v-card-actions>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: 'AppFooter',
};
</script>

<style>
.copy-right {
  font-size: 12px;
  margin-left: 8px;
}
.version {
  font-size: 12px;
  margin-right: 8px;
}
</style>

<template>
  <div>
    <v-row v-for="n in 3" :key="n" dense>
      <v-col cols="2">
        <v-skeleton-loader type="list-item-avatar, divider"></v-skeleton-loader>
      </v-col>
      <v-col cols="2">
        <v-skeleton-loader type="list-item, divider"></v-skeleton-loader>
      </v-col>
      <v-col cols="2">
        <v-skeleton-loader type="list-item, divider"></v-skeleton-loader>
      </v-col>
      <v-col cols="2">
        <v-skeleton-loader type="list-item, divider"></v-skeleton-loader>
      </v-col>
      <v-col cols="2">
        <v-skeleton-loader type="list-item, divider"></v-skeleton-loader>
      </v-col>
      <v-col cols="2">
        <v-skeleton-loader type="list-item, divider"></v-skeleton-loader>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {};
</script>

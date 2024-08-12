<template>
  <v-breadcrumbs :items="item" class="custom-breadcrum">
    <template v-slot:divider><v-icon>mdi-chevron-right</v-icon></template>
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item>
        <nuxt-link v-if="item.to" :to="localePath(item.to)">
          {{ item.text }}
        </nuxt-link>
        <span v-else>{{ item.text }}</span>
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>

<script>
export default {
  name: "Breadcrumb",
  props: ["item"],
};
</script>

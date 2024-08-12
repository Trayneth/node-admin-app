<template>
  <div id="language">
    <v-banner sticky app>
      <v-toolbar flat tile>
        <v-btn class="ml-2 ml-auto" outlined color="primary" v-if="permission('language:write')" :to="localePath('/configuration/languages/create')">
          <v-icon left>mdi-plus-circle</v-icon>
          Create
        </v-btn>
      </v-toolbar>
    </v-banner>
    <v-row>
      <v-col cols="12">
        <v-data-table
          class="elevation-1"
          :headers="headers"
          :items="language_options"
        >
          <template v-slot:[`item.status`]="{ item }">
            <v-chip small :color="getStatusColor(item.active)">
              <v-icon left small>{{getStatusIcon(item.active)}}</v-icon>
              {{ getStatusText(item.active) }}
            </v-chip>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-menu offset-y left>
              <template v-if="item.default !== 1" v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" text icon color="blue">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list dense nav width="180">
                  <v-list-item v-if="permission('language:write')" :to="localePath(`/configuration/languages/${item.id}`)">
                    <v-list-item-icon>
                      <v-icon size="15">mdi-pencil</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Edit</v-list-item-title>
                  </v-list-item>
                  <v-divider class="mb-1"></v-divider>

                  <v-list-item v-if="permission('language:delete')"  @click="deleteLanguage(item.id)">
                    <v-list-item-icon>
                      <v-icon size="15">mdi-delete</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Delete</v-list-item-title>
                  </v-list-item>
                </v-list>
            </v-menu>
          </template>
          <template v-slot:[`item.title`]="{ item }">
            {{ item.language}}
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <ConfirmDelete ref="confirm" />
  </div>
</template>

<script>
import index from '/js/pages/language/index'
import ConfirmDelete from "~/components/alerts/ConfirmDelete.vue";
export default {
  name: "index",
  computed: {
    language() {
      return language
    }
  },
  components: {ConfirmDelete},
  mixins:[index]
}
</script>

<style scoped>
</style>

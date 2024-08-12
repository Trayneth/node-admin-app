<template>
  <div class="page-container">
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-card-subtitle>Role Information</v-card-subtitle>
          <v-card-text>
            <v-list dense>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Role Name: </v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>{{ role.name }}</v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Description: </v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>{{ role.description ? role.description : "N/A"}}</v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card outlined>
          <v-card-subtitle>Role Permission</v-card-subtitle>
          <v-card-text>
            <template v-if="!permissions.length"> No permissions. </template>
            <template v-else>
              <v-simple-table>
                <tbody>
                  <tr v-for="(item, key) in groupByPermissionSelected(permissions)" :key="key">
                    <td>{{ key }}:</td>
                    <td>
                      <v-chip v-for="(selection, i) in item" :key="i" small class="ma-1">
                        {{ selection.permission_name }}
                      </v-chip>
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </template>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12 " class="text-right">
        <v-btn @click="goBack" :disabled="isDataLoading" color="secondary">
          <v-icon left>mdi-chevron-left-circle</v-icon>
          {{ $t('action_back') }}</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
import show from '@/js/pages/security/role/show.js';
export default {
  mixins: [show],
};
</script>

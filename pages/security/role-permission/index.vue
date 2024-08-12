<template>
  <div>
    <v-banner sticky app>
      <v-toolbar flat tile>
        <v-text-field
          v-if="role_selected"
          v-model="search_permission"
          placeholder="Search menu name..."
          prepend-inner-icon="mdi-magnify"
          v-bind="input_option"
          class="mr-2 table-search"
        ></v-text-field>

        <v-autocomplete
          :items="roles"
          v-model="role_selected"
          v-bind="input_option"
          placeholder="-- Select Role --"
          item-text="name"
          item-value="id"
          class="table-search"
          @change="onChangeRole"
        >
          <template v-slot:append-item>
            <div v-intersect.quiet="onIntersect" class="text-center">
              <v-progress-circular v-if="isDataLoading" :width="3" color="primary" indeterminate></v-progress-circular>
            </div>
          </template>
        </v-autocomplete>

        <v-btn-toggle class="ml-2" v-model="select_layout" mandatory dense color="primary">
          <v-btn v-for="layout in layout_data" :key="layout" :value="layout">{{ layout }}</v-btn>
        </v-btn-toggle>

        <v-spacer></v-spacer>

        <v-btn v-if="role_selected" color="primary" @click="submit" :disabled="isDataLoading">
          <v-icon left>mdi-content-save</v-icon>
          {{ $t('action_save') }}</v-btn
        >
      </v-toolbar>
    </v-banner>

    <div class="page-container" v-if="role_selected">
      <v-card outlined v-if="select_layout == 'List'">
        <v-data-table
          class="table-permission"
          :headers="headers"
          :items="permissions"
          hide-default-footer
          disable-pagination
          :search="search_permission"
        >
          <template v-slot:[`item.permissions`]="{ item }">
            <v-checkbox
              v-for="child in item.permissions"
              :key="child.permission_slug"
              v-model="permissions_selected"
              :value="child"
              :label="child.permission_name"
              color="primary"
              class="check-box-custom"
              hide-details
              dense
            ></v-checkbox>
          </template>
        </v-data-table>
      </v-card>

      <v-card outlined v-if="select_layout == 'Tree'">
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-treeview
                v-model="permissions_selected"
                selectable
                :items="permissions"
                item-children="permissions"
                item-key="permission_slug"
                item-text="permission_name"
                open-all
                :search="search_permission"
                :filter="filter"
                selected-color="primary"
                return-object
              ></v-treeview>
             
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="6">
              <template v-if="!permissions_selected.length"> No permission selected. </template>
              <template v-else>
                <v-simple-table>
                  <tbody>
                    <tr v-for="(item, key) in groupByPermissionSelected(permissions_selected)" :key="key">
                      <td>{{ key }}:</td>
                      <td>
                        <v-chip v-for="(selection, i) in item" :key="i" small class="ma-1">
                          {{ selection.permission_name }}
                          <v-icon right small @click="removePermission(i)"> mdi-close-circle </v-icon>
                        </v-chip>
                      </td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </template>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import rolePermission from '@/js/pages/security/role-permission/index.js';

export default {
  name: 'RolePermissionPage',
  mixins: [rolePermission],
};
</script>

<style lang="scss">
.table-permission {
  .col {
    padding: 0;
  }

  .row {
    padding: 12px;
  }
}

.check-box-custom {
  margin-bottom: 10px;
  .v-input--selection-controls__input + .v-label {
    font-size: 13px !important;
  }
}
</style>

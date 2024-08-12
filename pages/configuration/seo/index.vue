<template>
  <div class="index-page-container">
    <div id="blog-table">
      <v-banner sticky app>
        <v-toolbar flat tile>
          <v-spacer></v-spacer>
          <v-btn outlined color="primary" class="ml-2" @click="show_flter = !show_flter">
            <v-icon left>mdi-filter</v-icon>
            Filter
          </v-btn>
          <v-btn class="ml-2" outlined color="primary" :to="localePath('/project/project/create')">
            <v-icon left>mdi-plus-circle</v-icon>
            Create
          </v-btn>
        </v-toolbar>

        <BlogFilter :show="show_flter" :submit-filter="filter" />
      </v-banner>
      <v-data-table
        :loading="isDataLoading"
        :headers="table_options.headers"
        :items="table_options.table_data"
        :options.sync="options"
        :page.sync="table_options.page"
        :footer-props="{
          showFirstLastPage: true,
          'items-per-page-options': table_item_per_page,
        }"
        :items-per-page="15"
        :server-items-length="table_options.total_items"
        @page-count="table_options.page_count = $event"
      >
        <template #progress>
          <span></span>
        </template>

        <template #loading>
          <TableSkeleton />
        </template>

        <template #[`item.index`]="{ item }">
          {{ table_options.table_data.indexOf(item) + 1 }}
        </template>

        <template #[`item.thumbnail`]="{ item }">
          <v-img
            :lazy-src="item.thumbnail ? `/${item.thumbnail}` : require('~/assets/images/default/camera.png')"
            height="100"
            width="100"
            contain
            :src="item.thumbnail ? `/${item.thumbnail}` : require('~/assets/images/default/camera.png')"
            style="margin: 2px"
          ></v-img>
        </template>

        <template #[`item.status`]="{ item }">
          <v-chip small :color="item.status == '1' ? 'primary' : ''">
            <v-icon left small>{{ item.status == '1' ? 'mdi-check-circle' : 'mdi-close-circle' }}</v-icon>
            {{ item.status == '1' ? 'Active' : 'Inactive' }}
          </v-chip>
        </template>

        <template #[`item.action`]="{ item }">
          <div class="table-action-container">
            <v-menu offset-y left>
              <template #activator="{ attrs, on }">
                <v-btn depressed class="table-button" v-bind="attrs" v-on="on">
                  <v-icon color="primary">mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item>
                  <v-list-item-title>
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs" v-on="on" text icon color="blue"  v-if="permission('projects:delete')" @click="deleteData(item.id)">
                          <v-icon>mdi-delete-outline</v-icon>
                        </v-btn>
                      </template>
                      <span>Delete</span>
                    </v-tooltip>
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs" v-on="on" text icon color="blue"  v-if="permission('projects:write')" link :to="localePath(`/project/project/${item.id}`)">
                          <v-icon>mdi-pencil-box-outline</v-icon>
                        </v-btn>
                      </template>
                      <span>Edit</span>
                    </v-tooltip>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </template>

        <template #[`footer.prepend`]>
          <v-pagination
            v-model="table_options.page"
            :length="table_options.page_count"
            :total-visible="7"
          ></v-pagination>
        </template>
      </v-data-table>
      <v-divider></v-divider>

      <ConfirmDelete ref="confirm" />
    </div>
  </div>
</template>

<script>
import index from '/js/pages/configuration/seo/index.js';
export default {
  name: 'project',
  mixins: [index],
};
</script>

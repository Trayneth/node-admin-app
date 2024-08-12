<template>
  <div id="role-table">
    <v-banner sticky app>
      <v-toolbar flat tile>
        <v-text-field
          v-model="search"
          class="table-search"
          v-bind="input_option"
          placeholder="Search..."
          prepend-inner-icon="mdi-magnify"
          @keyup="onSearch"
          @click:clear="onClearSearch"
        >
        </v-text-field>
        <v-spacer></v-spacer>

        <v-btn outlined color="primary" class="ml-2" @click="show_flter = !show_flter">
          <v-icon left>mdi-filter</v-icon>
          Filter
        </v-btn>

        <v-btn
          class="ml-2"
          outlined
          color="primary"
          v-if="permission('role:write')"
          :to="localePath('/security/role/create')"
        >
          <v-icon left>mdi-plus-circle</v-icon>
          Create
        </v-btn>
      </v-toolbar>

      <RoleFilter :show="show_flter" :submitFilter="filter" />
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
      fixed-header
      height="calc(100vh - 230px)"
      @page-count="table_options.page_count = $event"
      @click:row="(item, slot) => slot.select(!slot.isSelected)"
    >
      <template #[`body.append`]>
        <tr colspan="5"></tr>
      </template>

      <template v-slot:[`item.index`]="{ item }">
        {{ table_options.table_data.indexOf(item) + 1 }}
      </template>
      <template v-slot:[`item.description`]="{ item }">
        {{ item.description ? item.description : 'N/A' }}
      </template>

      <template v-slot:[`item.status`]="{ item }">
        <v-chip small :color="item.status == 1 ? 'primary' : ''">
          <v-icon left small>{{ item.status == 1 ? 'mdi-check-circle' : 'mdi-close-circle' }}</v-icon>
          {{ item.status == 1 ? 'Active' : 'Inactive' }}</v-chip
        >
      </template>

      <template v-slot:[`item.action`]="{ item }">
        <div class="table-action-container">
          <v-menu offset-y left>
            <template v-slot:activator="{ attrs, on }">
              <v-btn depressed class="table-button" v-bind="attrs" v-on="on">
                <v-icon color="primary">mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list dense nav width="180">
              <v-list-item v-if="permission('role:read')" link :to="localePath(`/security/role/show/${item.id}`)">
                <v-list-item-icon>
                  <v-icon size="15">mdi-eye</v-icon>
                </v-list-item-icon>
                <v-list-item-title>View</v-list-item-title>
              </v-list-item>

              <v-divider class="mb-1"></v-divider>

              <v-list-item v-if="permission('role:write')" link :to="localePath(`/security/role/${item.id}`)">
                <v-list-item-icon>
                  <v-icon size="15">mdi-pencil</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Edit</v-list-item-title>
              </v-list-item>

              <v-divider class="mb-1"></v-divider>

              <v-list-item v-if="permission('role:delete')" @click="deleteData(item.id)">
                <v-list-item-icon>
                  <v-icon size="15">mdi-delete</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Delete</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </template>

      <template v-slot:[`footer.prepend`]>
        <v-pagination v-model="table_options.page" :length="table_options.page_count" :total-visible="7"></v-pagination>
      </template>
    </v-data-table>
    <v-divider></v-divider>

    <ConfirmDelete ref="confirm" />
  </div>
</template>

<script>
import TableSkeleton from '@/components/loading/TableSkeleton';
import ConfirmDelete from '@/components/alerts/ConfirmDelete';
import RoleFilter from '@/components/filters/RoleFilter';

export default {
  components: { TableSkeleton, ConfirmDelete, RoleFilter },

  data() {
    return {
      table_options: {
        headers: [
          { text: '#', value: 'index', sortable: false, width: '100' },
          { text: 'Name', value: 'name', sortable: true },
          {
            text: 'Description',
            value: 'description',
            sortable: false,
          },
          { text: 'Status', value: 'status', sortable: false },
          { text: 'Action', value: 'action', sortable: false },
        ],
        url: 'roles',
        page: 1,
        length: 15,
        page_count: 0,
        table_data: [],
        total_items: 0,
      },
      options: {},

      search: '',

      show_flter: false,
    };
  },

  computed: {
    old_filter() {
      return this.$route.query.filter ? JSON.parse(this.$route.query.filter) : null;
    },

    searchInput() {
      return this.search;
    },
  },

  watch: {
    options: {
      handler() {
        this.getDataFromApi(this.table_options.url, this.old_filter);
      },
      deep: true,
    },
  },

  methods: {
    async deleteData(id) {
      if (await this.$refs.confirm.open()) {
        const res = await this.$api.role.delete(id);

        if (!res.success) {
          this.$toast.error(res.message);
        } else {
          this.getDataFromApi(this.table_options.url);
          this.$toast.success(res.message);
        }
      }
    },

    onSearch() {
      this.getDataFromApi(this.table_options.url, this.searchInput);
    },
    onClearSearch() {
      this.search = '';
      this.getDataFromApi(this.table_options.url, this.searchInput);
    },

    filter(dataFilter) {
      this.getDataFromApi(this.table_options.url, this.searchInput, dataFilter);
      this.show_flter = false;
    },

    refreshData() {
      this.getDataFromApi(this.table_options.url, this.old_filter);
    },
  },
};
</script>

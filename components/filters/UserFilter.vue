<template>
  <div>
    <v-expand-transition>
      <v-card tile flat v-show="show">
        <v-form ref="form_filter" @submit.prevent="setFilter()">
          <v-card-text>
            <v-row>
              <v-col cols="2">
                <v-text-field
                  v-model="filter.name"
                  v-bind="input_option"
                  class="table-filter-input"
                  label="Name:"
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-autocomplete
                  v-model="filter.status"
                  :items="status_options"
                  v-bind="input_option"
                  class="table-filter-input"
                  label="Status:"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions class="px-4">
            <v-spacer></v-spacer>
            <v-btn outlined color="secondary" @click="resetFilter">
              <v-icon left>mdi-close-circle</v-icon>
              Reset
            </v-btn>
            <v-btn outlined type="submit" color="primary">
              <v-icon left>mdi-filter-check</v-icon>
              Apply
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-expand-transition>

    <v-card tile flat v-if="!show">
      <template v-if="objectCheckValue(filter_after_apply)">
        <v-divider></v-divider>
        <div class="px-4 py-2">
          <template v-for="(item, key) in filter_after_apply">
            <v-chip small class="mr-2 mb-1" v-if="item.value" :key="key" close @click:close="removeFilter(key)">
              <strong>{{ item.label }}:</strong>&nbsp; <span class="filter-chip-value">{{ item.value }}</span>
            </v-chip>
          </template>
        </div>
      </template>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ['show', 'submitFilter'],

  name: 'UserFilter',

  data() {
    return {
      filter: {
        name: null,
        status: null,
      },

      filter_after_apply: {
        name: {
          label: 'Name',
          value: null,
        },
        status: {
          label: 'Status',
          value: null,
        },
      },

      status_options: [
        { value: '1', text: 'Active' },
        { value: '2', text: 'Inactive' },
      ],
    };
  },

  computed: {
    formFilter() {
      return this.filter;
    },
  },

  methods: {
    setFilter() {
      this.submitFilter(this.formFilter);
      this.filterAfterApply();
    },

    filterAfterApply() {
      let status = '';
      if (this.filter.status == 1) {
        status = 'Active';
      } else if (this.filter.status == 2) {
        status = 'Inactive';
      }

      this.filter_after_apply.name.value = this.filter.name;
      this.filter_after_apply.status.value = status;
    },

    resetFilter() {
      this.$refs.form_filter.reset();
      this.submitFilter();
      this.filterAfterApply();
    },

    getFilter() {
      let dataFilter = this.$route.query.filter ? JSON.parse(this.$route.query.filter) : {};
      this.filter = dataFilter;
      this.filterAfterApply();
    },

    removeFilter(data) {
      this.filter[data] = null;
      this.submitFilter(this.formFilter);
      this.filterAfterApply();
    },
  },

  mounted() {
    this.getFilter();
  },
};
</script>

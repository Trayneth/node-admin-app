<template>
  <div>
    <v-expand-transition>
      <v-card v-show="show" tile flat>
        <v-form ref="form_filter" @submit.prevent="setFilter()">
          <v-card-text>
            <v-row>
              <v-col cols="2">
                <v-text-field
                  v-model="filter.key"
                  v-bind="input_option"
                  class="table-filter-input"
                  label="Key:"
                ></v-text-field>
              </v-col>

              <v-col cols="2">
                <v-text-field
                  v-model="filter.value"
                  v-bind="input_option"
                  class="table-filter-input"
                  label="Value:"
                ></v-text-field>
              </v-col>

              <v-col cols="2">
                <v-autocomplete
                  v-model="filter.status"
                  :items="status_options"
                  placeholder="-- All --"
                  v-bind="input_option"
                  class="table-filter-input"
                  label="Status:"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions class="mx-2">
            <v-spacer></v-spacer>
            <v-btn outlined color="secondary" :disabled="isDataLoading" @click="resetFilter">
              <v-icon left>mdi-close-circle</v-icon>
              Reset
            </v-btn>
            <v-btn type="submit" outlined color="primary" :disabled="isDataLoading">
              <v-icon left>mdi-filter-check</v-icon>
              Apply
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-expand-transition>

    <v-card v-if="!show" tile flat>
      <template v-if="objectCheckValue(filter_after_apply)">
        <v-divider></v-divider>
        <div class="px-4 py-2">
          <template v-for="(item, key) in filter_after_apply">
            <v-chip v-if="item.value" :key="key" small label class="mr-2 mb-1" close @click:close="removeFilter(key)">
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
  name: 'TranslationFilter',
  props: ['show', 'submitFilter'],

  data() {
    return {
      filter: {
        key: null,
        value: null,
        platform: null,
        status: 1,
      },

      filter_after_apply: {
        key: {
          label: 'Key',
          value: null,
        },
        value: {
          label: 'Value',
          value: null,
        },
        platform: {
          label: 'Platform',
          value: null,
        },
        status: {
          label: 'Status',
          value: null,
        },
      },

      plalform_options: [
        { value: 1, text: 'Admin' },
        { value: 2, text: 'Driver Mobile' },
        { value: 3, text: 'Shop Mobile' },
      ],
    };
  },

  computed: {
    formFilter() {
      return this.filter;
    },
  },

  mounted() {
    this.getFilter();
  },

  methods: {
    setFilter() {
      this.submitFilter(this.formFilter);
      this.filterAfterApply();
    },

    resetFilter() {
      this.$refs.form_filter.reset();
      this.submitFilter();
      this.filterAfterApply();
    },

    getFilter() {
      const dataFilter = this.$route.query.filter ? JSON.parse(this.$route.query.filter) : {};
      this.filter = dataFilter;
      this.filterAfterApply();
    },

    filterAfterApply() {
      const dataFilter = this.formFilter;

      let platform = '';
      if (dataFilter.platform === 1) {
        platform = 'Admin';
      } else if (dataFilter.platform === 2) {
        platform = 'Driver Mobile';
      } else if (dataFilter.platform === 3) {
        platform = 'Shop Mobile';
      }
      let status = '';
      if (dataFilter.status === 1) {
        status = 'Active';
      } else if (dataFilter.status === 2) {
        status = 'Inactive';
      }
      this.filter_after_apply.key.value = dataFilter.key;
      this.filter_after_apply.value.value = dataFilter.value;
      this.filter_after_apply.platform.value = platform;
      this.filter_after_apply.status.value = status;
    },

    removeFilter(data) {
      this.filter[data] = null;
      this.submitFilter(this.formFilter);
      this.filterAfterApply();
    },
  },
};
</script>

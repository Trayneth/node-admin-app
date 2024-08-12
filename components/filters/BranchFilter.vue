<template>
  <div>
    <v-expand-transition>
      <v-card v-show="show" tile flat>
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
                <v-text-field
                  v-model="filter.phone_number"
                  v-bind="input_option"
                  class="table-filter-input"
                  label="Phone Number:"
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

          <v-card-actions class="mx-2">
            <v-spacer></v-spacer>
            <v-btn outlined color="secondary" @click="resetFilter">
              <v-icon left>mdi-close-circle</v-icon>
              Reset
            </v-btn>
            <v-btn type="submit" outlined color="primary">
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
  name: 'RoleFilter',
  props: ['show', 'submitFilter'],

  data() {
    return {
      filter: {
        name: null,
        phone_number: null,
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

  mounted() {
    this.getFilter();
  },

  methods: {
    setFilter() {
      this.submitFilter(this.formFilter);
      this.filterAfterApply();
    },

    filterAfterApply() {
      let status = '';
      if (this.filter.status === 1) {
        status = 'Active';
      } else if (this.filter.status === 2) {
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
      const dataFilter = this.$route.query.filter ? JSON.parse(this.$route.query.filter) : {};
      this.filter = dataFilter;
      this.filterAfterApply();
    },

    removeFilter(data) {
      this.filter[data] = null;
      this.submitFilter(this.formFilter);
      this.filterAfterApply();
    },
  },
};
</script>

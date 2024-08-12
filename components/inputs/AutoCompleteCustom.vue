<template>
  <div id="auto-complete-custom">
    <v-autocomplete
      :value="value"
      :items="data_lists"
      :placeholder="placeholder"
      v-bind="input_option"
      :item-text="itemText"
      item-value="id"
      :return-object="returnObject"
      :search-input.sync="search"
      :multiple="isMultiple"
      :rules="
        isRequired
          ? [
              isMultiple
                ? requiredSelect(requiredLabel)
                : required(requiredLabel),
            ]
          : []
      "
      :error-messages="errorField ? handleError(errorField) : []"
      @change="onChangeItem"
    >
      <template #append-item>
        <div v-intersect.quiet="getMoreData" class="text-center">
          <v-progress-circular
            v-if="isDataLoading"
            :width="3"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </div>
      </template>

      <template v-if="vChip" #item="{ item }">
        <span class="mr-2">{{ item.name }}</span>
        <v-chip color="red" label small dark> ${{ item[vChipValue] }} </v-chip>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
export default {
  name: 'AutoCompleteCustom',

  props: {
    value: {
      type: [String, Array,Number,Object],
      default: null,
    },
    items: {
      type: Array,
      default() {
        return [];
      },
    },
    placeholder: {
      type: String,
      default: null,
    },
    requestUrl: {
      type: String,
      default: null,
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
    isMultiple: {
      type: Boolean,
      default: false,
    },
    errorField: {
      type: String,
      default: null,
    },
    errorMessages: {
      type: [Array, Object],
      default() {
        return [];
      },
    },
    requiredLabel: {
      type: String,
      default: null,
    },
    itemText: {
      type: String,
      default: 'name',
    },
    vChip: {
      type: Boolean,
      default: false,
    },
    vChipValue: {
      type: String,
      default: null,
    },
    returnObject: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      data_lists: [],
      error_messages: [],
      option: {
        per_page: 10,
        page: 1,
        last_page: false,
      },
      search: '',
    };
  },

  watch: {
    search(val) {
      if (val) {
        this.getData(val);
      }
    },

    requestUrl(val) {
      if (val) {
        this.data_lists = [];
        this.getData();
      }
    },

    errorMessages(val) {
      this.error_messages = val;
    },
  },

  created() {
    this.getData();
  },

  methods: {
    onChangeItem(data) {
      this.$emit('input', data);
    },

    getMoreData(entries, observer, isIntersecting) {
      if (isIntersecting) {
        /* eslint-disable no-unused-expressions */
        this.option.last_page ? this.option.page : this.option.page++;
        this.getData();
      }
    },

    async getData(search = '') {
      const res = await this.$axios
        .$get(
          `${process.env.API_SECRET_PREFIX}${this.requestUrl}?page=${
            search ? 1 : this.option.page
          }&per_page=${this.option.per_page}&search=${search}`
        )
        .catch((e) => {});

      if (res) {
        if (res.data.length < this.option.per_page) {
          this.option.last_page = true;
        } else {
          this.option.last_page = false;
        }
        this.data_lists = [...this.data_lists, ...res.data];
      }
    },
  },
};
</script>

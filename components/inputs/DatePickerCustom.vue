<template>
  <div class="date-picker-custom">
    <template v-if="!dob">
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template #activator="{ on, attrs }">
          <v-text-field
            :value="computedDateFormattedMomentjs"
            prepend-inner-icon="mdi-calendar"
            :placeholder="place_holder"
            readonly
            v-bind="attrs"
            hide-details="auto"
            outlined
            dense
            clearable
            :rules="is_required ? [required()] : []"
            :error-messages="handleError(error_field)"
            v-on="on"
            @click:clear="clearDate()"
            @change="onChangeItem"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" @input="onInputDate()"></v-date-picker>
      </v-menu>
    </template>

    <template v-else-if="dob">
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template #activator="{ on, attrs }">
          <v-text-field
            :value="computedDateFormattedMomentjs"
            :placeholder="place_holder"
            prepend-inner-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            hide-details="auto"
            outlined
            dense
            clearable
            :rules="is_required ? [required()] : []"
            :error-messages="handleError(error_field)"
            v-on="on"
            @click:clear="clearDate()"
            @change="onChangeItem"
          ></v-text-field>
        </template>

        <v-date-picker
          v-model="date"
          :active-picker.sync="active_picker"
          :max="new Date().toISOString().substr(0, 10)"
          min="1950-01-01"
          @change="save"
        ></v-date-picker>
      </v-menu>
    </template>
  </div>
</template>

<script>
export default {
  name: 'DatePickerCustom',

  props: {
    value: {
      type: String,
      default: null,
    },
    is_required: {
      type: Boolean,
      default: false,
    },
    dob: {
      type: Boolean,
      default: false,
    },
    error_field: {
      type: String,
      default: null,
    },
    place_holder: {
      type: String,
      default: 'year-month-day',
    },
    error_messages: {
      type: [Array, Object],
      default() {
        return [];
      },
    },
    date_format: {
      type: String,
      default: 'YYYY-MM-DD HH:mm',
    },
    current_date: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      menu: false,
      date: this.value
        ?? '',
      active_picker: null,
    };
  },

  computed: {
    computedDateFormattedMomentjs() {
      return this.date ? this.$moment(this.date).format(this.date_format) : '';
    },
  },

  watch: {
    menu(val) {
      val && setTimeout(() => (this.active_picker = 'YEAR'));
    },

    value(val) {
      this.date = val;
    },
  },

  methods: {
    onChangeItem(data) {
      this.$emit('input', data);
    },

    clearDate() {
      this.date = null;
      this.$emit('input', null);
    },

    onInputDate() {
      this.menu = false;
      this.$emit('input', this.date);
    },

    save(date) {
      this.$refs.menu.save(date);
      this.$emit('input', this.date);
    },
  },
};
</script>

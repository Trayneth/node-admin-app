<template>
    <div class="row">
      <div class="col-12">
        <v-file-input
          v-model="field.text"
          class="mt-4"
          :class="classInput"
          dense
          outlined
          accept="image/*"
          hide-details="auto"
          prepend-icon=""
          prepend-inner-icon="mdi-camera"
          :label="`${field.label}${field.required ? ' *' : ''}`"
          show-size
          :required="field.required"
          :error-messages="error"
          :rules="
            field.required
              ? [() => !!field.text || `This field is required.`]
              : []
          "
        >
          <template v-slot:selection="{ text, file }">
            <div class="mb-3 mt-3" style="width: 100%">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-img
                    :max-height="preview.height"
                    :max-width="preview.width"
                    fit
                    :src="imageAfterSelected(file)"
                    alt=""
                    v-bind="attrs"
                    v-on="on"
                  ></v-img>
                </template>
                <span class="ml-3">{{ text }}</span>
              </v-tooltip>
            </div>
          </template>
        </v-file-input>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "cFileInput",
    props: {
      fields: "",
      error: "",
      preview: {
        height: {
          type: Number,
          default: 200,
        },
        width: {
          type: Number,
          default: 200,
        },
      },
      classInput: "",
    },
    data() {
      return {
        field: this.fields,
      };
    },
    methods: {
      imageAfterSelected(file) {
        if (file) {
          return URL.createObjectURL(file);
        }
      },
    },
    created() {
      this.$emit("fields", this.field);
    },
  };
  </script>
  
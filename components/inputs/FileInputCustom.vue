<template>
  <div>
    <v-card outlined>
      <v-card-text>
        <v-img
          v-if="image"
          height="250"
          contain
          :src="image ? image_preview : require('~/assets/images/default/camera.png')"
        ></v-img>
        <v-img
          v-else
          height="250"
          contain
          :src="image_src ? `/${image_src}` : require('~/assets/images/default/camera.png')"
        ></v-img>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions v-if="image_src && show_remove_button" class="d-flex justify-center">
        <v-btn @click="delete_image">
          <v-icon color="red">mdi-delete</v-icon>
          {{ $t('Remove') }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-file-input
      v-model="image"
      accept="image/png, image/jpeg, image/bmp"
      placeholder="Browse Image"
      prepend-inner-icon="mdi-camera"
      prepend-icon=""
      v-bind="input_option"
      class="mt-2"
      :error-messages="errorField ? handleError(errorField) : []"
      show-size
      :rules="isRequired ? [required()] : []"
      @change="selectImage"
      @click:clear="clearImagePreview()"
    ></v-file-input>
    <div v-if="image && show_upload === true && !disableUpload" class="text-center" >
      
      <v-btn color="primary" class="mt-2" @click="submit">
        {{ $t('Upload') }}
      </v-btn>
    </div>
    <!-- <div v-if="image && show_upload === true && !disableUpload" class="text-center">
      <v-btn color="primary" class="mt-2" @click="submit">
        {{ $t('Upload') }}
      </v-btn>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'FileInputCustom',
  props: {
    submit: {
      type: Function,
      required: true,
    },
    errorMessages: {
      type: [Array, Object],
      required: false,
      default: () => [],
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
    value: {
      type: File,
      required: false,
    },
    image_src: {
      type: String,
      required: false,
      default: false,
    },
    errorField: {
      type: String,
      default: null,
    },
    delete_image: {
      type: Function,
      required: false,
      default: () => null,
    },
    show_upload: {
      type: Boolean,
      required: false,
      default: true,
    },
    show_remove_button: {
      type: Boolean,
      required: false,
      default: true,
    },
    disableUpload: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data() {
    return {
      image: null,
      image_size: null,
      image_preview: null,
      error_messages: [],
    };
  },

  watch: {
    value(val) {
      this.image = val;
    },
    errorMessages(val) {
      this.error_messages = val;
    },
  },
  // mounted() {
  //   console.log(this.errorField);
  // },
  methods: {
    async selectImage(e) {
      const file = e;
      if (!file) return;
      const readData = (f) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(f);
        });
      const data = await readData(file);
      this.image_size = `${(file.size / 1000 / 1000).toFixed(1)} MB`;
      this.image_preview = data;
      this.$emit('input', file);
    },

    clearImagePreview() {
      this.image_preview = null;
      this.image_size = null;
    },
  },
};
</script>

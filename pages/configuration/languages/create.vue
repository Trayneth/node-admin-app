<template>
  <div id="create-language">
    <v-container>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <label class="custom-label">Language <strong class="red--text">*</strong></label>
                    <v-text-field
                      label="Language"
                      v-bind="aditi_input_option"
                      v-model="lang"
                      :rules="[required('Name')]"
                      :error-messages="handleError('name')"
                    />
                  </v-col>
                  <v-col cols="12">
                    <label class="custom-label">Locale <strong class="red--text">*</strong></label>
                    <v-text-field
                      label="locale(en or jp)"
                      v-bind="aditi_input_option"
                      v-model="local"
                      :rules="[required('Name')]"
                      :error-messages="handleError('name')"
                    />
                  </v-col>

                  <v-col cols="12">
                    <label class="custom-label">Status *</label>
                    <v-autocomplete
                      v-model="status"
                      placeholder="-- Select Status --"
                      auto-select-first
                      :items="status_options"
                      v-bind="input_option"
                      :rules="[required()]"
                      :error-messages="handleError('status')"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12 " class="text-right">
            <v-btn :disabled="isDataLoading" class="action" color="secondary" @click="goBack">
              <v-icon left>mdi-chevron-left-circle</v-icon>
              {{ $t('action_back') }}</v-btn
            >

            <v-btn class="action ml-2" color="primary" :disabled="isDataLoading" @click="submitLanguage">
              <v-icon left>mdi-content-save</v-icon>
              {{ $t('action_save') }}</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import create from '/js/pages/language/create';
export default {
  name: 'create',
  mixins: [create],
};
</script>

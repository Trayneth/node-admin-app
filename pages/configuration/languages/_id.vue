<template>
  <div id="update-language">
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
                      v-bind="aditi_input_option" v-model="lang"
                      :rules="[required('Name')]"
                      :error-messages="handleError('name')"
                    />
                  </v-col>
                  <v-col cols="12">
                    <label class="custom-label">Locale <strong class="red--text">*</strong></label>
                    <v-text-field
                      label="locale(en or jp)"
                      v-bind="aditi_input_option" v-model="local"
                      :rules="[required('Name')]"
                      :error-messages="handleError('name')"
                    />
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
import update from '/js/pages/language/update'
export default {
  name: "_id",
  mixins:[update]
}
</script>

<style scoped>
</style>

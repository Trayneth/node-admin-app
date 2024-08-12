<template>
  <div class="page-container">
    <v-breadcrumbs :items="breadcrumb_items">
      <template #item="{ item }">
        <v-breadcrumbs-item :to="item.to" link :disabled="item.disabled" exact>
          <v-chip :color="!item.disabled ? 'primary' : ''" small label outlined>{{ item.text }}</v-chip>
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-card-text>
            <v-form ref="form_translation" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12">
                  <v-btn-toggle
                    v-model="select_language"
                    mandatory
                    dense
                    color="primary"
                  >
                    <v-btn
                      v-for="lang in language_options"
                      :key="lang.title"
                      :value="lang"
                    >{{ lang.language }}</v-btn
                    >
                  </v-btn-toggle>
                </v-col>
                <v-col cols="12">
                  <label class="custom-label">Key <strong class="red--text">*</strong></label>
                  <v-text-field
                    label="Key"
                    v-model="key"
                    :rules="[required()]"
                    v-bind="input_option_not_clear"
                    :error-messages="handleError('key')"
                    readonly
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <label class="custom-label">Value <strong class="red--text">*</strong></label>
                  <v-text-field
                    :label="getDynamicLabel('Value')"
                    v-model="value[select_language.title]"
                    :rules="[requiredWithLang(value['en'],'Value')]"
                    v-bind="input_option"
                    :error-messages="handleError('value')"
                  ></v-text-field>
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
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12 " class="text-right">
        <v-btn :disabled="isDataLoading" class="action" color="secondary" @click="goBack">
          <v-icon left>mdi-chevron-left-circle</v-icon>
          {{ $t('action_back') }}</v-btn
        >

        <v-btn class="action ml-2" color="primary" :disabled="isDataLoading" @click="submit">
          <v-icon left>mdi-content-save</v-icon>
          {{ $t('action_save') }}</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>
<script>
import edit from '@/js/pages/configuration/translation/edit.js';
export default {
  name: 'EditTranslationPage',
  mixins: [edit],
};
</script>

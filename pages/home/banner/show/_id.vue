<template>
  <div class="page-container">
    <v-row>
      <v-col cols="12">
        <v-breadcrumbs :items="breadcrumb_items">
          <template #item="{ item }">
            <v-breadcrumbs-item :to="item.to" link :disabled="item.disabled" exact>
              <v-chip :color="!item.disabled ? 'primary' : ''" small label outlined>{{ item.text }}</v-chip>
            </v-breadcrumbs-item>
          </template>
        </v-breadcrumbs>
        <v-form ref="formBanner" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="8">
              <v-card outlined>
                <v-card-text>
                  <v-row>
                    <v-col cols="12">
                      <v-btn-toggle v-model="select_language" mandatory dense color="primary">
                        <v-btn v-for="lang in language_options" :key="lang.title" :value="lang">{{
                          lang.language
                        }}</v-btn>
                      </v-btn-toggle>
                      <v-row>
                        <v-col cols="12">
                          <label class="custom-label">Title *</label>
                          <v-text-field
                            :label="getDynamicLabel('Title')"
                            v-bind="input_option"
                            v-model="title[select_language.title]"
                            :rules="[requiredWithLang(title['en'], 'Title')]"
                            :error-messages="handleError('title')"
                            readonly
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12">
                          <label class="custom-label">Title Btn </label>
                          <v-text-field
                            :label="getDynamicLabel('Description')"
                            v-bind="input_option"
                            v-model="title_btn[select_language.title]"
                            :rules="[requiredWithLang(title_btn['en'], 'Title Btn')]"
                            readonly
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12">
                          <label class="custom-label">Link </label>
                          <v-text-field
                            v-bind="input_option"
                            v-model="link"
                            :rules="[required()]"
                            :error-messages="handleError('link')"
                            placeholder="https://www.example.com"
                            readonly
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12">
                          <label class="custom-label">Order Number *</label>
                          <v-text-field
                            type="number"
                            v-bind="input_option"
                            v-model="order_number"
                            :rules="[required()]"
                            :error-messages="handleError('order_number')"
                            placeholder="1"
                            readonly
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12">
                          <label class="custom-label">Description </label>
                          <CKEditorField
                            :label="getDynamicLabel('Description')"
                            v-bind="input_option"
                            v-model="description[select_language.title]"
                            :rules="[requiredWithLang(description['en'], 'Description')]"
                            :error-messages="handleError('description')"
                            readonly
                          />
                        </v-col>

                        <v-col cols="12">
                          <label class="custom-label">Status *</label>
                          <v-select
                            :label="getDynamicLabel('Status')"
                            v-bind="input_option"
                            v-model="status"
                            :items="status_options"
                            readonly
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="4">
              <v-card outlined>
                <v-card-text>
                  <v-row>
                    <v-col cols="12">
                      <label class="custom-label">Image </label>
                      <FileInputCustom
                        v-model="image"
                        :error-messages="error_messages"
                        error-field="image"
                        :image_src="image_src"
                        :disableUpload="true"
                        :submit="() => {}"
                        :delete_profile="() => {}"
                        :show_remove_button="false"
                        readonly
                      />
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12 " class="text-right">
        <v-btn :disabled="isDataLoading" class="action" color="secondary" @click="goBack">
          <v-icon left>mdi-chevron-left-circle</v-icon>
          {{ $t('action_back') }}</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
import edit from '@/js/pages/home/banner/show.js';
import CKEditor from '@/components/inputs/CKEditor.vue';

export default {
  name: 'Bannereditpage',
  mixins: [edit],
  components: {
    CKEditorField: CKEditor,
  },
};
</script>

<template>
  <div class="page-container">
    <v-breadcrumbs :items="breadcrumb_items">
      <template #item="{ item }">
        <v-breadcrumbs-item :to="item.to" link :disabled="item.disabled" exact>
          <v-chip :color="!item.disabled ? 'primary' : ''" small label outlined>{{ item.text }}</v-chip>
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>

    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12">
          <v-card outlined>
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <v-card outlined>
                    <v-card-text>
                      <v-row>
                        <v-btn-toggle v-model="select_language" mandatory dense color="primary">
                          <v-btn v-for="lang in language_options" :key="lang.title" :value="lang">{{
                            lang.language
                          }}</v-btn>
                        </v-btn-toggle>
                        <v-col cols="12 ">
                          <div class="v-toolbar__title-home">Category</div>
                        </v-col>

                        <v-col cols="12">
                          <label class="custom-label">Category Title</label>
                          <v-text-field
                            :label="getDynamicLabel('Category Title')"
                            v-bind="input_option"
                            v-model="category_title[select_language.title]"
                            :rules="[requiredWithLang(category_title['en'], 'category_title')]"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12">
                          <label class="custom-label">Description</label>
                          <CKEditorField
                            :label="getDynamicLabel('Description')"
                            v-bind="aditi_input_option"
                            v-model="category_description[select_language.title]"
                          />
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>

                  <v-card outlined>
                    <v-card-text>
                      <v-row>
                        <v-col cols="12">
                          <div class="v-toolbar__title-home">About</div>
                        </v-col>
                        <v-col cols="12">
                          <label class="custom-label">About Title</label>
                          <v-text-field
                            :label="getDynamicLabel('About Title')"
                            v-bind="input_option"
                            v-model="about_title[select_language.title]"
                            :rules="[requiredWithLang(about_title['en'], 'Title')]"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12">
                          <label class="custom-label">About Description</label>
                          <CKEditorField
                            :label="getDynamicLabel('About Description')"
                            v-bind="input_option"
                            v-model="about_description[select_language.title]"
                            :rules="[requiredWithLang(about_description['en'], 'Description')]"
                          />
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>

                  <!-- <v-card outlined>
                    <v-card-text>
                      <v-row>
                        <v-col cols="12 ">
                          <div class="v-toolbar__title-home">Object Description</div>
                        </v-col>
                        <v-col cols="12">
                          <label class="custom-label">Object Description</label>
                          <v-text-field
                            :label="getDynamicLabel('Object Description')"
                            v-bind="input_option"
                            v-model="object_description[select_language.title]"
                            :rules="[requiredWithLang(object_description['en'], 'Description')]"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card> -->
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- <v-col cols="12">
          <v-card outlined>
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <div class="v-toolbar__title-home">Object Description</div>
                </v-col>
                <v-col
                  v-for="(description, index) in objectDescriptions"
                  :key="index"
                  cols="12"
                  class="d-flex align-center"
                >
                  <v-text-field
                    :label="getDynamicLabel('Object Description ' + (index + 1))"
                    v-bind="input_option"
                    v-model="description[select_language.title]"
                    :rules="[requiredWithLang(description['en'], 'Description')]"
                    class="flex-grow-1"
                  ></v-text-field>
                  <v-btn icon color="error" @click="removeDescription(index)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="12">
                  <v-btn icon color="primary" @click="addDescription">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col> -->
      </v-row>
    </v-form>
    <v-row>
      <v-col cols="12 " class="text-right">
        <v-btn class="action ml-2" color="primary" :disabled="isDataLoading" @click="submit">
          <v-icon left>mdi-content-save</v-icon>
          {{ $t('action_save') }}</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
import index from '@/js/pages/home/home-content/index.js';
import CKEditor from '@/components/inputs/CKEditor.vue';

export default {
  name: 'HomeContentpage',
  mixins: [index],
  components: {
    CKEditorField: CKEditor,
  },
};
</script>

<style>
.v-toolbar__title-home dark {
  display: inline-block; /* Make the element inline block */
  padding: 5px 10px; /* Add padding to create space around the text */
  background-color: #f0f0f0; /* Set the background color */
  border-radius: 5px; /* Optionally, add border-radius for rounded corners */
}
</style>

<template>
  <div class="page-container">
    <v-form ref="form_settings">
      <v-row>
        <v-col cols="8">
          <v-card outlined>
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <label class="custom-label">App Name  <strong class="red--text">*</strong></label>
                  <v-text-field
                    v-model="settings.app_name"
                    placeholder="App Name"
                    v-bind="input_option"
                    :rules="[required()]"
                    :error-messages="handleError('App Name')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <label class="custom-label">Phone Number  <strong class="red--text">*</strong></label>
                  <v-text-field
                    v-model="settings.phone_number"
                    placeholder="Phone Number"
                    v-bind="input_option"
                    :rules="[required()]"
                    type="number"
                    :error-messages="handleError('phone_number')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <label class="custom-label">Email <strong class="red--text">*</strong></label>
                  <v-text-field
                    v-model="settings.email"
                    placeholder="Email"
                    v-bind="input_option"
                    :error-messages="handleError('email')"
                  ></v-text-field>
                </v-col>


                <v-col cols="12">
                  <label class="custom-label">Address <strong class="red--text">*</strong></label>
                  <v-textarea
                    v-model="settings.address"
                    placeholder="Address"
                    v-bind="input_option"
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <label class="custom-label">Description <strong class="red--text">*</strong></label>
                  <v-textarea
                    v-model="settings.description"
                    placeholder="description"
                    v-bind="input_option"
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <label class="custom-label">Copyright </label>
                  <v-text-field
                    v-model="settings.copyright"
                    placeholder="Copyright"
                    v-bind="input_option"
                    :error-messages="handleError('copyright')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <label class="custom-label">Develop By </label>
                  <v-text-field
                    v-model="settings.develop"
                    placeholder="Develop By"
                    v-bind="input_option"
                    :error-messages="handleError('develop')"
                  ></v-text-field>
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
                  <label class="custom-label">App Logo</label>
                  <FileInputCustom
                    v-model="settings.app_logo"
                    :error-messages="error_messages"
                    error-field="app_logo"
                    :submit="() =>{}"
                    :delete_image="() => {}"
                    :disableUpload="true"
                    :image_src="settings.app_logo_src"
                    :show_remove_button="false"
                  />
                </v-col>
                <v-col cols="12">
                  <label class="custom-label">Small logo</label>
                  <FileInputCustom
                    v-model="settings.small_logo"
                    :error-messages="error_messages"
                    error-field="small_logo"
                    :submit="() =>{}"
                    :delete_image="() => {}"
                    :disableUpload="true"
                    :image_src="settings.small_logo_src"
                    :show_remove_button="false"
                  />
                </v-col>
                <v-col cols="12">
                  <label class="custom-label">Favicon</label>
                  <FileInputCustom
                    v-model="settings.favicon"
                    :error-messages="error_messages"
                    error-field="favicon"
                    :submit="() =>{}"
                    :delete_image="() => {}"
                    :disableUpload="true"
                    :image_src="settings.favicon_src"
                    :show_remove_button="false"
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12 " class="text-right">
          <v-btn class="action ml-2" color="primary" :disabled="isDataLoading" @click="submit">
            <v-icon left>mdi-content-save</v-icon>
            {{ $t('action_save') }}</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
    <!-- <ConfirmDelete ref="confirm" /> -->
  </div>
</template>

<script>
import index from '@/js/pages/configuration/setting/index.js';

export default {
  name: 'SettingPage',
  mixins: [index],
};
</script>

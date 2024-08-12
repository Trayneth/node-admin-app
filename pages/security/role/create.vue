<template>
  <div class="page-container">
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-card-text>
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-row>
                <v-col cols="12">
                  <label class="custom-label">Name <strong class="red--text">*</strong></label>
                  <v-text-field
                    v-model="role.name"
                    placeholder="Name"
                    :rules="[required()]"
                    v-bind="input_option"
                    :error-messages="handleError('name')"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <label class="custom-label">Description</label>
                  <v-textarea
                    v-model="role.description"
                    placeholder="Description"
                    v-bind="input_option"
                    :error-messages="handleError('description')"
                  ></v-textarea>
                </v-col>

                <v-col cols="12">
                  <label class="custom-label">Status <strong class="red--text">*</strong></label>
                  <v-autocomplete
                    v-model="role.status"
                    placeholder="-- Select Status --"
                    :items="status_options"
                    v-bind="input_option"
                    :rules="[required()]"
                    auto-select-first
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
        <v-btn @click="goBack" :disabled="isDataLoading" class="action" color="secondary">
          <v-icon left>mdi-chevron-left-circle</v-icon>
          {{ $t('action_back') }}</v-btn
        >

        <v-btn class="action ml-2" color="primary" @click="submit" :disabled="isDataLoading">
          <v-icon left>mdi-content-save</v-icon>
          {{ $t('action_save') }}</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
import create from '@/js/pages/security/role/create.js';
export default {
  name: 'CreateRolePage',
  mixins: [create],
};
</script>

<template>
  <div class="page-container overflow-y-auto overflow-x-hidden">
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-card-text>
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-row>
                <v-col cols="12">
                  <label class="custom-label">Current Password  <strong class="red--text">*</strong></label>
                  <v-text-field
                    v-model="current_password"
                    placeholder="Current Password"
                    :rules="[required()]"
                    v-bind="input_option"
                    type="password"
                    :error-messages="handleError('current_password')"
                  ></v-text-field>
                </v-col>

                <!-- Old Password -->
                <v-col cols="12">
                  <label class="custom-label">New Password  <strong class="red--text">*</strong></label>
                  <v-text-field
                    v-model="new_password"
                    placeholder="New Password"
                    :rules="[required()]"
                    v-bind="input_option"
                    type="password"
                    :error-messages="handleError('new_password')"
                  ></v-text-field>
                </v-col>

                <!-- Confirm new Password -->
                <v-col cols="12">
                  <label class="custom-label">Confirm new Password  <strong class="red--text">*</strong></label>
                  <v-text-field
                    v-model="confirm_new_password"
                    placeholder="Confirm new Password"
                    :rules="[required()]"
                    v-bind="input_option"
                    type="password"
                    :error-messages="handleError('confirm_new_password')"
                  ></v-text-field>
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
import changePassword from "@/js/pages/profile/change-password.js";

export default {
  name: "ChangeUserPasswordPage",

  mixins: [changePassword],
};
</script>

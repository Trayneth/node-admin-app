<template>
  <div class="page-container overflow-y-auto overflow-x-hidden">
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-card-text>
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-row>
                <v-col cols="6">
                  <label class="custom-label">Name *</label>
                  <v-text-field
                    v-model="name"
                    placeholder="Name"
                    v-bind="input_option"
                    :rules="[required('Name')]"
                    :error-messages="handleError('name')"
                  ></v-text-field>
                </v-col>

                <v-col cols="6">
                  <label class="custom-label">Username *</label>
                  <v-text-field
                    v-model="username"
                    placeholder="Username"
                    v-bind="input_option"
                    :rules="[required('Username')]"
                    :error-messages="handleError('username')"
                  ></v-text-field>
                </v-col>

                <v-col cols="6">
                  <label class="custom-label">Email *</label>
                  <v-text-field
                    v-model="email"
                    placeholder="Email"
                    v-bind="input_option"
                    :rules="[required('Email')]"
                    :error-messages="handleError('email')"
                  ></v-text-field>
                </v-col>

                <v-col cols="6">
                  <label class="custom-label">Phone *</label>
                  <v-text-field
                    v-model="phone"
                    placeholder="Phone"
                    v-bind="input_option"
                    :error-messages="handleError('phone')"
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
import editProfile from "@/js/pages/profile/edit.js";

export default {
  name: "EditProfilePage",
  mixins: [editProfile],
};
</script>

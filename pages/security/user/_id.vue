<template>
  <div class="page-container">
    <v-form v-model="valid" ref="form_user" lazy-validation>
      <v-row>
        <v-col cols="6">
          <v-card outlined>
            <v-card-text>
              <v-row>
                <v-col cols="6">
                  <label class="custom-label">Name <strong class="red--text">*</strong></label>
                  <v-text-field
                    v-model="user.name"
                    placeholder="Name"
                    v-bind="input_option"
                    :rules="[required()]"
                    :error-messages="handleError('name')"
                  ></v-text-field>
                </v-col>

                <v-col cols="6">
                  <label class="custom-label">Email</label>
                  <v-text-field
                    v-model="user.email"
                    placeholder="Email"
                    v-bind="input_option"
                    :error-messages="handleError('email')"
                  ></v-text-field>
                </v-col>

                <v-col cols="6">
                  <label class="custom-label">Join Date </label>
                  <date-picker-custom
                    v-model="user.join_date"
                    :is_required="false"
                    error_field="join_date"
                    :error_messages="error_messages"
                  ></date-picker-custom>
                </v-col>

                <v-col cols="6">
                  <label class="custom-label">Status <strong class="red--text">*</strong></label>
                  <v-autocomplete
                    v-model="user.status"
                    placeholder="-- Select Status --"
                    auto-select-first
                    :items="status_options"
                    v-bind="input_option"
                    :rules="[required()]"
                    :error-messages="handleError('status')"
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card outlined>
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <label class="custom-label">Roles <strong class="red--text">*</strong></label>
                  <v-autocomplete
                    v-model="user.roles"
                    placeholder="-- Select Roles --"
                    :items="roles"
                    v-bind="input_option"
                    item-text="name"
                    item-value="id"
                    multiple
                    :small-chips="user.roles.length > 0 ? true : false"
                    :rules="[requiredSelect()]"
                    :error-messages="handleError('roles')"
                  >
                    <template v-slot:append-item>
                      <div v-intersect.quiet="getMoreRoleData" class="text-center">
                        <v-progress-circular
                          v-if="isDataLoading"
                          :width="3"
                          color="primary"
                          indeterminate
                          class="mb-3 mt-3"
                        ></v-progress-circular>
                      </div>
                    </template>
                  </v-autocomplete>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <label class="custom-label">Username <strong class="red--text">*</strong></label>
                  <v-text-field
                    v-model="user.username"
                    placeholder="Username"
                    v-bind="input_option"
                    :rules="[required('Username')]"
                    :error-messages="handleError('username')"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-checkbox label="Change password" v-model="change_password" dense hide-details></v-checkbox>
                </v-col>

                <v-col cols="12" v-if="change_password">
                  <label class="custom-label">Password <strong class="red--text">*</strong></label>
                  <v-text-field
                    v-model="user.password"
                    placeholder="Password"
                    v-bind="input_option"
                    :type="show_password ? 'text' : 'password'"
                    :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show_password = !show_password"
                    :rules="[required('Password')]"
                    :error-messages="handleError('password')"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-form>

    <v-row>
      <v-col cols="12" class="text-right">
        <v-btn @click="goBack" :disabled="isDataLoading" class="action" color="secondary">
          <v-icon left>mdi-chevron-left-circle</v-icon>
          {{ $t('action_back') }}</v-btn
        >
        <v-btn class="ml-2" color="primary" @click="submit" :disabled="isDataLoading">
          <v-icon left>mdi-content-save</v-icon>
          {{ $t('action_save') }}</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
import edit from '@/js/pages/security/user/edit';
export default {
  name: 'EditUserPage',
  mixins: [edit],
};
</script>

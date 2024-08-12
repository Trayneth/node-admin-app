<template>
  <div class="page-container">
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-card-subtitle>User Information</v-card-subtitle>
          <v-card-text>
            <v-list dense>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Name: </v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>{{ user.name }}</v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Email: </v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>{{ user.email ? user.email:"N/A" }}</v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Join Date: </v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>{{ dateFormat(user.join_date) ? dateFormat(user.join_date) : "N/A"}}</v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Username: </v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>{{ user.username }}</v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Role: </v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-title>
                    <v-chip class="mr-2" small v-for="role in user.roles" :key="role.id">{{ role.name }}</v-chip>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Status: </v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-title>
                    <v-chip small :color="user.status == 1 ? 'primary' : ''">
                      <v-icon left small>{{ user.status == 1 ? 'mdi-check-circle' : 'mdi-close-circle' }}</v-icon>
                      {{ user.status == 1 ? 'Active' : 'Inactive' }}</v-chip
                    >
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12 " class="text-right">
        <v-btn @click="goBack" :disabled="isDataLoading" color="secondary">
          <v-icon left>mdi-chevron-left-circle</v-icon>
          {{ $t('action_back') }}</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
import show from '@/js/pages/security/user/show.js';
export default {
  mixins: [show],
};
</script>

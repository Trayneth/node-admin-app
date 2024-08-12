<template>
  <div class="index-page-container overflow-y-auto overflow-x-hidden px-5 py-5">
    <v-card outlined>
      <v-card-title>
        <v-btn outlined color="secondary" :to="localePath('/profile/change-password')"
          ><v-icon left>mdi-lock</v-icon> Change Password</v-btn
        >
        <v-btn class="ml-2" outlined color="primary" :to="localePath('/profile/edit')"
          ><v-icon left>mdi-pencil</v-icon> Edit Profile</v-btn
        >
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <v-row justify="center">
          <v-col cols="8" class="text-center">
            <v-avatar size="160" tile>
              <img src="~/assets/images/default/default-profile.png" class="mb-2" alt="" />
            </v-avatar>
            <h3>{{ $auth.user.user.name }}</h3>
            <div class="blue--text mb-2 mt-2">
              {{ $auth.user.user.email }}
            </div>

            <template v-if="$auth.user.roles.length > 0">
              <v-chip v-for="role in $auth.user.roles" :key="role.id" class="mx-2">{{ role.name }}</v-chip>
            </template>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="8">
            <v-container>
              <v-divider></v-divider>

              <v-container>
                <v-row>
                  <v-col cols="6">
                    <v-list-item>
                      <v-list-item-content>
                        <strong>Username:</strong>
                      </v-list-item-content>
                      <v-list-item-content>
                        {{ $auth.user.user.username }}
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>

                  <v-col cols="6">
                    <v-list-item>
                      <v-list-item-content>
                        <strong>Gender:</strong>
                      </v-list-item-content>
                      <v-list-item-content> </v-list-item-content>
                    </v-list-item>
                  </v-col>

                  <v-col cols="6">
                    <v-list-item>
                      <v-list-item-content>
                        <strong>Phone Number:</strong>
                      </v-list-item-content>
                      <v-list-item-content>
                        <div class="blue--text"></div>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>
              </v-container>
            </v-container>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import profile from '@/js/pages/profile/index.js';

export default {
  name: 'ProfilePage',

  mixins: [profile],
};
</script>

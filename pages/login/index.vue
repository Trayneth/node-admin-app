<template>
  <div id="login-page">
    <v-container>
      <v-row class="login-container" justify="center" align="center">
        <v-col cols="8" class="text-center">
          <v-card outlined class="login-card">
            <v-card-text>
              <v-row>
                <v-col cols="6">
                  <img src="~/assets/images/logo/small-logo.png" alt="" class="app-logo mt-5" />
                </v-col>
                <v-divider vertical></v-divider>
                <v-col cols="6" class="pa-8">
                  <v-form v-model="valid" ref="form_login" lazy-validation @submit.prevent="submit()">
                    <v-row>
                      <v-col cols="12" class="text-left">
                        <label class="custom-label">{{ $t('email') }} *</label>
                        <v-text-field
                          v-model="user.email"
                          :placeholder="$t('email')"
                          v-bind="input_option"
                          :rules="[required('email')]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" class="text-left">
                        <label class="custom-label">{{ $t('password') }} *</label>
                        <v-text-field
                          v-model="user.password"
                          :placeholder="$t('password')"
                          type="password"
                          v-bind="input_option"
                          :rules="[required('Password')]"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row class="mt-5">
                      <v-col cols="12">
                        <v-btn depressed type="submit" color="primary" :disabled="isDataLoading">{{
                          $t('btn_login')
                        }}</v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<i18n>
{
  "en": {
    "username": "Username",
    "password": "Password",
    "btn_login": "Login"
  },
  "kh": {
    "username": "ឈ្មោះ​អ្នកប្រើប្រាស់",
    "password": "លេខសំងាត់",
    "btn_login": "ចូល"
  }
}
</i18n>

<script>
import index from '@/js/pages/login/index.js';
export default {
  name: 'PageLogin',
  mixins: [index],
};
</script>

<style lang="scss">
@font-face {
  font-family: 'label_kh';
  src: url(@/assets/fonts/khmer/kantumruy/Kantumruy-Bold.ttf) format('truetype');
}

#login-page {
  .login-container {
    height: calc(100vh - 70px);
  }

  .custom-label:lang(kh) {
    font-family: 'label_kh';
  }

  .v-btn:lang(kh) {
    font-family: 'label_kh';
  }

  .login-card {
    padding-top: 50px;
    padding-bottom: 50px;
  }

  .app-logo {
    max-width: 250px;
    max-height: 250px;
  }
}
</style>

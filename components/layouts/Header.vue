<template>
  <div id="header">
    <v-app-bar app elevation="0" :color="!$store.getters.isDarkMode ? '#FFFFFF' : ''" class="app-bar">
      <!-- style="border-bottom: 1px solid #ccc" -->
      <v-list-item class="px-2" dense nav v-if="!$auth.loggedIn">
        <img src="~/assets/images/logo/small-logo.png" alt="" style="width: 50px" />
      </v-list-item>

      <v-btn v-else @click.stop="miniSidebar()" class="mr-2" min-width="25" depressed>
        <v-icon size="20">mdi-{{ `${$store.getters.isMiniSidebar ? 'menu' : 'menu-open'}` }}</v-icon>
      </v-btn>

      <v-toolbar-title v-if="$auth.loggedIn">{{ $store.getters.getPageTitle }}</v-toolbar-title>

      <v-menu offset-y v-if="$auth.loggedIn">
        <v-list v-if="menus.length > 0" nav>
          <v-container>
            <v-list-item v-for="item in menus" :key="item.id" link @click="pushMenu(item.to)" dense>
              <v-list-item-title>{{ item.menu_title.en }}</v-list-item-title>
            </v-list-item>
          </v-container>
        </v-list>
      </v-menu>

      <v-spacer />

      <v-btn min-width="35" text class="mr-2" @click.stop="changeTheme()"
        ><v-icon size="16">{{
          $store.getters.isDarkMode ? 'mdi-white-balance-sunny' : 'mdi-weather-night'
        }}</v-icon></v-btn
      >
      <v-menu bottom min-width="180px" offset-y v-if="$auth.loggedIn">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" height="38" width="38" style="margin-right: 2px">
            <v-avatar color="brown" size="35">
              <span class="white--text"> {{ $auth.users ? $auth.users['0'] : '' }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <div class="mx-auto text-center">
                  <v-avatar color="brown">
                    <span class="white--text text-h5">{{ $auth.users ? $auth.users['0'] : '' }}</span>
                  </v-avatar>
                  <h4 class="mt-2 mb-2">
                    {{ $auth.users ? $auth.users : '' }}
                  </h4>
                </div>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item class="text-center">
              <v-list-item-title>
                <v-btn depressed text :to="localePath('/profile')"
                  ><v-icon small left>mdi-account</v-icon>Profile</v-btn
                >
              </v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item class="text-center">
              <v-list-item-title>
                <v-btn depressed text @click="submitForm"><v-icon small left>mdi-logout</v-icon> Logout</v-btn>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import header from '@/js/components/layouts/header';
export default {
  name: 'AppHeader',
  mixins: [header],
};
</script>

<style>
@font-face {
  font-family: 'title_kh';
  src: url(@/assets/fonts/khmer/kantumruy/Kantumruy-Bold.ttf) format('truetype');
}

@font-face {
  font-family: 'title_en';
  src: url(@/assets/fonts/english/montserrat/Montserrat-Medium.ttf);
}
.app-title-login:lang(kh) {
  font-family: 'title_kh';
  line-height: 30px !important;
}

.app-title-login:lang(en) {
  font-family: 'title_en';
}

.search-menu input {
  cursor: text;
}

#header .v-btn {
  padding: 0 8px !important;

  align-items: center;
  display: flex;
  position: relative;
  z-index: 0;
  padding-left: 10px;
}

#header #main-app-title {
  cursor: pointer;
}

#header .v-list-item {
  padding: 0 6px;
}

#header .app-bar {
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.12) !important;
}
</style>

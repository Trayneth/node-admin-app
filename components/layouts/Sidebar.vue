<template>
  <div id="sidebar">
    <v-navigation-drawer :mini-variant="$store.getters.isMiniSidebar" permanent app>
      <v-list expand nav dense>
        <template v-for="(item, i) in items">
          <v-list-item v-if="!item.childs && permission(item.permission)" :key="i" :to="localePath(item.to)" router>
            <v-list-item-action>
              <v-icon :size="!$store.getters.isMiniSidebar ? 22 : ''">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="sidebar-title">{{ $t(item.title) }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <template v-else-if="item.childs && (item.childs)">
            <template v-if="!$store.getters.isMiniSidebar">
              <v-list-group :key="item.title" no-action :group="item.group">
                <template v-slot:appendIcon>
                  <v-chip class="mr-1 mt-1" color="red" dark label x-small v-if="item.notify">{{
                    item.notify_count.length > 2 ? '99+' : item.notify_count
                  }}</v-chip>
                  <v-icon :size="16">mdi-chevron-down</v-icon>
                </template>

                <template v-slot:prependIcon>
                  <v-icon :size="!$store.getters.isMiniSidebar ? 22 : ''">{{ item.icon }}</v-icon>
                </template>

                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title class="sidebar-title">
                      {{ $t(item.title) }}
                    </v-list-item-title>
                  </v-list-item-content>
                </template>

                <template v-for="item_child in item.childs">
                  <v-list-item
                    v-if="permission(item_child.permission)"
                    :key="item_child.title"
                    link
                    :to="localePath(item_child.to)"
                  >
                    <v-list-item-icon>
                      <v-icon size="18">mdi-circle-medium</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title class="sidebar-title">{{ $t(item_child.title) }}</v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-chip color="red" dark label x-small v-if="item_child.notify">{{
                        item_child.notify_count.length > 2 ? '99+' : item_child.notify_count
                      }}</v-chip>
                    </v-list-item-action>
                  </v-list-item>
                </template>
              </v-list-group>
            </template>

            <template v-else>
              <v-menu open-on-hover right offset-x :key="item.title">
                <template v-slot:activator="{ on, attrs }">
                  <v-list-group no-action :group="item.group" v-bind="attrs" v-on="on">
                    <template v-slot:prependIcon>
                      <v-icon>{{ item.icon }}</v-icon>
                    </template>
                    <template v-slot:activator>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title class="sidebar-title">{{ $t(item.title) }}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-list-group>
                </template>

                <v-list nav width="250" dense>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title class="sidebar-title">{{ $t(item.title) }}</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-chip color="red" dark label x-small v-if="item.notify">{{
                        item.notify_count.length > 2 ? '99+' : item.notify_count
                      }}</v-chip>
                    </v-list-item-action>
                  </v-list-item>
                  <v-divider class="mb-2"></v-divider>
                  <v-list-item
                    v-for="item_child in item.childs"
                    :key="item_child.title"
                    link
                    :to="localePath(item_child.to)"
                  >
                    <v-list-item-content>
                      <v-list-item-title class="sidebar-title">{{ $t(item_child.title) }}</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-chip color="red" dark label x-small v-if="item_child.notify">{{
                        item_child.notify_count.length > 2 ? '99+' : item_child.notify_count
                      }}</v-chip>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </template>
        </template>
      </v-list>

      <template v-slot:prepend>
        <v-list-item v-if="!$store.getters.isMiniSidebar">
          <v-row justify="center" align="center">
            <v-img
              @click="$router.push(localePath('/'))"
              :src="require('~/assets/images/logo/app-logo.png')"
              alt=""
              class="main-app-logo"
              width="100"
              height="100"
              contain
            ></v-img>
          </v-row>
        </v-list-item>

        <v-img
          v-else
          @click="$router.push(localePath('/'))"
          :src="require('~/assets/images/logo/small-logo.png')"
          alt=""
          class="main-app-logo mt-1"
          width="60"
          height="60"
          contain
        ></v-img>
      </template>

      <template v-slot:append>
        <v-divider></v-divider>
        <v-list nav dense>
          <v-list-item link :to="localePath('/')">
            <v-list-item-icon>
              <v-icon>mdi-help-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Help</v-list-item-title>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import sidebar from '@/js/components/layouts/sidebar.js';
export default {
  name: 'AppSidebar',
  mixins: [sidebar],
};
</script>

<style lang="scss">
@import '~/assets/variables.scss';

.v-navigation-drawer__border {
  width: 0.8px;
}

.main-app-logo {
  cursor: pointer;
  margin: 10px 0px;
}

.v-list-item--link:before {
  background-color: white;
}

#sidebar {
  .v-list-group--no-action > .v-list-group__items > .v-list-item {
    padding-left: 10px !important;
  }
  .v-list-item__action:first-child,
  .v-list-item__icon:first-child {
    margin-right: 18px !important;
  }
  .v-list-group .v-list-group__header .v-list-item__icon.v-list-group__header__append-icon {
    min-width: 10px;
  }

  .v-list-item__content .v-list-item__title {
    font-size: $font-size-root;
    line-height: 2;
    // margin-top: 4px;
  }

  .v-list-item--active {
    color: $main-color;
  }

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background: #ffffff;
  }
  ::-webkit-scrollbar-thumb {
    background: #ffffff;
    border-radius: 6px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #aeaeae;
  }

  // .v-navigation-drawer__content {
  //   overflow-y: hidden;
  // }

  // .v-navigation-drawer__content:hover {
  //   overflow-y: auto;
  // }
}

#sidebar:hover {
  ::-webkit-scrollbar-thumb {
    background: #d5d5d5;
  }
}
</style>

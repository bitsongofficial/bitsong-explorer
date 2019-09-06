<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
      width="288"
      disable-resize-watcher
      disable-route-watcher
      temporary
    >
      <v-container>
        <v-row no-gutters>
          <v-col>
            <img src="/logo-red.svg" alt="BitSong Explorer" height="52" class="pt-1" />
          </v-col>
        </v-row>
      </v-container>
      <v-divider></v-divider>
      <v-container class="hidden-sm-and-up">
        <v-row>
          <v-col>
            <UISearchBarMobile />
          </v-col>
        </v-row>
      </v-container>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          @click="drawer = false"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list nav dense>
        <v-subheader class="font-weight-medium">Official Links</v-subheader>
        <v-list-item nuxt-link :href="`https://www.bitsong.io`" target="_blank">
          <v-list-item-action>
            <v-icon>mdi-web</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Website</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item nuxt-link :href="`https://github.com/bitsongofficial`" target="_blank">
          <v-list-item-action>
            <v-icon>mdi-github-circle</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Github</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item nuxt-link :href="`https://github.com/bitsongofficial`" target="_blank">
          <v-list-item-action>
            <v-icon>mdi-medium</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Blog</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item nuxt-link :href="`https://twitter.com/BitSongOfficial`" target="_blank">
          <v-list-item-action>
            <v-icon>mdi-twitter</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Twitter</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      fixed
      app
      style="background:linear-gradient(90deg, rgba(219,24,97,1) 0%, rgba(252,138,13,1) 100%);"
      elevation="2"
    >
      <v-app-bar-nav-icon class="ml-0" color="white" @click.stop="drawer = !drawer" />
      <v-toolbar-title class="pl-1">
        <nuxt-link to="/">
          <img src="/logo-white2.svg" alt="BitSong Explorer" height="42" class="pt-2" />
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer />
      <UISearchBar />
      <v-spacer />
      <v-toolbar-items>
        <span class="chain_name white--text">
          <v-icon dark class="pr-3" color="green" size="12">mdi-circle</v-icon>
          <span class="hidden-sm-and-down">bitsong-testnet-2</span>
        </span>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<style scoped>
.chain_name {
  display: flex;
  height: 100% !important;
  align-items: center;
  vertical-align: middle;
  padding: 0 20px;
  font-weight: 500;
}
</style>


<script>
import UISearchBar from "@/components/UI/SearchBar";
import UISearchBarMobile from "@/components/UI/SearchBarMobile";
export default {
  components: {
    UISearchBar,
    UISearchBarMobile
  },
  data() {
    return {
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Home",
          to: "/"
        },
        {
          icon: "mdi-cube",
          title: "Blocks",
          to: "/blocks"
        },
        {
          icon: "mdi-bank",
          title: "Transactions",
          to: "/transactions"
        },
        {
          icon: "mdi-server-security",
          title: "Validators",
          to: "/validators"
        }
      ],
      right: true,
      rightDrawer: false,
      title: "BitSong Explorer"
    };
  },
  mounted() {
    this.$store.dispatch(`connection/connect`);
  }
};
</script>

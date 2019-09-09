<template>
  <v-app dark>
    <UINavigationDrawer v-model="drawer" />

    <v-app-bar fixed app color="#fbbc09" elevation="2">
      <v-app-bar-nav-icon class="ml-0" @click.stop="drawer = !drawer" />
      <v-toolbar-title class="pl-1">
        <UILogoWhite />
      </v-toolbar-title>
      <v-spacer />
      <UISearchBar />
      <v-spacer />
      <v-toolbar-items>
        <UIToolbarChainName />
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import UISearchBar from "@/components/UI/SearchBar";
import UIToolbarChainName from "@/components/UI/ToolbarChainName";
import UILogoWhite from "@/components/UI/LogoWhite";
import UINavigationDrawer from "@/components/UI/NavigationDrawer";

export default {
  components: {
    UISearchBar,
    UIToolbarChainName,
    UILogoWhite,
    UINavigationDrawer
  },
  data() {
    return {
      drawer: false
    };
  },
  mounted() {
    this.$store.dispatch(`connection/connect`);
  }
};
</script>

<style>
.v-application a {
}
</style>

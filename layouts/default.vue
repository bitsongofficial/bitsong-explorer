<template>
  <v-app dark>
    <UINavigationDrawer v-model="drawer" />

    <v-app-bar
      fixed
      app
      style="background:linear-gradient(90deg, rgba(219,24,97,1) 0%, rgba(252,138,13,1) 100%);"
      elevation="2"
    >
      <v-app-bar-nav-icon class="ml-0" color="white" @click.stop="drawer = !drawer" />
      <v-toolbar-title class="pl-1">
        <UILogoWhite />
      </v-toolbar-title>
      <v-spacer />
      <UISearchBar />
      <v-spacer />
      <v-toolbar-items>
        <UIToolbarChainName topbar class="hidden-sm-and-down" />
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
  text-decoration: none;
}
</style>

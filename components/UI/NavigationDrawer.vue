<template>
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
          <img src="/logo-red.svg" alt="Explorer" height="52" class="pt-1" />
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
      <v-list-item v-for="(item, i) in links" :key="i" :href="item.url" nuxt-link target="_blank">
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import UISearchBarMobile from "@/components/UI/SearchBarMobile";

export default {
  components: {
    UISearchBarMobile
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value() {
      this.drawer = this.value;
    },
    drawer() {
      this.$emit("input", this.drawer);
    }
  },
  data() {
    return {
      fixed: false,
      drawer: this.visible,
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
      links: [
        { icon: "mdi-web", title: "Website", url: "https://www.bitsong.io" },
        {
          icon: "mdi-github-circle",
          title: "Github",
          url: "https://github.com/bitsongofficial"
        },
        {
          icon: "mdi-medium",
          title: "Blog",
          url: "https://medium.com/@BitSongOfficial/"
        },
        {
          icon: "mdi-twitter",
          title: "Twitter",
          url: "https://twitter.com/BitSongOfficial"
        }
      ],
      right: true,
      rightDrawer: false
    };
  }
};
</script>

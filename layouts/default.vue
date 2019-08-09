<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="blue darken-2"
      elevation="2"
    >
      <v-app-bar-nav-icon class="ml-0" color="white" @click.stop="drawer = !drawer" />
      <v-toolbar-title class="white--text" v-text="title" />
      <v-spacer />
      <v-text-field
        flat
        dark
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        placeholder="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer />
      <v-toolbar-items>
        <span class="chain_name white--text">
          <v-icon dark class="pr-3" color="green" size="12">mdi-circle</v-icon> bitsong-testnet-1
        </span>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
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
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'BitSong Explorer'
    }
  }
}
</script>

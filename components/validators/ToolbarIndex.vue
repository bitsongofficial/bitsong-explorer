<template>
  <v-toolbar flat>
    <v-toolbar-title>Validators</v-toolbar-title>
    <div class="flex-grow-1"></div>
    <v-menu bottom left transition="slide-y-transition">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-sort-descending</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Voting Power</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon>mdi-check</v-icon>
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Moniker</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon></v-icon>
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Commission</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon></v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu bottom left transition="slide-y-transition">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Active</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon>mdi-check</v-icon>
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Inctive</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon></v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

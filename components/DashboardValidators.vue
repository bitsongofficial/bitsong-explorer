<template>
  <v-card tile elevation="1">
    <v-list-item two-line>
      <v-list-item-avatar>
        <v-icon>mdi-server-network</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>32</v-list-item-title>
        <v-list-item-subtitle>Active Validators</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-content>
        <v-list-item-title>16</v-list-item-title>
        <v-list-item-subtitle>Inactive Validators</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list-item two-line icon>
      <v-list-item-avatar>
        <v-icon>mdi-power-plug</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>2 256</v-list-item-title>
        <v-list-item-subtitle>Voting Power</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

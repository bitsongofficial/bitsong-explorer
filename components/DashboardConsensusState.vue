<template>
  <v-card tile elevation="1">
    <v-card-title>
      <h3 class="title">Consensus State</h3>
    </v-card-title>
    <v-list>
      <v-list-item two-line>
        <v-list-item-content class="text-center">
          <v-list-item-title>465 245</v-list-item-title>
          <v-list-item-subtitle>Height</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-content class="text-center">
          <v-list-item-title>0</v-list-item-title>
          <v-list-item-subtitle>Round</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-content class="text-center">
          <v-list-item-title>3</v-list-item-title>
          <v-list-item-subtitle>Step</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-content style="min-width:700px">
          <v-progress-linear value="15"></v-progress-linear>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<template>
  <v-card tile elevation="1">
    <v-card-title>
      <v-icon large left>mdi-cube-send</v-icon>
      <h3 class="title">Blocks</h3>
    </v-card-title>
    <v-divider></v-divider>
    <v-list>
      <v-list-item-group v-for="(block, index) in blocks" :key="`${index}-${block.header.height}`">
        <v-divider v-if="index !== 0" :key="`${index}-divider`"></v-divider>
        <v-list-item two-line>
          <v-list-item-avatar>
            <v-icon>mdi-cube-send</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="font-weight-medium">Block <nuxt-link class="red-link" to="/">{{ block.header.height | prettyRound }}</nuxt-link></v-list-item-title>
            <v-list-item-subtitle>Includes <nuxt-link class="red-link font-weight-medium" to="/">{{ block.header.num_txs }} txs</nuxt-link>, Fees 0 BTSG</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-content class="text-right">
            <span class="body-1" style="color:rgba(0,0,0,0.54)">{{ block.header.time | timeDistance }}</span>
            <span class="body-1" style="color:rgba(0,0,0,0.54)"><nuxt-link class="red-link font-weight-medium" to="/">{{ block.header.proposer_address | proposerAddress }}</nuxt-link></span>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import { prettyUsd, prettyRound, shortFilter, getTimeDistance } from "~/assets/utils";
export default {
  filters: {
    prettyRound,
    proposerAddress: (value) => shortFilter(value, 3),
    timeDistance: (value) => prettyUsd(getTimeDistance(value)),
  },
  computed: {
    blocks () {
      return this.$store.getters[`blocks/blockList`]
    }
  }
}
</script>

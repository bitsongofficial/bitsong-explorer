<template>
  <v-card tile elevation="1">
    <v-card-title>
      <v-icon large left>mdi-cube-send</v-icon>
      <h3 class="title">Blocks</h3>
    </v-card-title>
    <v-divider></v-divider>

    <v-list v-if="blocks">
      <v-list-item-group v-for="(block, index) in blocks" :key="`${index}-${block.height}`">
        <v-divider v-if="index !== 0" :key="`${index}-divider`"></v-divider>
        <v-list-item two-line>
          <v-list-item-avatar>
            <v-icon>mdi-cube-send</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="font-weight-medium">
              Block
              <nuxt-link class="red-link" to="/">{{ block.height | prettyRound }}</nuxt-link>
            </v-list-item-title>
            <v-list-item-subtitle>
              Includes
              <nuxt-link class="red-link font-weight-medium" to="/">{{ block.num_txs }} txs</nuxt-link>, Proposer:
              <nuxt-link class="red-link font-weight-medium" to="/">{{ block.proposer }}</nuxt-link>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-content class="text-right">
            <span class="body-1" style="color:rgba(0,0,0,0.54)">{{ block.time | timeDistance }}</span>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import {
  prettyUsd,
  prettyRound,
  shortFilter,
  getTimeDistance,
  toTime
} from "~/assets/utils";
import gql from "graphql-tag";

export default {
  filters: {
    prettyRound,
    proposerAddress: value => shortFilter(value, 6),
    timeDistance: value => getTimeDistance(value),
    toTime
  },
  computed: {
    // blocks() {
    //   return this.$store.getters[`blocks/blockList`];
    // }
  },
  apollo: {
    blocks: {
      prefetch: true,
      query: gql`
        query Blocks($page: Int!, $limit: Int!) {
          blocks(page: $page, limit: $limit) {
            height
            hash
            time
            num_txs
            proposer
          }
        }
      `,
      variables() {
        return {
          page: 1,
          limit: 10
        };
      },
      pollInterval: 1000
    }
  }
};
</script>

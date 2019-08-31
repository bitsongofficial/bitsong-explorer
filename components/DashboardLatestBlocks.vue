<template>
  <v-card tile elevation="1">
    <v-card-title>
      <v-icon large left>mdi-cube-send</v-icon>
      <h3 class="title">Blocks</h3>
    </v-card-title>
    <v-divider></v-divider>

    <v-list v-if="allBlocks">
      <v-list-item-group v-for="(block, index) in allBlocks.docs" :key="`${index}-${block.height}`">
        <v-divider v-if="index !== 0" :key="`${index}-divider`"></v-divider>
        <v-list-item two-line>
          <v-list-item-avatar>
            <v-icon>mdi-cube-send</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="font-weight-medium">
              Block
              <nuxt-link
                class="red-link"
                :to="`/blocks/${block.height}`"
              >{{ block.height | prettyRound }}</nuxt-link>
              <span class="hidden-md-and-up body-2 grey--text text--darken-1">
                &middot; Includes
                <nuxt-link
                  class="red-link font-weight-medium"
                  :to="`/blocks/${block.height}`"
                >{{ block.num_txs }} txs</nuxt-link>
              </span>
            </v-list-item-title>
            <v-list-item-subtitle>
              <span class="hidden-sm-and-down">
                Includes
                <nuxt-link class="red-link font-weight-medium" to="/">{{ block.num_txs }} txs</nuxt-link>,
              </span> Proposer:
              <nuxt-link class="red-link font-weight-medium" to="/">{{ block.proposer }}</nuxt-link>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action-text>{{ block.time | timeDistance }}</v-list-item-action-text>
          </v-list-item-action>
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
  getTimeDistance
} from "~/assets/utils";
import gql from "graphql-tag";

export default {
  filters: {
    prettyRound,
    proposerAddress: value => shortFilter(value, 6),
    timeDistance: value => getTimeDistance(value)
  },
  computed: {
    // blocks() {
    //   return this.$store.getters[`blocks/blockList`];
    // }
  },
  apollo: {
    allBlocks: {
      prefetch: true,
      query: gql`
        query allBlocks($pagination: PaginationInput!) {
          allBlocks(pagination: $pagination) {
            docs {
              height
              time
              num_txs
              proposer
            }
          }
        }
      `,
      variables() {
        return {
          pagination: {
            page: 1,
            limit: 10
          }
        };
      },
      pollInterval: 1000
    }
  }
};
</script>

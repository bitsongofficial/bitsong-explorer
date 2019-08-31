<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" xl="8" class="mx-auto mt-4">
        <h1 class="display-1 font-weight-light grey--text text--darken-3 pb-3">Blocks</h1>
      </v-col>
    </v-row>

    <v-row no-gutters class="mt-3">
      <v-col cols="12">
        <v-card class="elevation-1">
          <v-toolbar flat>
            <v-toolbar-title class="subtitle-1">Block #dsad to #dsada (Total of 14454 blocks)</v-toolbar-title>
            <div class="flex-grow-1"></div>
            <v-btn icon disabled>
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-data-table
            v-if="allBlocks"
            :headers="blocks_header"
            :items-per-page="25"
            :items="allBlocks.edges"
          >
            <template v-slot:item.height="{ item }">
              <nuxt-link :to="`/blocks/${item.node.height}`">{{ item.node.height }}</nuxt-link>
            </template>
            <template v-slot:item.hash="{ item }">{{ item.node.hash | hash }}</template>
            <template v-slot:item.proposer="{ item }">{{ item.node.proposer }}</template>
            <template v-slot:item.num_txs="{ item }">{{ item.node.num_txs }}</template>
            <template v-slot:item.time="{ item }">{{ item.node.time | timeDistance }}</template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { shortFilter, getTimeDistance } from "~/assets/utils";
import gql from "graphql-tag";

export default {
  filters: {
    hash: value => shortFilter(value, 12),
    timeDistance: value => getTimeDistance(value)
  },
  data() {
    return {
      blocks_header: [
        { text: "Block", value: "height", sortable: false },
        { text: "Age", value: "time", sortable: false },
        { text: "Txn", value: "num_txs", sortable: false },
        { text: "Proposer", value: "proposer", sortable: false },
        { text: "Hash", value: "hash", sortable: false }
      ]
    };
  },
  apollo: {
    allBlocks: {
      prefetch: true,
      query: gql`
        query allBlocks($pagination: PaginationInput!) {
          allBlocks(pagination: $pagination) {
            totalCount
            pageInfo {
              hasNextPage
              endCursor
            }
            edges {
              cursor
              node {
                height
                hash
                time
                num_txs
                proposer
              }
            }
          }
        }
      `,
      variables() {
        return {
          pagination: {
            first: 25
          }
        };
      }
    }
  }
};
</script>

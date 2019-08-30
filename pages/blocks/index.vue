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
          <v-data-table
            hide-default-footer
            :headers="blocks_header"
            :items-per-page="25"
            :items="blocks"
          >
            <template v-slot:item.height="{ item }">
              <nuxt-link :to="`/blocks/${item.height}`">{{ item.height }}</nuxt-link>
            </template>
            <template v-slot:item.hash="{ item }">{{ item.hash | hash }}</template>
            <template v-slot:item.proposer="{ item }">{{ item.proposer | hash }}</template>
            <template v-slot:item.txs="{ item }">{{ item.txs }}</template>
            <template v-slot:item.time="{ item }">{{ item.time | timeDistance }}</template>
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
        { text: "Height", value: "height" },
        { text: "Hash", value: "hash" },
        { text: "Proposer", value: "proposer" },
        { text: "Txs", value: "num_txs", align: "center" },
        { text: "Time", value: "time", align: "right" }
      ]
    };
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
          limit: 20
        };
      }
    }
  }
};
</script>

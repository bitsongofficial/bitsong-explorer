<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" xl="8" class="mx-auto mt-4">
        <h1 class="display-1 font-weight-light grey--text text--darken-3 pb-3">Blocks</h1>
      </v-col>
    </v-row>

    <v-row no-gutters class="mt-3">
      <v-col cols="12" xl="8" class="mx-auto">
        <v-card class="elevation-1">
          <v-toolbar flat>
            <v-toolbar-title
              class="subtitle-1 hidden-sm-and-down"
            >Block #{{ firstBlock }} to #{{ lastBlock }} (Total of {{ totalBlocks }} blocks)</v-toolbar-title>
            <div class="flex-grow-1"></div>
            <Pagination v-if="allBlocks" :pagination-info="allBlocks.pageInfo" />
          </v-toolbar>
          <v-divider></v-divider>
          <v-data-table
            v-if="allBlocks"
            :headers="blocks_header"
            hide-default-footer
            :items-per-page="25"
            :items="allBlocks.docs"
          >
            <template v-slot:item.height="{ item }">
              <nuxt-link :to="`/blocks/${item.height}`">{{ item.height }}</nuxt-link>
            </template>
            <template v-slot:item.hash="{ item }">{{ item.hash | hash }}</template>
            <template v-slot:item.proposer="{ item }">
              <UIProposer :address="item.proposer" />
            </template>
            <template v-slot:item.num_txs="{ item }">{{ item.num_txs }}</template>
            <template v-slot:item.time="{ item }">{{ item.time | timeDistance }}</template>
          </v-data-table>
          <v-divider></v-divider>
          <v-toolbar flat>
            <div class="flex-grow-1"></div>
            <Pagination v-if="allBlocks" :pagination-info="allBlocks.pageInfo" />
          </v-toolbar>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { shortFilter, getTimeDistance } from "~/assets/utils";
import getTitle from "~/assets/get-title";
import gql from "graphql-tag";
import Pagination from "@/components/Pagination";
import UIProposer from "@/components/UI/Proposer";

export default {
  head() {
    const title = getTitle("Blocks");
    return {
      title: title,
      meta: [{ hid: "og-title", name: "og:title", content: title }]
    };
  },
  components: {
    Pagination,
    UIProposer
  },
  filters: {
    hash: value => shortFilter(value, 12),
    timeDistance: value => getTimeDistance(value)
  },
  watchQuery: ["page"],
  key: to => to.fullPath,
  asyncData({ query }) {
    let page = 1;
    if (query.page) page = parseInt(query.page);

    return {
      page
    };
  },
  data() {
    return {
      limitRecords: 25,
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
            docs {
              height
              hash
              time
              num_txs
              proposer
            }
            pageInfo {
              total
              limit
              page
              pages
            }
          }
        }
      `,
      variables() {
        return {
          pagination: {
            page: this.page,
            limit: this.limitRecords
          }
        };
      }
    }
  },
  computed: {
    firstBlock() {
      if (!this.allBlocks) return;
      if (!this.allBlocks.docs) return;
      if (this.allBlocks.docs.length === 0) return;

      return this.allBlocks.docs[0].height;
    },
    lastBlock() {
      if (!this.allBlocks) return;
      if (!this.allBlocks.docs) return;
      if (this.allBlocks.docs.length === 0) return;

      const lastBlock = this.firstBlock - this.limitRecords + 1;
      if (lastBlock < 1) return 1;

      return lastBlock;
    },
    totalBlocks() {
      if (!this.allBlocks) return;
      if (!this.allBlocks.docs) return;
      if (this.allBlocks.docs.length === 0) return;

      return this.allBlocks.pageInfo.total;
    }
  }
};
</script>

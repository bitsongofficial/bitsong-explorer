<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" xl="8" class="mx-auto mt-4">
        <h1 class="display-1 font-weight-light grey--text text--darken-3 pb-3">
          <nuxt-link to="/blocks" class="pr-4" style="text-decoration:none">
            <v-icon>mdi-arrow-left</v-icon>
          </nuxt-link>Block
          <span class="headline font-weight-light">#{{ height }}</span>
        </h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" xl="8" class="mx-auto">
        <v-card class="elevation-1">
          <v-card-title class="pb-3">Block Header</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-row no-gutters v-if="block">
              <v-col cols="12" class="px-3">
                <v-row>
                  <v-col cols="12" md="6">
                    <div class="subtitle-1 grey--text text--darken-4">{{ block.height }}</div>
                    <div class="body-2 grey--text text--darken-1">Height</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="subtitle-1 grey--text text--darken-4">{{ block.time }}</div>
                    <div class="body-2 grey--text text--darken-1">Block Time</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <div class="subtitle-1 grey--text text--darken-4">{{ block.proposer | hash }}</div>
                    <div class="body-2 grey--text text--darken-1">Proposer</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="subtitle-1 grey--text text--darken-4">{{ block.num_txs }}</div>
                    <div class="body-2 grey--text text--darken-1">Total Transactions</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <div class="subtitle-1 grey--text text--darken-4">{{ block.hash | hash }}</div>
                    <div class="body-2 grey--text text--darken-1">Hash</div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" xl="8" class="mx-auto">
        <v-card class="elevation-1">
          <v-card-title class="pb-3">Transactions</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-row no-gutters>
              <v-col cols="12" class="px-3">No data</v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { shortFilter } from "~/assets/utils";
import gql from "graphql-tag";

export default {
  filters: {
    hash: value => shortFilter(value, 12)
  },
  asyncData({ params, error }) {
    const height = parseInt(params.height);

    return {
      height
    };
  },
  apollo: {
    block: {
      prefetch: false,
      query: gql`
        query Block($height: Int!) {
          block(height: $height) {
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
          height: this.height
        };
      }
    }
  }
};
</script>

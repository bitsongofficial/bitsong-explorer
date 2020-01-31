<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" xl="8" class="mx-auto mt-4">
        <h1 class="display-1 font-weight-light grey--text text--darken-3 pb-3">
          <nuxt-link
            v-if="prevUrl"
            :to="prevUrl"
            class="pr-4"
            style="text-decoration:none"
          >
            <v-icon>mdi-arrow-left</v-icon> </nuxt-link
          >Block
          <span class="headline font-weight-light">#{{ height }}</span>
        </h1>
        <UISponsor />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" xl="8" class="mx-auto">
        <v-card class="elevation-1">
          <v-card-title class="pb-3">Block Header</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-row no-gutters v-if="block">
              <v-col cols="12">
                <v-row>
                  <v-col cols="12" md="6">
                    <div class="subtitle-1 grey--text text--darken-4">
                      {{ block.height }}
                    </div>
                    <div class="body-2 grey--text text--darken-1">Height</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="subtitle-1 grey--text text--darken-4">
                      {{ block.timestamp }}
                    </div>
                    <div class="body-2 grey--text text--darken-1">
                      Block Time
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <div class="subtitle-1 grey--text text--darken-4">
                      <UIProposer :address="block.proposer_address" />
                    </div>
                    <div class="body-2 grey--text text--darken-1">Proposer</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="subtitle-1 grey--text text--darken-4">
                      {{ block.num_txs }}
                    </div>
                    <div class="body-2 grey--text text--darken-1">
                      Total Transactions
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <div
                      class="subtitle-1 grey--text text--darken-4 text-truncate"
                    >
                      {{ block.hash }}
                    </div>
                    <div class="body-2 grey--text text--darken-1">Hash</div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" xl="8" class="mx-auto">
        <TransactionsDataTable
          :transactions="allTransactions"
          default_pagination
          :items_per_page="5"
          :height="height"
        />
      </v-col>

      <v-col cols="12" xl="8" class="mx-auto">
        <MissingValidatorsDataTable
          :items="allMissedBlocks"
          :items_per_page="50"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { shortFilter } from "~/assets/utils";
import getTitle from "~/assets/get-title";
import gql from "graphql-tag";
import TransactionsDataTable from "@/components/Transactions/DataTable";
import MissingValidatorsDataTable from "@/components/MissingValidators/DataTable";
import UIProposer from "@/components/UI/Proposer";
import UISponsor from "@/components/UI/Sponsor";

export default {
  head() {
    const title = getTitle("Block " + this.$route.params.height);
    return {
      title: title,
      meta: [{ hid: "og-title", name: "og:title", content: title }]
    };
  },
  components: {
    TransactionsDataTable,
    MissingValidatorsDataTable,
    UIProposer,
    UISponsor
  },
  filters: {
    hash: value => shortFilter(value, 12)
  },
  asyncData({ params, error }) {
    const height = parseInt(params.height);

    return {
      height
    };
  },
  data() {
    return {
      prevUrl: null
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name === "account-address" || from.name === "blocks") {
        vm.prevUrl = from.fullPath;
      } else {
        vm.prevUrl = "/blocks";
      }
    });
  },
  apollo: {
    block: {
      prefetch: true,
      query: gql`
        query Block($height: Int!) {
          block(height: $height) {
            height
            hash
            timestamp
            num_txs
            proposer_address
          }
        }
      `,
      variables() {
        return {
          height: this.height
        };
      }
    },
    allMissedBlocks: {
      prefetch: true,
      query: gql`
        query allMissedBlocks($filters: MissedBlockFiltersInput) {
          allMissedBlocks(filters: $filters) {
            validators {
              consensus_address
              consensus_pubkey
              delegator_address
              jailed
              description {
                moniker
              }
              operator_address
              status
              delegator_shares
              min_self_delegation
              tokens
              unbonding_height
              unbonding_time
              address
              voting_power
              proposer_priority
              self_shares
            }
          }
        }
      `,
      variables() {
        return {
          filters: {
            height: this.height
          }
        };
      }
    },
    allTransactions: {
      prefetch: true,
      query: gql`
        query allTransactions($filters: TransactionFiltersInput) {
          allTransactions(filters: $filters) {
            docs {
              tx_hash
              messages {
                type
                value
              }
              signatures {
                address
              }
              height
              timestamp
              logs
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
          filters: {
            height: this.height
          }
        };
      }
    }
  }
};
</script>

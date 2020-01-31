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
          >Transaction
        </h1>
      </v-col>
      <v-col cols="12" xl="8" class="mx-auto">
        <div class="body-1 font-weight-light text-truncate">
          {{ tx.tx_hash }}
        </div>
        <UISponsor />
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="12" xl="8" class="mx-auto mt-4">
        <v-row no-gutters class="mt-4">
          <v-col cols="12">
            <v-card elevation="1">
              <v-card-title>
                <h3 class="title">Transaction Detail</h3>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="5">
                    <div class="subtitle-1 grey--text text--darken-4">
                      <nuxt-link :to="`/blocks/${tx.height}`">{{
                        tx.height
                      }}</nuxt-link>
                    </div>
                    <div class="body-2 grey--text text--darken-1">
                      Block Height
                    </div>
                  </v-col>
                  <v-col cols="12" md="7">
                    <div class="subtitle-1 grey--text text--darken-4">
                      {{ tx.timestamp }}
                    </div>
                    <div class="body-2 grey--text text--darken-1">
                      TimeStamp
                    </div>
                  </v-col>
                  <v-col cols="12" md="5">
                    <div class="subtitle-1 grey--text text--darken-4">
                      {{ tx.gas_used }}/{{ tx.gas_wanted }}
                    </div>
                    <div class="body-2 grey--text text--darken-1">
                      Gas (Used/Requested)
                    </div>
                  </v-col>
                  <v-col cols="12" md="7">
                    <div class="subtitle-1 grey--text text--darken-4">
                      <span v-if="tx.memo">{{ tx.memo }}</span>
                      <span v-else>&nbsp;</span>
                    </div>
                    <div class="body-2 grey--text text--darken-1">Memo</div>
                  </v-col>
                  <v-col cols="12" md="5">
                    <div
                      v-for="(signature, i) in tx.signatures"
                      v-bind:key="i"
                      class="subtitle-1 grey--text text--darken-4 text-truncate"
                    >
                      <nuxt-link :to="`/account/${signature.address}`">{{
                        signature.address
                      }}</nuxt-link>
                    </div>
                    <div class="body-2 grey--text text--darken-1">
                      Signature
                    </div>
                  </v-col>
                  <v-col cols="12" md="7">
                    <div
                      class="subtitle-1 grey--text text--darken-4 text-truncate"
                    >
                      {{ tx.tx_hash }}
                    </div>
                    <div class="body-2 grey--text text--darken-1">Hash</div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row no-gutters class="mt-4">
          <v-col cols="12">
            <h2
              class="display-1 font-weight-light grey--text text--darken-3 pt-3 pb-2"
            >
              Messages
            </h2>
          </v-col>
        </v-row>

        <v-row no-gutters class="mt-4" v-for="(msg, i) in tx.messages" :key="i">
          <v-col cols="12">
            <v-card elevation="1">
              <v-card-title>
                <h3 class="title">{{ msg.type | convertMessageType }}</h3>
                <div class="flex-grow-1"></div>
                <v-chip color="green" dark v-if="tx.logs && tx.logs[i].success">
                  Success
                </v-chip>
                <v-chip color="red" dark v-else>Fail</v-chip>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-row>
                  <v-col
                    cols="12"
                    md="6"
                    v-for="(value, key) in msg.value"
                    v-bind:key="key"
                  >
                    <div
                      class="subtitle-1 grey--text text--darken-4 text-truncate"
                    >
                      {{ value }}
                    </div>
                    <div class="body-2 grey--text text--darken-1">
                      {{ key }}
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.label {
  max-width: 180px;
}
</style>


<script>
import { prettyRound } from "~/assets/utils";
import getTitle from "~/assets/get-title";
import gql from "graphql-tag";
import UIProposer from "@/components/UI/Proposer";
import UIAmount from "@/components/UI/Amount";
import UISponsor from "@/components/UI/Sponsor";

export default {
  head() {
    const title = getTitle("Transaction " + this.$route.params.hash);
    return {
      title: title,
      meta: [{ hid: "og-title", name: "og:title", content: title }]
    };
  },
  components: {
    UIProposer,
    UIAmount,
    UISponsor
  },
  filters: {
    prettyRound,
    convertMessageType: value => {
      return value
        .replace("cosmos-sdk/Msg", "")
        .replace(/([A-Z])/g, " $1")
        .trim();
    }
  },
  data() {
    return {
      prevUrl: null
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name === "account-address" || from.name === "transactions") {
        vm.prevUrl = from.fullPath;
      } else {
        vm.prevUrl = "/transactions";
      }
    });
  },
  asyncData({ params, error }) {
    const hash = params.hash;

    return {
      hash
    };
  },
  computed: {
    tx() {
      if (this.allTransactions) {
        return this.allTransactions.docs[0];
      }

      return {};
    }
  },
  apollo: {
    allTransactions: {
      prefetch: true,
      query: gql`
        query allTransactions(
          $pagination: PaginationInput!
          $filters: TransactionFiltersInput!
        ) {
          allTransactions(pagination: $pagination, filters: $filters) {
            pageInfo {
              total
              limit
              page
              pages
            }
            docs {
              tx_hash
              height
              logs
              gas_wanted
              gas_used
              timestamp
              memo
              signatures {
                address
              }
              messages {
                type
                value
              }
            }
          }
        }
      `,
      variables() {
        return {
          pagination: {
            limit: 1,
            page: 1
          },
          filters: {
            tx_hash: this.hash
          }
        };
      }
    }
  }
};
</script>

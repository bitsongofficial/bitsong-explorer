<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" xl="8" class="mx-auto mt-4">
        <h1 class="display-1 font-weight-light grey--text text--darken-3 pb-3">Transactions</h1>
      </v-col>
    </v-row>

    <v-row no-gutters class="mt-3">
      <v-col cols="12" xl="8" class="mx-auto">
        <v-card class="elevation-1">
          <v-toolbar flat>
            <v-toolbar-title class="subtitle-1 hidden-sm-and-down">{{ totalTxs }} transactions found</v-toolbar-title>
            <div class="flex-grow-1"></div>
            <Pagination v-if="allTransactions" :pagination-info="allTransactions.pageInfo" />
          </v-toolbar>
          <v-divider></v-divider>
          <v-data-table
            v-if="allTransactions"
            :headers="transactions_header"
            hide-default-footer
            :items-per-page="25"
            :items="allTransactions.docs"
          >
            <template v-slot:item.hash="{ item }">
              <nuxt-link :to="`/transactions/${item.hash}`">{{ item.hash | hash }}</nuxt-link>
            </template>
            <template v-slot:item.address="{ item }">
              <nuxt-link
                :to="`/account/${item.signatures[0].address}`"
              >{{ item.signatures[0].address | hash }}</nuxt-link>
            </template>
            <template v-slot:item.msgs="{ item }">
              <v-chip outlined small>{{ item.msgs[0].type | convertMessageType }}</v-chip>
              <v-chip outlined small v-if="item.msgs.length - 1">+{{ item.msgs.length - 1 }}</v-chip>
            </template>
            <template v-slot:item.status="{ item }">
              <v-tooltip bottom v-if="item.status">
                <template v-slot:activator="{ on }">
                  <v-icon color="green" v-on="on">mdi-check-bold</v-icon>
                </template>
                <span>Success</span>
              </v-tooltip>
              <v-tooltip bottom v-else>
                <template v-slot:activator="{ on }">
                  <v-icon color="red" v-on="on">mdi-alert-circle</v-icon>
                </template>
                <span>Fail</span>
              </v-tooltip>
            </template>
            <template v-slot:item.amount="{ item }">
              <span
                v-if="item.msgs[0].value.amount"
              >{{ item.msgs[0].value.amount.amount | toBtsg }} {{ item.msgs[0].value.amount.denom | toMacroDenom }}</span>
              <span v-else>
                <nuxt-link :to="`/transactions/${item.hash}`" style="text-decoration:none">
                  <v-icon size="18">mdi-open-in-new</v-icon>
                </nuxt-link>
              </span>
            </template>
            <template v-slot:item.height="{ item }">
              <nuxt-link :to="`/blocks/${item.height}`">{{ item.height }}</nuxt-link>
            </template>
            <template v-slot:item.time="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <span v-on="on">{{ item.time | timeDistance }}</span>
                </template>
                <span>{{ item.time }}</span>
              </v-tooltip>
            </template>
          </v-data-table>
          <v-divider></v-divider>
          <v-toolbar flat>
            <div class="flex-grow-1"></div>
            <Pagination v-if="allTransactions" :pagination-info="allTransactions.pageInfo" />
          </v-toolbar>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { toBtsg, toMacroDenom } from "@/filters";
import { shortFilter, getTimeDistance } from "~/assets/utils";
import gql from "graphql-tag";
import Pagination from "@/components/Pagination";

export default {
  components: {
    Pagination
  },
  filters: {
    toBtsg,
    toMacroDenom,
    hash: value => shortFilter(value, 12),
    timeDistance: value => getTimeDistance(value),
    convertMessageType: value => {
      return value
        .replace("cosmos-sdk/Msg", "")
        .replace(/([A-Z])/g, " $1")
        .trim();
    }
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
      transactions_header: [
        { text: "Tx Hash", value: "hash", sortable: false },
        { text: "Height", value: "height", sortable: false },
        { text: "Age", value: "time", sortable: false },
        { text: "From", value: "address", sortable: false },
        { text: "Type", value: "msgs", sortable: false },
        { text: "Status", value: "status", sortable: false },
        { text: "Amount", value: "amount", align: "right", sortable: false }
      ]
    };
  },
  apollo: {
    allTransactions: {
      prefetch: true,
      query: gql`
        query allTransactions($pagination: PaginationInput!) {
          allTransactions(pagination: $pagination) {
            docs {
              hash
              msgs {
                type
                value {
                  ... on MsgDelegate {
                    amount {
                      amount
                      denom
                    }
                  }
                }
              }
              signatures {
                address
              }
              status
              height
              time
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
    totalTxs() {
      if (!this.allTransactions) return 0;
      if (!this.allTransactions.docs) return 0;
      if (this.allTransactions.docs.length === 0) return 0;

      return this.allTransactions.pageInfo.total;
    }
  }
};
</script>

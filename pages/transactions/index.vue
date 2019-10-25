<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" xl="8" class="mx-auto mt-4">
        <h1 class="display-1 font-weight-light grey--text text--darken-3 pb-3">
          <nuxt-link
            v-if="address !== null"
            :to="`/account/${address}`"
            class="pr-4"
            style="text-decoration:none"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </nuxt-link>Transactions
        </h1>
        <v-btn v-if="address !== null" exact outlined to="/transactions" class="mb-2">Reset Filter</v-btn>
      </v-col>
    </v-row>

    <v-row no-gutters class="mt-3">
      <v-col cols="12" xl="8" class="mx-auto">
        <TransactionsDataTable :transactions="allTransactions" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import gql from "graphql-tag";
import TransactionsDataTable from "@/components/Transactions/DataTable";
import getTitle from "~/assets/get-title";

export default {
  head() {
    const title = getTitle("Transactions");
    return {
      title: title,
      meta: [{ hid: "og-title", name: "og:title", content: title }]
    };
  },
  components: {
    TransactionsDataTable
  },
  watchQuery: ["page", "address", "height"],
  key: to => to.fullPath,
  asyncData({ query }) {
    let page = 1;
    let address = null;
    let height = null;

    if (query.page) page = parseInt(query.page);
    if (query.address) address = query.address;
    if (query.height) height = parseInt(query.height);

    return {
      page,
      address
    };
  },
  apollo: {
    allTransactions: {
      prefetch: true,
      query: gql`
        query allTransactions(
          $pagination: PaginationInput!
          $filters: TransactionFiltersInput
        ) {
          allTransactions(pagination: $pagination, filters: $filters) {
            docs {
              hash
              msgs {
                type
                value {
                  ... on MsgSend {
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
          },
          filters: {
            address: this.address,
            height: this.height
          }
        };
      }
    }
  }
};
</script>

<template>
  <v-card tile elevation="1">
    <v-card-title>
      <v-icon large left>mdi-bank-transfer</v-icon>
      <h3 class="title">Transactions</h3>
    </v-card-title>
    <v-divider></v-divider>
    <v-list v-if="allTransactions">
      <v-list-item-group v-for="(transaction, index) in allTransactions.docs" :key="`${index}`">
        <v-divider v-if="index !== 0" :key="`${index}-divider`"></v-divider>
        <v-list-item two-line>
          <v-list-item-avatar>
            <v-icon>mdi-bank-transfer</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="font-weight-medium">
              TX#:
              <nuxt-link
                class="red-link"
                :to="`/transactions/${transaction.hash}`"
              >{{ transaction.hash | hash }}</nuxt-link>
            </v-list-item-title>
            <v-list-item-subtitle>
              From
              <nuxt-link
                class="font-weight-regular"
                :to="`/account/${transaction.signatures[0].address}`"
              >{{ transaction.signatures[0].address }}</nuxt-link>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action-text>{{ transaction.time | timeDistance }}</v-list-item-action-text>
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
    hash: value => shortFilter(value, 12),
    timeDistance: value => prettyUsd(getTimeDistance(value))
  },
  async mounted() {
    await this.$store.dispatch(`explorer/fetchLatestTransactions`);

    setInterval(async () => {
      await this.$store.dispatch(`explorer/fetchLatestTransactions`);
    }, 5000);
  },
  computed: {
    transactions() {
      return this.$store.getters[`explorer/txs`];
    }
  },
  apollo: {
    allTransactions: {
      prefetch: true,
      query: gql`
        query allTransactions($pagination: PaginationInput!) {
          allTransactions(pagination: $pagination) {
            docs {
              hash
              time
              signatures {
                address
              }
            }
          }
        }
      `,
      subscribeToMore: {
        document: gql`
          subscription {
            transactionAdded {
              hash
              time
              signatures {
                address
              }
            }
          }
        `,
        updateQuery: (previousResult, { subscriptionData }) => {
          if (subscriptionData.data.transactionAdded !== null) {
            // The previous result is immutable
            const newResult = {
              allTransactions: {
                docs: [...previousResult.allTransactions.docs.splice(-10, 9)],
                __typename: previousResult.allTransactions.__typename
              }
            };

            // Add the question to the list
            newResult.allTransactions.docs.unshift(
              subscriptionData.data.transactionAdded
            );
            return newResult;
          }
        }
      },
      variables() {
        return {
          pagination: {
            page: 1,
            limit: 10
          }
        };
      }
    }
  }
};
</script>

<template>
  <v-card tile elevation="1">
    <v-card-title>
      <v-icon large left>mdi-bank-transfer</v-icon>
      <h3 class="title">Transactions</h3>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text
      v-if="allTransactions"
      class="py-0"
      style="overflow-y: auto;display:block;max-height:550px"
    >
      <template v-for="(transaction, index) in allTransactions.docs">
        <v-divider v-if="index !== 0" :key="`${index}-divider`"></v-divider>
        <v-row :key="`${index}`">
          <v-col cols="8">
            <div class="subtitle-1 font-weight-medium grey--text text--darken-3">
              TX#
              <nuxt-link
                class="body-2 font-weight-medium"
                :to="`/transactions/${transaction.hash}`"
              >{{ transaction.hash | hash }}</nuxt-link>
            </div>
            <div>
              From
              <nuxt-link
                :to="`/account/${transaction.signatures[0].address}`"
              >{{ transaction.signatures[0].address }}</nuxt-link>
            </div>
            <div class="pt-2">
              <v-chip outlined small>{{ transaction.msgs[0].type | convertMessageType }}</v-chip>
              <v-chip
                outlined
                small
                v-if="transaction.msgs.length - 1"
              >+{{ transaction.msgs.length - 1 }}</v-chip>
            </div>
          </v-col>
          <v-col align="right" class="align-self-center">{{ transaction.time | timeDistance }}</v-col>
        </v-row>
      </template>
    </v-card-text>
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
    timeDistance: value => prettyUsd(getTimeDistance(value)),
    convertMessageType: value => {
      return value
        .replace("cosmos-sdk/Msg", "")
        .replace(/([A-Z])/g, " $1")
        .trim();
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
              msgs {
                type
              }
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
              msgs {
                type
              }
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

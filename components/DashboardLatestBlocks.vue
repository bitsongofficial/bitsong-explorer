<template>
  <v-card tile elevation="1">
    <v-card-title>
      <v-icon large left>mdi-cube-send</v-icon>
      <h3 class="title">Blocks</h3>
    </v-card-title>
    <v-divider></v-divider>

    <v-list v-if="allBlocks">
      <v-list-item-group v-for="(block, index) in allBlocks.docs" :key="`${index}-${block.height}`">
        <v-divider v-if="index !== 0" :key="`${index}-divider`"></v-divider>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="font-weight-medium">
              Block
              <nuxt-link
                class="red-link"
                :to="`/blocks/${block.height}`"
              >{{ block.height | prettyRound }}</nuxt-link>
            </v-list-item-title>
            <v-list-item-subtitle class="mt-2">Includes {{ block.num_txs }} txs</v-list-item-subtitle>
            <v-list-item-subtitle class="mt-2 pb-2">
              Proposer:
              <UIProposer class="font-weight-medium" :address="block.proposer" />
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action-text>{{ block.time | timeDistance }}</v-list-item-action-text>
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
import UIProposer from "@/components/UI/Proposer";

export default {
  components: {
    UIProposer
  },
  filters: {
    prettyRound,
    proposerAddress: value => shortFilter(value, 6),
    timeDistance: value => getTimeDistance(value)
  },
  apollo: {
    allBlocks: {
      prefetch: true,
      query: gql`
        query allBlocks($pagination: PaginationInput!) {
          allBlocks(pagination: $pagination) {
            docs {
              height
              time
              num_txs
              proposer
            }
          }
        }
      `,
      subscribeToMore: {
        document: gql`
          subscription {
            blockAdded {
              height
              time
              num_txs
              proposer
            }
          }
        `,
        updateQuery: (previousResult, { subscriptionData }) => {
          // The previous result is immutable
          const newResult = {
            allBlocks: {
              docs: [...previousResult.allBlocks.docs.splice(-10, 9)],
              __typename: previousResult.allBlocks.__typename
            }
          };
          // Add the question to the list
          newResult.allBlocks.docs.unshift(subscriptionData.data.blockAdded);
          return newResult;
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

<template>
  <v-card tile elevation="1">
    <v-card-title>
      <v-icon large left>mdi-cube-send</v-icon>
      <h3 class="title">Blocks</h3>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text
      v-if="allBlocks"
      class="py-0"
      style="overflow-y: auto;display:block;max-height:550px"
    >
      <template v-for="(block, index) in allBlocks.docs">
        <v-divider v-if="index !== 0" :key="`${index}-divider`"></v-divider>
        <v-row :key="`${index}-${block.height}`">
          <v-col>
            <div class="subtitle-1 font-weight-medium grey--text text--darken-3">
              Block
              <nuxt-link
                class="red-link"
                :to="`/blocks/${block.height}`"
              >{{ block.height | prettyRound }}</nuxt-link>
            </div>
            <div>
              Includes {{ block.num_txs }} txs
              <span
                class="hidden-sm-and-down"
              >, Fees [TODO] {{ $store.getters[`app/stakeDenom`] }}</span>
            </div>
            <div class="hidden-sm-and-up">Fees [TODO] {{ $store.getters[`app/stakeDenom`] }}</div>
          </v-col>
          <v-col align="right" class="align-self-center">
            <div>{{ block.time | timeDistance }}</div>
            <div>
              <UIProposer class="font-weight-medium" :address="block.proposer" />
            </div>
          </v-col>
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

<template>
  <v-card tile elevation="1">
    <v-card-title>
      <v-icon large left>mdi-bank-transfer</v-icon>
      <h3 class="title">Transactions</h3>
    </v-card-title>
    <v-divider></v-divider>
    <v-list>
      <v-list-item-group v-for="(transaction, index) in transactions" :key="`${index}-${transaction._id}`">
        <v-divider v-if="index !== 0" :key="`${index}-divider`"></v-divider>
        <v-list-item two-line>
          <v-list-item-avatar>
            <v-icon>mdi-bank-transfer</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="font-weight-medium">TX#: <nuxt-link class="red-link" :to="`/transactions/${transaction.hash}`">{{ transaction.hash | hash }}</nuxt-link></v-list-item-title>
            <v-list-item-subtitle><span class="font-weight-medium">{{ transaction.msgs[0].type.replace(`cosmos-sdk/Msg`, ``) }}</span> <span class="font-weight-medium" v-if="transaction.msgs.length > 1">+{{ transaction.msgs.length }}</span></v-list-item-subtitle>
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
import { prettyUsd, prettyRound, shortFilter, getTimeDistance } from "~/assets/utils";
export default {
  filters: {
    hash: (value) => shortFilter(value, 12),
    timeDistance: (value) => prettyUsd(getTimeDistance(value))
  },
  async mounted() {
    await this.$store.dispatch(`explorer/fetchLatestTransactions`)
  },
  computed: {
    transactions () {
      return this.$store.getters[`explorer/txs`]
    }
  }
}
</script>

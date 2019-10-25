<template>
  <v-card tile elevation="1">
    <v-list-item two-line>
      <v-list-item-avatar>
        <v-icon>mdi-arrange-bring-forward</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{ this.$store.getters['pool/not_bonded_tokens'] | pretty }}</v-list-item-title>
        <v-list-item-subtitle>Not Bonded</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-content>
        <v-list-item-title>{{ this.$store.getters['pool/bonded_tokens'] | pretty }}</v-list-item-title>
        <v-list-item-subtitle>Bonded</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list-item two-line icon>
      <v-list-item-avatar>
        <v-icon>mdi-all-inclusive</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{ this.$store.getters['pool/total_supply'] | pretty }}</v-list-item-title>
        <v-list-item-subtitle>Total Supply</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-content>
        <v-list-item-title>{{ this.$store.getters['pool/community_pool'] | pretty }}</v-list-item-title>
        <v-list-item-subtitle>Community Pool</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
import { pretty } from "~/assets/utils";
import UIAmount from "@/components/UI/Amount";

export default {
  components: {
    UIAmount
  },
  filters: {
    pretty
  },
  mounted() {
    this.$store.dispatch(`minting/getInflation`);
    this.$store.dispatch(`pool/getPool`);
    setInterval(() => {
      this.$store.dispatch(`pool/getPool`);
    }, 60000);
    setInterval(() => {
      this.$store.dispatch(`minting/getInflation`);
    }, 300000);
  }
};
</script>

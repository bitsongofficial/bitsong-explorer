<template>
  <v-card tile elevation="1">
    <v-list-item two-line icon>
      <v-list-item-avatar>
        <v-icon>mdi-currency-usd</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>${{ price }}</v-list-item-title>
        <v-list-item-subtitle>{{ $store.getters[`app/stakeDenom`] }} Price</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-content>
        <v-list-item-title>-</v-list-item-title>
        <v-list-item-subtitle>Market Cap</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list-item two-line>
      <v-list-item-avatar>
        <v-icon>mdi-cube-outline</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title v-if="lastBlock">{{ lastBlock | prettyRound }}</v-list-item-title>
        <v-list-item-title v-else>-</v-list-item-title>
        <v-list-item-subtitle>Block Height</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-content>
        <v-list-item-title v-if="totalTxs">{{ totalTxs | prettyRound }}</v-list-item-title>
        <v-list-item-title v-else>-</v-list-item-title>
        <v-list-item-subtitle>Transactions</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
  </v-card>
</template>

<script>
import BigNumber from "bignumber.js";
import prettyNum, { PRECISION_SETTING } from "pretty-num";
import { pretty, prettyUsd, prettyRound, round } from "~/assets/utils";
export default {
  filters: {
    prettyRound,
    coinPrice: value =>
      prettyNum(value, {
        precision: 4,
        precisionSetting: PRECISION_SETTING.FIXED
      }),
    marketCap: value => {
      const ROUND_POWER = 3;
      value = value.toString();
      if (value === "NaN") value = 0;
      if (value > Math.pow(10, 9)) {
        return round(value / Math.pow(10, 9), ROUND_POWER) + " billion";
      }
      if (value > Math.pow(10, 6)) {
        return round(value / Math.pow(10, 6), ROUND_POWER) + " million";
      }
      return prettyUsd(value);
    }
  },
  computed: {
    totalTxs() {
      return this.$store.getters["connection/lastHeader"].total_txs;
    },
    lastBlock() {
      return this.$store.getters["connection/lastHeader"].height;
    },
    totalCap() {
      return new BigNumber(
        this.$store.getters["pool/total_supply"]
      ).multipliedBy(this.price);
    },
    price() {
      return this.$store.getters["market/price"];
    }
  }
};
</script>

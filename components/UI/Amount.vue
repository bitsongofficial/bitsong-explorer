<template>
  <span>
    {{ integer }}<span class="caption">.{{ decimals }} {{ macroDenom }}</span>
  </span>
</template>

<script>
import config from "@/assets/config";
import BigNumber from "bignumber.js";

export default {
  props: {
    microAmount: {
      type: [Number, String],
      default: 0
    },
    denom: {
      type: String,
      required: true
    }
  },
  computed: {
    macroDenom() {
      return this.denom.replace("u", "").toUpperCase();
    },
    number() {
      return new BigNumber(this.microAmount)
        .div(10 ** config.decimals)
        .toFixed(config.decimals);
    },
    integer() {
      let parts = this.number.toString().split(".");
      return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
    decimals() {
      let parts = this.number.toString().split(".");

      return parts[1];
    }
  }
};
</script>
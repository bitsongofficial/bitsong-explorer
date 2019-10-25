<template>
  <span class="chain_name" :class="{'white--text chain_name_padding': topbar}">
    <v-icon dark class="pr-3" color="green" size="12">mdi-circle</v-icon>
    <span>bitsong-testnet-2</span>
  </span>
</template>

<script>
export default {
  props: {
    topbar: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.chain_name {
  display: flex;
  height: 100% !important;
  align-items: center;
  vertical-align: middle;
  font-weight: 500;
}
.chain_name_padding {
  padding: 0 20px;
}
</style>

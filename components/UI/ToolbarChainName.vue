<template>
  <span class="chain_name">
    <v-icon dark class="pr-3" color="green" size="12">mdi-circle</v-icon>
    <span class="hidden-sm-and-down">{{ $store.getters[`app/network`] }}</span>
  </span>
</template>

<script>
export default {};
</script>

<style scoped>
.chain_name {
  display: flex;
  height: 100% !important;
  align-items: center;
  vertical-align: middle;
  padding: 0 20px;
  font-weight: 500;
}
</style>

<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" xl="10" class="mx-auto mt-4">
        <DashboardLatestTransactions />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DashboardLatestTransactions from '@/components/DashboardLatestTransactions'

export default {
  components: {
    DashboardLatestTransactions,
  }
}
</script>

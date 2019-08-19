<template>
  <v-container>
    <v-row no-gutters>
      <v-col xl="8" class="mx-auto">
        <v-row class="mt-4">
          <v-col cols="12" md="4">
            <DashboardMarketCap />
          </v-col>
          <v-col cols="12" md="4">
            <DashboardPools />
          </v-col>
          <v-col cols="12" md="4">
            <DashboardValidators />
          </v-col>
        </v-row>

        <v-row class="mt-4">
          <v-col cols="12">
            <DashboardConsensusState />
          </v-col>
        </v-row>

        <v-row class="mt-4">
          <v-col cols="12" md="6"><DashboardLatestBlocks /></v-col>
          <v-col cols="12" md="6"><DashboardLatestTransactions /></v-col>
        </v-row>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import DashboardMarketCap from '@/components/DashboardMarketCap'
import DashboardPools from '@/components/DashboardPools'
import DashboardValidators from '@/components/DashboardValidators'
import DashboardConsensusState from '@/components/DashboardConsensusState'
import DashboardLatestBlocks from '@/components/DashboardLatestBlocks'
import DashboardLatestTransactions from '@/components/DashboardLatestTransactions'

export default {
  components: {
    DashboardMarketCap,
    DashboardPools,
    DashboardValidators,
    DashboardConsensusState,
    DashboardLatestBlocks,
    DashboardLatestTransactions
  }
}
</script>

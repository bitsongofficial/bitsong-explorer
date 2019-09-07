<template>
  <v-container>
    <v-row no-gutters>
      <v-col xl="8" class="mx-auto">
        <v-row :class="{'mt-4': !isMobile}">
          <v-col class="hidden-sm-and-down" cols="12" md="4">
            <DashboardMarketCap />
          </v-col>
          <v-col class="hidden-sm-and-down" cols="12" md="4">
            <DashboardPools />
          </v-col>
          <v-col class="hidden-sm-and-down" cols="12" md="4">
            <DashboardValidators />
          </v-col>
          <v-col class="hidden-md-and-up pb-0">
            <v-carousel :show-arrows="false" :height="190" light hide-delimiter-background>
              <v-carousel-item>
                <DashboardMarketCap
                  style="border-left:2px solid #e7e7e7;border-right:2px solid #e7e7e7;border-top:2px solid #f4f4f4"
                />
              </v-carousel-item>
              <v-carousel-item>
                <DashboardPools
                  style="border-left:2px solid #e7e7e7;border-right:2px solid #e7e7e7;border-top:2px solid #f4f4f4"
                />
              </v-carousel-item>
              <v-carousel-item>
                <DashboardValidators
                  style="border-left:2px solid #e7e7e7;border-right:2px solid #e7e7e7;border-top:2px solid #f4f4f4"
                />
              </v-carousel-item>
            </v-carousel>
          </v-col>
        </v-row>

        <v-row :class="{'mt-4': !isMobile}">
          <v-col cols="12">
            <DashboardConsensusState />
          </v-col>
        </v-row>

        <v-row :class="{'mt-4': !isMobile}">
          <v-col cols="12" md="6">
            <DashboardLatestBlocks />
          </v-col>
          <v-col cols="12" md="6">
            <DashboardLatestTransactions />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DashboardMarketCap from "@/components/DashboardMarketCap";
import DashboardPools from "@/components/DashboardPools";
import DashboardValidators from "@/components/DashboardValidators";
import DashboardConsensusState from "@/components/DashboardConsensusState";
import DashboardLatestBlocks from "@/components/DashboardLatestBlocks";
import DashboardLatestTransactions from "@/components/DashboardLatestTransactions";

export default {
  components: {
    DashboardMarketCap,
    DashboardPools,
    DashboardValidators,
    DashboardConsensusState,
    DashboardLatestBlocks,
    DashboardLatestTransactions
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.name === "xs";
    }
  }
};
</script>

<style>
.v-carousel__controls__item.theme--light.v-btn.v-btn--icon {
  color: rgba(0, 0, 0, 0.34) !important;
  height: 21px;
  width: 21px;
}

.v-btn__content > i {
}
.v-carousel__controls
  > .v-item-group
  > .v-carousel__controls__item
  > .v-btn__content
  > .mdi-circle {
  height: 20px !important;
  font-size: 15px !important;
}
</style>

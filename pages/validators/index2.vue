<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" xl="6" class="mx-auto mt-4">
        <v-card class="elevation-1">
          <ValidatorsToolbarIndex />
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" xl="6" class="mx-auto mt-4">
        <v-expansion-panels>
          <v-expansion-panel
            v-for="(validator, i) in $store.getters[`validators/validators`]"
            :key="i"
            hide-actions
          >
            <v-expansion-panel-header>
              <v-row align="center" class="spacer" no-gutters>
                <v-col cols="3" sm="2" md="1">
                  <v-avatar size="36px" v-if="validator.details.description.profile_url">
                    <img :src="validator.details.description.profile_url" />
                  </v-avatar>
                  <v-avatar size="36px" v-else v-html="avatar(validator.address)"></v-avatar>
                </v-col>
                <v-col sm="5" md="6">
                  <div>{{ validator.details.description.moniker }}</div>
                  <div
                    class="grey--text text-truncate caption hidden-sm-and-down"
                  >{{ validator.details.operatorAddress }}</div>
                </v-col>
                <v-col class="grey--text text-truncate hidden-sm-and-down">
                  Commission &mdash;
                  <span
                    class="black--text"
                  >{{ validator.details.commission.rate * 100 }}%</span>
                </v-col>
                <v-col class="grey--text text-truncate mr-4" align="right">
                  <div>{{ validator.voting_power }}</div>
                  <div class="caption">51.10%</div>
                </v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-divider></v-divider>
              <v-card-text>dsadasd</v-card-text>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import jdenticon from "jdenticon";
import ValidatorsToolbarIndex from "@/components/validators/ToolbarIndex";

export default {
  components: {
    ValidatorsToolbarIndex
  },
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch(`validators/getValidators`);
  },
  methods: {
    avatar(value) {
      return jdenticon.toSvg(value, 36);
    }
  }
};
</script>

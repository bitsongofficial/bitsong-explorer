<template>
  <v-card tile elevation="1">
    <v-card-title>
      <h3 class="title">Consensus State</h3>
    </v-card-title>
    <v-list>
      <v-list-item two-line>
        <v-list-item-content class="text-center">
          <v-list-item-title>{{ $store.getters[`consensus/height`] | prettyRound }}</v-list-item-title>
          <v-list-item-subtitle>Height</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-content class="text-center">
          <v-list-item-title>
            <UIProposer :address="$store.getters[`consensus/proposer_address`]" />
          </v-list-item-title>
          <v-list-item-subtitle>Proposer</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-content class="text-center">
          <v-list-item-title>{{ $store.getters[`consensus/round`] }}</v-list-item-title>
          <v-list-item-subtitle>Round</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-content class="text-center">
          <v-list-item-title>{{ $store.getters[`consensus/step`] }}</v-list-item-title>
          <v-list-item-subtitle>Step</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-progress-linear v-model="$store.getters[`consensus/votedPower`]"></v-progress-linear>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { prettyRound, shortFilter } from "~/assets/utils";
import UIProposer from "@/components/UI/Proposer";

export default {
  components: {
    UIProposer
  },
  filters: {
    prettyRound,
    proposerAddress: value => shortFilter(value, 8)
  }
};
</script>

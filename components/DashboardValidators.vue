<template>
  <v-card tile elevation="1">
    <v-list-item two-line>
      <v-list-item-avatar>
        <v-icon>mdi-server-network</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{ active }}</v-list-item-title>
        <v-list-item-subtitle>Active Validators</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-content>
        <v-list-item-title>{{ inactive }}</v-list-item-title>
        <v-list-item-subtitle>Inactive Validators</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list-item two-line icon>
      <v-list-item-avatar>
        <v-icon>mdi-power-plug</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{ voting_power }}</v-list-item-title>
        <v-list-item-subtitle>Voting Power</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-content>
        <v-list-item-title>{{ inflation }}%</v-list-item-title>
        <v-list-item-subtitle>Inflation</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  computed: {
    validators() {
      return this.$store.getters[`validators/validators`];
    },
    active() {
      const validators = this.validators.filter(v => v.status === 2);
      return validators.length;
    },
    inactive() {
      const validators = this.validators.filter(v => v.status !== 2);
      return validators.length;
    },
    voting_power() {
      return this.$store.getters[`validators/totalPower`]
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
    inflation() {
      return this.$store.getters["minting/inflation"];
    }
  }
};
</script>

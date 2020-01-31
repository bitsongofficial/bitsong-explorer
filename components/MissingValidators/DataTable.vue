<template>
  <v-card class="elevation-1">
    <v-toolbar flat>
      <v-toolbar-title class="subtitle-1">Missing Validators</v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-data-table
      :headers="headers"
      hide-default-footer
      :items-per-page="items_per_page"
      :items="validators"
    >
      <template v-slot:item.moniker="{ item }">
        <nuxt-link
          v-if="item.description.moniker"
          :to="`/validators/${item.operator_address}`"
          >{{ item.description.moniker }}</nuxt-link
        >
        <nuxt-link v-else :to="`/validators/${item.operator_address}`">{{
          item.operator_address
        }}</nuxt-link>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  props: {
    items: {
      type: Object,
      required: true,
      default: () => {
        return {};
      }
    },
    items_per_page: {
      type: Number,
      default: 50
    }
  },
  data() {
    return {
      limitRecords: this.items_per_page,
      headers: [{ text: "Validator Name", value: "moniker", sortable: false }]
    };
  },
  computed: {
    validators() {
      if (this.items && this.items.validators) {
        return this.items.validators;
      }

      return [];
    }
  }
};
</script>

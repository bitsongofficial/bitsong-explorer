<template>
  <v-card class="elevation-1">
    <v-toolbar flat>
      <v-toolbar-title class="subtitle-1">
        {{ totalTxs }}
        <span v-if="totalTxs === 1">transaction</span>
        <span v-else>transactions</span> found
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <Pagination v-if="!default_pagination" :pagination-info="transactions.pageInfo" />
      <v-btn
        v-if="default_pagination && totalTxs > 25 && address && !height"
        outlined
        nuxt
        :to="`/transactions?address=${address}`"
      >View All</v-btn>
      <v-btn
        v-if="default_pagination && totalTxs > 25 && height && !address"
        outlined
        nuxt
        :to="`/transactions?height=${height}`"
      >View All</v-btn>
    </v-toolbar>
    <v-divider></v-divider>
    <v-data-table
      :headers="transactions_header"
      :hide-default-footer="!default_pagination"
      :items-per-page="items_per_page"
      :items="transactions.docs"
    >
      <template v-slot:item.hash="{ item }">
        <nuxt-link :to="`/transactions/${item.hash}`">{{ item.hash | hash }}</nuxt-link>
      </template>
      <template v-slot:item.address="{ item }">
        <UIProposer :deladdr="item.signatures[0].address" />
      </template>
      <template v-slot:item.msgs="{ item }">
        <v-chip outlined small>{{ item.msgs[0].type | convertMessageType }}</v-chip>
        <v-chip outlined small v-if="item.msgs.length - 1">+{{ item.msgs.length - 1 }}</v-chip>
      </template>
      <template v-slot:item.status="{ item }">
        <v-tooltip bottom v-if="item.status">
          <template v-slot:activator="{ on }">
            <v-icon color="green" v-on="on">mdi-check-bold</v-icon>
          </template>
          <span>Success</span>
        </v-tooltip>
        <v-tooltip bottom v-else>
          <template v-slot:activator="{ on }">
            <v-icon color="red" v-on="on">mdi-alert-circle</v-icon>
          </template>
          <span>Fail</span>
        </v-tooltip>
      </template>
      <template v-slot:item.amount="{ item }">
        <nuxt-link
          v-if="!item.msgs[0].value.amount"
          :to="`/transactions/${item.hash}`"
          style="text-decoration:none"
        >
          <v-icon size="18">mdi-open-in-new</v-icon>
        </nuxt-link>
        <UIAmount
          v-else
          v-for="amount in item.msgs[0].value.amount"
          v-bind:key="amount.amount"
          :microAmount="amount.amount"
          :denom="amount.denom"
        />
      </template>
      <template v-slot:item.height="{ item }">
        <nuxt-link :to="`/blocks/${item.height}`">{{ item.height }}</nuxt-link>
      </template>
      <template v-slot:item.time="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <span v-on="on">{{ item.time | timeDistance }}</span>
          </template>
          <span>{{ item.time }}</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <v-divider v-if="!default_pagination"></v-divider>
    <v-toolbar flat v-if="!default_pagination">
      <div class="flex-grow-1"></div>
      <Pagination :pagination-info="transactions.pageInfo" />
    </v-toolbar>
  </v-card>
</template>

<script>
import { shortFilter, getTimeDistance } from "~/assets/utils";
import Pagination from "@/components/Pagination";
import UIAmount from "@/components/UI/Amount";
import UIProposer from "@/components/UI/Proposer";

export default {
  props: {
    transactions: {
      type: Object,
      required: true,
      default: () => {
        return {};
      }
    },
    default_pagination: {
      type: Boolean,
      default: false
    },
    items_per_page: {
      type: Number,
      default: 25
    },
    address: {
      type: String,
      default: ""
    },
    height: {
      type: Number,
      default: 0
    }
  },
  components: {
    Pagination,
    UIAmount,
    UIProposer
  },
  filters: {
    hash: value => shortFilter(value, 12),
    timeDistance: value => getTimeDistance(value),
    convertMessageType: value => {
      return value
        .replace("cosmos-sdk/Msg", "")
        .replace(/([A-Z])/g, " $1")
        .trim();
    }
  },
  data() {
    return {
      limitRecords: 25,
      transactions_header: [
        { text: "Tx Hash", value: "hash", sortable: false },
        { text: "Height", value: "height", sortable: false },
        { text: "Age", value: "time", sortable: false },
        { text: "From", value: "address", sortable: false },
        { text: "Type", value: "msgs", sortable: false },
        { text: "Status", value: "status", sortable: false },
        { text: "Amount", value: "amount", align: "right", sortable: false }
      ]
    };
  },
  computed: {
    totalTxs() {
      if (!this.transactions) return 0;
      if (!this.transactions.docs) return 0;
      if (this.transactions.docs.length === 0) return 0;

      return this.transactions.pageInfo.total;
    }
  }
};
</script>

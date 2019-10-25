<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" xl="8" class="mx-auto mt-4">
        <h1 class="display-1 font-weight-light grey--text text--darken-3 pb-3">Validators</h1>
        <v-toolbar flat color="transparent">
          <template v-for="(item, index) in status.items">
            <v-chip
              color="primary"
              :key="index"
              @click="onStatusClick(item.value)"
              :outlined="status.selected !== item.value"
              :class="index !== 0 ? 'ml-4' : ''"
            >{{ item.label }}</v-chip>
          </template>
          <div class="flex-grow-1"></div>
          <v-toolbar-items class="hidden-sm-and-down">
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn text color="grey darken-3" dark v-on="on">Sort by: {{ sortLabel }}</v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in sort.items"
                  :key="index"
                  @click="onSortChange(item.value)"
                >
                  <v-list-item-title>{{ item.label }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-btn icon @click="toggleSortDirection">
              <v-icon>{{ sort_direction.selected === 'asc' ? 'mdi-sort-ascending' : 'mdi-sort-descending' }}</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" xl="8" class="mx-auto mt-4">
        <v-expansion-panels>
          <v-expansion-panel v-for="(validator, i) in validatorsFormatted" :key="i" hide-actions>
            <v-expansion-panel-header>
              <v-row align="center" class="spacer" no-gutters>
                <v-col cols="3" sm="3" md="1">
                  <UIProposerAvatar :validator="validator" size="36px" v-if="validator.address" />
                  <v-icon v-else dark class="pl-3" color="red" size="18">mdi-circle</v-icon>
                </v-col>
                <v-col sm="5" md="4">
                  <div class="font-weight-medium">{{ validator.description.moniker }}</div>
                  <div class="caption grey--text text--darken-1 hidden-sm-and-up mt-1">
                    Voting Power {{ validator.voting_power | prettyRound }}
                    &middot; Comm. {{ validator.commission.commission_rates.rate * 100 }}%
                  </div>
                </v-col>
                <v-col class="grey--text text-truncate hidden-sm-and-down">
                  Commission &mdash;
                  <span
                    class="grey--text text--darken-3"
                  >{{ validator.commission.commission_rates.rate * 100 }}%</span>
                </v-col>
                <v-col
                  class="grey--text text--darken-3 text-truncate mr-4 hidden-sm-and-down"
                  align="right"
                >
                  <div>
                    {{ validator.voting_power ? validator.voting_power : 0 | prettyRound }}
                    <span
                      class="caption"
                    >&middot; {{ calculatePower(validator.voting_power) }}%</span>
                  </div>
                  <div class="caption">
                    <span class="grey--text text--darken-1">Voting Power</span>
                  </div>
                </v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-divider></v-divider>
              <v-row no-gutter>
                <v-col cols="12">
                  <p
                    class="mb-1"
                    v-if="$vuetify.breakpoint.name === 'xs' || $vuetify.breakpoint.name === 'sm'"
                  >
                    <nuxt-link
                      :to="`/validators/${validator.operator_address}`"
                    >{{ validator.operator_address | address }}</nuxt-link>
                  </p>
                  <p class="mb-1" v-else>
                    <nuxt-link
                      :to="`/validators/${validator.operator_address}`"
                    >{{ validator.operator_address }}</nuxt-link>
                  </p>
                  <div class="body-2 grey--text text--darken-2">Operator Address</div>
                </v-col>
                <v-col cols="12" v-if="validator.address">
                  <p
                    class="mb-1"
                    v-if="$vuetify.breakpoint.name === 'xs' || $vuetify.breakpoint.name === 'sm'"
                  >{{ validator.address | address }}</p>
                  <p class="mb-1" v-else>{{ validator.address }}</p>
                  <div class="body-2 grey--text text--darken-2">Address</div>
                </v-col>
                <v-col cols="12" v-if="validator.description.website">
                  <p class="mb-1">
                    <a :href="validator.description.website">{{ validator.description.website }}</a>
                  </p>
                  <div class="body-2 grey--text text--darken-2">Website</div>
                </v-col>
                <v-col cols="12">
                  <p class="mb-1">{{ validator.commission.commission_rates.rate * 100 }}%</p>
                  <div class="body-2 grey--text text--darken-2">Commission</div>
                </v-col>
                <v-col cols="12">
                  <p
                    class="mb-1"
                  >{{ validator.voting_power ? validator.voting_power : 0 | prettyRound }} {{ $store.getters[`app/stakeDenom`] }}</p>
                  <div class="body-2 grey--text text--darken-2">Voting Power</div>
                </v-col>
                <v-col cols="12" v-if="validator.description.details">
                  <p class="mb-1">{{ validator.description.details }}</p>
                  <div class="body-2 grey--text text--darken-2">Description</div>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { prettyRound, shortFilter } from "~/assets/utils";
import gql from "graphql-tag";
import BigNumber from "bignumber.js";
import getTitle from "~/assets/get-title";
import UIProposerAvatar from "@/components/UI/ProposerAvatar";

export default {
  head() {
    const title = getTitle("Validators");
    return {
      title: title,
      meta: [{ hid: "og-title", name: "og:title", content: title }]
    };
  },
  components: {
    UIProposerAvatar
  },
  filters: {
    prettyRound,
    address: value => shortFilter(value, 14)
  },
  apollo: {
    allValidators: {
      prefetch: true,
      query: gql`
        query allValidators(
          $sort: ValidatorSortInput!
          $pagination: PaginationInput
        ) {
          allValidators(sort: $sort, pagination: $pagination) {
            docs {
              address
              voting_power
              proposer_priority
              operator_address
              status
              description {
                moniker
                identity
                website
              }
              commission {
                commission_rates {
                  rate
                }
              }
            }
          }
        }
      `,
      variables() {
        return {
          sort: {
            field: this.sort.selected,
            direction: this.sort_direction.selected === "desc" ? -1 : 1
          },
          pagination: {
            limit: 200
          }
        };
      }
    }
  },
  data() {
    return {
      status: {
        selected: 2,
        items: [
          { value: 2, label: "Active" },
          { value: 1, label: "Inactive" },
          { value: 0, label: "Unbonded" }
        ]
      },
      sort: {
        selected: "voting_power",
        items: [
          { value: "moniker", label: "Moniker" },
          { value: "voting_power", label: "Voting Power" },
          { value: "commission", label: "Commission" }
        ]
      },
      sort_direction: {
        selected: "desc",
        items: [{ value: "asc", icon: "" }, { value: "desc", icon: "" }]
      },
    };
  },
  computed: {
    sortLabel() {
      return this.sort.items.filter(v => v.value === this.sort.selected)[0]
        .label;
    },
    validatorsFormatted() {
      if (!this.allValidators) return;
      if (!this.allValidators.docs) return;

      const validators = this.allValidators.docs.filter(
        v => v.status === this.status.selected
      );

      if (this.sort.selected === "moniker") {
        if (this.sort_direction.selected === "desc")
          return validators.sort((a, b) => {
            return (
              b.description.moniker.toLowerCase().charCodeAt() -
              a.description.moniker.toLowerCase().charCodeAt()
            );
          });

        return validators.sort((a, b) => {
          return (
            a.description.moniker.toLowerCase().charCodeAt() -
            b.description.moniker.toLowerCase().charCodeAt()
          );
        });
      }

      if (this.sort.selected === "commission") {
        if (this.sort_direction.selected === "desc")
          return validators.sort(
            (a, b) =>
              b.commission.commission_rates.rate -
              a.commission.commission_rates.rate
          );

        return validators.sort(
          (a, b) =>
            a.commission.commission_rates.rate -
            b.commission.commission_rates.rate
        );
      }

      if (this.sort_direction.selected === "desc")
        return validators.sort((a, b) => b.voting_power - a.voting_power);

      return validators.sort((a, b) => a.voting_power - b.voting_power);
    },
    totalPower() {
      return this.$store.getters[`validators/totalPower`];
    }
  },
  methods: {
    toggleSortDirection() {
      this.sort_direction.selected =
        this.sort_direction.selected === "desc" ? "asc" : "desc";
    },
    onStatusClick(val) {
      this.status.selected = val;
    },
    onSortChange(val) {
      this.sort.selected = val;
    },
    sortBy(value) {
      if (value === this.sort) {
        this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      }
      this.sort = value;
    },
    calculatePower(share) {
      if (share === null) return 0;
      const sharePower = new BigNumber(share);
      return new BigNumber(sharePower)
        .div(this.totalPower)
        .multipliedBy(100)
        .toFixed(2);
    },
    percentage(val) {
      return new BigNumber(val).multipliedBy(100).toFixed(2);
    }
  }
};
</script>

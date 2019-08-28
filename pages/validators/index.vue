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
          <v-toolbar-items>
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
                  <v-avatar size="36px" v-if="validator.details.description.profile_url">
                    <img :src="validator.details.description.profile_url" />
                  </v-avatar>
                  <v-avatar size="36px" v-else v-html="avatar(validator.address)"></v-avatar>
                </v-col>
                <v-col sm="5" md="4">
                  <div class="font-weight-medium">{{ validator.details.description.moniker }}</div>
                  <div class="caption grey--text text--darken-1 hidden-sm-and-up mt-1">
                    Voting Power {{ validator.voting_power | prettyRound }}
                    &middot; Comm. {{ validator.details.commission.rate * 100 }}%
                  </div>
                </v-col>
                <v-col class="grey--text text-truncate hidden-sm-and-down">
                  Commission &mdash;
                  <span
                    class="grey--text text--darken-3"
                  >{{ validator.details.commission.rate * 100 }}%</span>
                </v-col>
                <v-col
                  class="grey--text text--darken-3 text-truncate mr-4 hidden-sm-and-down"
                  align="right"
                >
                  <div>{{ validator.voting_power | prettyRound }}</div>
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
                      :to="`/validators/${validator.details.operatorAddress}`"
                    >{{ validator.details.operatorAddress | address }}</nuxt-link>
                  </p>
                  <p class="mb-1" v-else>
                    <nuxt-link
                      :to="`/validators/${validator.details.operatorAddress}`"
                    >{{ validator.details.operatorAddress }}</nuxt-link>
                  </p>
                  <div class="body-2 grey--text text--darken-2">Operator Address</div>
                </v-col>
                <v-col cols="12">
                  <p
                    class="mb-1"
                    v-if="$vuetify.breakpoint.name === 'xs' || $vuetify.breakpoint.name === 'sm'"
                  >{{ validator.address | address }}</p>
                  <p class="mb-1" v-else>{{ validator.address }}</p>
                  <div class="body-2 grey--text text--darken-2">Address</div>
                </v-col>
                <v-col cols="12" v-if="validator.details.description.website">
                  <p class="mb-1">
                    <a
                      :href="validator.details.description.website"
                    >{{ validator.details.description.website }}</a>
                  </p>
                  <div class="body-2 grey--text text--darken-2">Website</div>
                </v-col>
                <v-col cols="12">
                  <p class="mb-1">{{ validator.details.commission.rate * 100 }}%</p>
                  <div class="body-2 grey--text text--darken-2">Commission</div>
                </v-col>
                <v-col cols="12">
                  <p class="mb-1">{{ validator.voting_power | prettyRound }} BTSG</p>
                  <div class="body-2 grey--text text--darken-2">Voting Power</div>
                </v-col>
                <v-col cols="12" v-if="validator.details.description.details">
                  <p class="mb-1">{{ validator.details.description.details }}</p>
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
import jdenticon from "jdenticon";
import gql from "graphql-tag";

export default {
  filters: {
    prettyRound,
    address: value => shortFilter(value, 14)
  },
  apollo: {
    validators: {
      prefetch: true,
      query: gql`
        query Validators($sort: String, $sortDirection: String) {
          validators(sort: $sort, sortDirection: $sortDirection) {
            address
            voting_power
            proposer_priority
            details {
              operatorAddress
              tokens
              status
              description {
                moniker
                identity
                profile_url
                website
              }
              commission {
                rate
              }
            }
          }
        }
      `,
      variables() {
        return {
          sort: this.sort.selected,
          sortDirection: this.sort_direction.selected
        };
      },
      pollInterval: 5000
    }
  },
  data() {
    return {
      status: {
        selected: "2",
        items: [
          { value: "2", label: "Active" },
          { value: "1", label: "Inactive" }
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
      }
    };
  },
  mounted() {
    console.log();
  },
  computed: {
    sortLabel() {
      return this.sort.items.filter(v => v.value === this.sort.selected)[0]
        .label;
    },
    validatorsFormatted() {
      if (this.validators)
        return this.validators.filter(
          v => v.details.status === this.status.selected
        );
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
    avatar(value) {
      return jdenticon.toSvg(value, 36);
    },
    sortBy(value) {
      if (value === this.sort) {
        this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      }
      this.sort = value;
    }
  }
};
</script>

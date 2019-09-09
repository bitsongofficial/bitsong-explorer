<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" xl="8" class="mx-auto mt-4" v-if="validator">
        <h1 class="display-1 font-weight-light grey--text text--darken-3 pb-3">
          <nuxt-link to="/validators" class="pr-4" style="text-decoration:none">
            <v-icon>mdi-arrow-left</v-icon>
          </nuxt-link>Validator Details
        </h1>
        <v-row>
          <v-col cols="12">
            <v-card class="elevation-1">
              <v-card-text>
                <v-row no-gutters align-center class="pb-1">
                  <v-col
                    cols="12"
                    md="1"
                    :align="isMobile ? 'center' : ''"
                    :class="isMobile ? 'pb-4': ''"
                  >
                    <UIProposerAvatar :validator="validator" :size="isMobile ? '128px' : '64px'" />
                  </v-col>

                  <v-col cols="12" md="10" :class="isMobile ? 'pb-4': ''">
                    <v-row no-gutters>
                      <v-col :align="isMobile ? 'center' : ''">
                        <h2 class="headline black--text">{{ validator.details.description.moniker }}</h2>
                      </v-col>
                    </v-row>
                    <v-row no-gutters class="mt-3">
                      <v-col cols="12" md="6">
                        <h3
                          class="subtitle-1 grey--text text--darken-4 text-truncate"
                        >{{ validator.details.operator_address }}</h3>
                        <div class="body-2 grey--text text--darken-1">Operator Address</div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <h3 class="subtitle-1 grey--text text--darken-4 text-truncate">
                          <nuxt-link
                            :to="`/account/${validator.details.delegator_address}`"
                          >{{ validator.details.delegator_address }}</nuxt-link>
                        </h3>
                        <div class="body-2 grey--text text--darken-1">Delegator Address</div>
                      </v-col>
                    </v-row>
                  </v-col>

                  <v-col cols="12" md="1" align="center" class="align-self-center">
                    <v-chip color="green" dark v-if="validator.details.status === 2">Active</v-chip>
                    <v-chip color="red" dark v-if="validator.details.status === 0">Inactive</v-chip>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-text>
                <v-row no-gutters>
                  <v-col cols="12" md="6" class="px-3">
                    <v-row>
                      <v-col cols="12">
                        <div
                          class="subtitle-1 grey--text text--darken-4 text-truncate"
                        >{{ validator.address }}</div>
                        <div class="body-2 grey--text text--darken-1">Address</div>
                      </v-col>
                    </v-row>

                    <v-row v-if="validator.details.description.website">
                      <v-col cols="12">
                        <div
                          class="subtitle-1 grey--text text--darken-4"
                        >{{ validator.details.description.website }}</div>
                        <div class="body-2 grey--text text--darken-1">Website</div>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="4">
                        <div
                          class="subtitle-1 grey--text text--darken-4"
                        >{{ validator.details.commission.commission_rates.rate * 100 }}%</div>
                        <div class="body-2 grey--text text--darken-1">Commission Rate</div>
                      </v-col>
                      <v-col cols="4">
                        <div
                          class="subtitle-1 grey--text text--darken-4"
                        >{{ validator.details.commission.commission_rates.max_rate * 100 }}%</div>
                        <div class="body-2 grey--text text--darken-1">Max Rate</div>
                      </v-col>
                      <v-col cols="4">
                        <div
                          class="subtitle-1 grey--text text--darken-4"
                        >{{ validator.details.commission.commission_rates.max_change_rate * 100 }}%</div>
                        <div class="body-2 grey--text text--darken-1">Max Change Rate</div>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12">
                        <div
                          class="subtitle-1 grey--text text--darken-4"
                        >{{ validator.details.commission.update_time }}</div>
                        <div class="body-2 grey--text text--darken-1">Commission Update Time</div>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12">
                        <div class="subtitle-1 grey--text text--darken-4">
                          {{ validator.voting_power | prettyRound }}
                          <span
                            class="caption"
                          >&middot; {{ calculatePower(validator.voting_power) }}%</span>
                        </div>
                        <div class="body-2 grey--text text--darken-1">Voting Power</div>
                      </v-col>
                    </v-row>

                    <v-row v-if="validator.details.description.details">
                      <v-col cols="12">
                        <div
                          class="subtitle-1 grey--text text--darken-4"
                        >{{ validator.details.description.details }}</div>
                        <div class="body-2 grey--text text--darken-1">Description</div>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" md="3" align="center">
                    <apexchart
                      width="255"
                      type="pie"
                      :series="[validator.details.self_shares, validator.details.delegator_shares - validator.details.self_shares]"
                      :options="chartOptions"
                    ></apexchart>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ validator.details.self_shares | toBtsg }}
                          <span
                            class="caption"
                          >{{ $store.getters[`app/stakeDenom`] }}</span>
                        </v-list-item-title>
                        <v-list-item-subtitle>Self Delegated</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ validator.details.delegator_shares - validator.details.self_shares | toBtsg }}
                          <span
                            class="caption"
                          >{{ $store.getters[`app/stakeDenom`] }}</span>
                        </v-list-item-title>
                        <v-list-item-subtitle>Others</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ validator.details.delegator_shares | toBtsg }}
                          <span
                            class="caption"
                          >{{ $store.getters[`app/stakeDenom`] }}</span>
                        </v-list-item-title>
                        <v-list-item-subtitle>Total</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-card class="elevation-1">
              <v-toolbar flat>
                <v-toolbar-title>Delegations</v-toolbar-title>
              </v-toolbar>
              <v-divider></v-divider>
              <v-data-table
                v-if="validator"
                :headers="delegations_header"
                :items-per-page="5"
                :items="validator.delegations"
                :height="288"
              >
                <template v-slot:item.delegator_address="{ item }">
                  <nuxt-link :to="`/account/${item.delegator_address}`">{{ item.delegator_address }}</nuxt-link>
                </template>
                <template v-slot:item.shares="{ item }">
                  {{ item.shares | toBtsg }}
                  <span
                    class="caption"
                  >{{ $store.getters[`app/stakeDenom`] }}</span>
                </template>
              </v-data-table>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card class="elevation-1">
              <v-toolbar flat>
                <v-toolbar-title>Unbonding</v-toolbar-title>
              </v-toolbar>
              <v-divider></v-divider>
              <v-data-table
                :headers="unbondings_header"
                :items-per-page="5"
                :items="formattedUnbondings"
                :height="288"
              >
                <template v-slot:item.delegator_address="{ item }">
                  <nuxt-link
                    :to="`/account/${item.delegator_address}`"
                  >{{ item.delegator_address | address }}</nuxt-link>
                </template>
                <template v-slot:item.amount="{ item }">
                  {{ item.amount | toBtsg}}
                  <span
                    class="caption"
                  >{{ $store.getters[`app/stakeDenom`] }}</span>
                </template>
                <template v-slot:item.completion_time="{ item }">{{ item.completion_time | toTime }}</template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import gql from "graphql-tag";
import { prettyRound, shortFilter } from "~/assets/utils";
import getTitle from "~/assets/get-title";
import { toBtsg, toMacroDenom, toTime } from "@/filters";
import BigNumber from "bignumber.js";

import UIProposerAvatar from "@/components/UI/ProposerAvatar";

export default {
  head() {
    const title = getTitle("Validator " + this.$route.params.validator);
    return {
      title: title,
      meta: [{ hid: "og-title", name: "og:title", content: title }]
    };
  },
  components: {
    UIProposerAvatar
  },
  asyncData({ params, error }) {
    const operatorAddress = params.validator;

    return {
      operatorAddress
    };
  },
  filters: {
    prettyRound,
    address: value => shortFilter(value, 12),
    toBtsg,
    toMacroDenom,
    toTime
  },
  data() {
    return {
      delegations_header: [
        { text: "Delegator Address", value: "delegator_address" },
        { text: "Amount", align: "right", value: "shares" }
      ],
      unbondings_header: [
        { text: "Delegator Address", value: "delegator_address" },
        { text: "Height", value: "height", align: "center" },
        { text: "Amount", align: "right", value: "amount" },
        { text: "Completition Time", align: "right", value: "completion_time" }
      ],
      chartOptions: {
        labels: ["Self delegated", "Others"],
        legend: {
          show: false
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                show: false
              }
            }
          }
        ]
      }
    };
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.name === "xs";
    },
    totalPower() {
      return this.$store.getters[`validators/totalPower`];
    },
    formattedUnbondings() {
      if (!this.validator) return;
      if (!this.validator.unbonding_delegations) return;

      return this.validator.unbonding_delegations.map(v => {
        return v.entries.map(data => {
          return {
            delegator_address: v.delegator_address,
            height: data.creation_height,
            amount: data.balance,
            completion_time: data.completion_time
          };
        });
      })[0];
    }
  },
  apollo: {
    validator: {
      prefetch: true,
      query: gql`
        query Validator($operatorAddress: String!) {
          validator(operatorAddress: $operatorAddress) {
            address
            voting_power
            details {
              operator_address
              delegator_address
              status
              delegator_shares
              self_shares
              description {
                moniker
                identity
                website
                details
              }
              commission {
                commission_rates {
                  rate
                  max_rate
                  max_change_rate
                }
                update_time
              }
            }
            delegations {
              delegator_address
              validator_address
              shares
            }
            unbonding_delegations {
              delegator_address
              validator_address
              entries {
                creation_height
                completion_time
                initial_balance
                balance
              }
            }
          }
        }
      `,
      variables() {
        return {
          operatorAddress: this.operatorAddress
        };
      }
    }
  },
  methods: {
    calculatePower(share) {
      const sharePower = new BigNumber(share);
      return new BigNumber(sharePower)
        .div(this.totalPower)
        .multipliedBy(100)
        .toFixed(2);
    }
  }
};
</script>

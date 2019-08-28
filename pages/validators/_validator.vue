<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" xl="8" class="mx-auto mt-4" v-if="validator">
        <h1 class="display-1 font-weight-light grey--text text--darken-3 pb-3">Validator Detail</h1>
        <v-row>
          <v-col cols="12">
            <v-card class="elevation-1">
              <v-card-text>
                <v-row no-gutters align="center">
                  <v-col class="pl-2">
                    <v-avatar size="64px" v-if="validator.details.description.profile_url">
                      <img :src="validator.details.description.profile_url" />
                    </v-avatar>
                    <v-avatar size="64px" v-else v-html="avatar(validator.address)"></v-avatar>
                  </v-col>
                  <v-col cols="10">
                    <h2 class="headline black--text">{{ validator.details.description.moniker }}</h2>
                    <v-row no-gutters class="mt-3">
                      <v-col cols="6">
                        <h3
                          class="subtitle-1 grey--text text--darken-4"
                        >{{ validator.details.operatorAddress }}</h3>
                        <div class="body-2 grey--text text--darken-1">Operator Address</div>
                      </v-col>
                      <v-col cols="6">
                        <h3 class="subtitle-1 grey--text text--darken-4">
                          <nuxt-link
                            :to="`/account/${validator.details.delegatorAddress}`"
                          >{{ validator.details.delegatorAddress }}</nuxt-link>
                        </h3>
                        <div class="body-2 grey--text text--darken-1">Delegator Address</div>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col align="right" class="mr-4">
                    <v-chip color="green" dark v-if="validator.details.status === '2'">Active</v-chip>
                    <v-chip v-if="validator.details.status === '0'">Inactive</v-chip>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-text>
                <v-row no-gutters>
                  <v-col cols="6" class="px-3">
                    <v-row>
                      <v-col cols="12">
                        <div class="subtitle-1 grey--text text--darken-4">{{ validator.address }}</div>
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
                        >{{ validator.details.commission.rate * 100 }}%</div>
                        <div class="body-2 grey--text text--darken-1">Commission Rate</div>
                      </v-col>
                      <v-col cols="4">
                        <div
                          class="subtitle-1 grey--text text--darken-4"
                        >{{ validator.details.commission.maxRate * 100 }}%</div>
                        <div class="body-2 grey--text text--darken-1">Max Rate</div>
                      </v-col>
                      <v-col cols="4">
                        <div
                          class="subtitle-1 grey--text text--darken-4"
                        >{{ validator.details.commission.maxChangeRate * 100 }}%</div>
                        <div class="body-2 grey--text text--darken-1">Max Change Rate</div>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12">
                        <div
                          class="subtitle-1 grey--text text--darken-4"
                        >{{ validator.details.commission.updateTime }}</div>
                        <div class="body-2 grey--text text--darken-1">Commission Update Time</div>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12">
                        <div
                          class="subtitle-1 grey--text text--darken-4"
                        >{{ validator.voting_power | prettyRound }}</div>
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
                  <v-col cols="3">
                    <apexchart width="255" type="pie" :series="series" :options="chartOptions"></apexchart>
                  </v-col>
                  <v-col cols="3">
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-title>16 254 545</v-list-item-title>
                        <v-list-item-subtitle>Self Delegated</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-title>16 254 545</v-list-item-title>
                        <v-list-item-subtitle>Others</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-title>16 254 545</v-list-item-title>
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
          <v-col cols="6">
            <v-card class="elevation-1" v-if="delegations">
              <v-toolbar flat>
                <v-toolbar-title>Delegators</v-toolbar-title>
              </v-toolbar>
              <v-divider></v-divider>
              <v-data-table
                :headers="delegators_header"
                :items-per-page="5"
                :items="delegations.delegators"
                :height="288"
              >
                <template v-slot:item.delegator_address="{ item }">
                  <nuxt-link :to="`/account/${item.delegator_address}`">{{ item.delegator_address }}</nuxt-link>
                </template>
                <template v-slot:item.shares="{ item }">{{ item.shares | toBtsg }} BTSG</template>
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
import jdenticon from "jdenticon";
import { toBtsg, toMacroDenom } from "@/filters";

export default {
  asyncData({ params, error }) {
    const operatorAddress = params.validator;

    return {
      operatorAddress
    };
  },
  filters: {
    prettyRound,
    address: value => shortFilter(value, 14),
    toBtsg,
    toMacroDenom
  },
  data() {
    return {
      delegators_header: [
        { text: "Delegator Address", value: "delegator_address" },
        { text: "Amount", align: "right", value: "shares" }
      ],
      series: [20000, 132510],
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
  apollo: {
    validator: {
      prefetch: true,
      query: gql`
        query Validator($operatorAddress: String!) {
          validator(operatorAddress: $operatorAddress) {
            address
            voting_power
            details {
              operatorAddress
              delegatorAddress
              status
              description {
                moniker
                profile_url
                website
                details
              }
              commission {
                rate
                maxRate
                maxChangeRate
                updateTime
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
    },
    delegations: {
      prefetch: true,
      query: gql`
        query Delegations($operatorAddress: String!) {
          delegations(operatorAddress: $operatorAddress) {
            delegators {
              delegator_address
              validator_address
              shares
            }
            total_delegator_num
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
    avatar(value) {
      return jdenticon.toSvg(value, 64);
    }
  }
};
</script>

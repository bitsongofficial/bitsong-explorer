<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" xl="8" class="mx-auto mt-4" v-if="validator">
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
                <h2 class="display-1 black--text">{{ validator.details.description.moniker }}</h2>
                <h5
                  class="subtitle-1 grey--text text--darken-2"
                >{{ validator.details.operatorAddress }}</h5>
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
              <v-col cols="6">
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ validator.address }}</v-list-item-title>
                    <v-list-item-subtitle>Address</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line v-if="validator.details.description.website">
                  <v-list-item-content>
                    <v-list-item-title>{{ validator.details.description.website }}</v-list-item-title>
                    <v-list-item-subtitle>Website</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ validator.details.commission.rate * 100 }}%</v-list-item-title>
                    <v-list-item-subtitle>Commission</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ validator.voting_power | prettyRound }} BTSG</v-list-item-title>
                    <v-list-item-subtitle>Voting Power</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line v-if="validator.details.description.details">
                  <v-list-item-content>
                    <v-list-item-title>{{ validator.details.description.details }}</v-list-item-title>
                    <v-list-item-subtitle>Description</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
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
  </v-container>
</template>

<script>
import gql from "graphql-tag";
import { prettyRound, shortFilter } from "~/assets/utils";
import jdenticon from "jdenticon";

export default {
  asyncData({ params, error }) {
    const operatorAddress = params.validator;

    return {
      operatorAddress
    };
  },
  filters: {
    prettyRound,
    address: value => shortFilter(value, 14)
  },
  data() {
    return {
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
              status
              description {
                moniker
                profile_url
                website
                details
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

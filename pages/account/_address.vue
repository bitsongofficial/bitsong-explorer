<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" xl="8" class="mx-auto mt-4">
        <h1 class="display-1 font-weight-light grey--text text--darken-3 pb-3">Account Detail</h1>

        <v-row v-if="account">
          <v-col cols="12">
            <v-card class="elevation-1">
              <v-card-text>
                <v-row no-gutters>
                  <v-col
                    cols="12"
                    md="1"
                    :align="isMobile ? 'center' : ''"
                    :class="isMobile ? 'pb-4': ''"
                  >
                    <v-avatar
                      :size="isMobile ? '128px' : '64px'"
                      v-html="avatar(`${account.address}`)"
                    ></v-avatar>
                  </v-col>
                  <v-col cols="12" md="10" :class="isMobile ? 'pb-4': ''">
                    <v-row no-gutters class="pb-1">
                      <v-col cols="12">
                        <h3
                          class="subtitle-1 grey--text text--darken-4 text-truncate"
                        >{{ account.address }}</h3>
                        <div class="body-2 grey--text text--darken-1">Address</div>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-text>
                <v-row no-gutters>
                  <v-col cols="12" md="4" align="center" class="pl-3 align-self-center">
                    <apexchart
                      width="255"
                      type="pie"
                      :series="[parseFloat(account.balances.available), parseFloat(account.balances.bonded), parseFloat(account.balances.unbonding), parseFloat(account.balances.rewards)]"
                      :options="chartOptions"
                    ></apexchart>
                  </v-col>
                  <v-col cols="12" class="hidden-sm-and-up" align="center">
                    <div class="display-1 font-weight-light grey--text text--darken-4">
                      <UIAmount :microAmount="totalBalance" :denom="$store.getters[`app/stakeDenom`]" />
                    </div>
                    <div
                      class="subtitle-1 grey--text text--darken-1 pt-1"
                    >Total {{ $store.getters[`app/stakeDenom`] }} Balance</div>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-row>
                      <v-col cols="12">
                        <div class="subtitle-1 grey--text text--darken-4">
                          <UIAmount :microAmount="account.balances.available" :denom="$store.getters[`app/stakeDenom`]" />
                        </div>
                        <div class="body-2 grey--text text--darken-1">Available</div>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12">
                        <div class="subtitle-1 grey--text text--darken-4">
                          <UIAmount :microAmount="account.balances.bonded" :denom="$store.getters[`app/stakeDenom`]" />
                        </div>
                        <div class="body-2 grey--text text--darken-1">Bonded</div>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12">
                        <div class="subtitle-1 grey--text text--darken-4">
                          <UIAmount :microAmount="account.balances.unbonding" :denom="$store.getters[`app/stakeDenom`]" />
                        </div>
                        <div class="body-2 grey--text text--darken-1">Unbonding</div>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12">
                        <div class="subtitle-1 grey--text text--darken-4">
                          <UIAmount :microAmount="account.balances.rewards" :denom="$store.getters[`app/stakeDenom`]" />
                        </div>
                        <div class="body-2 grey--text text--darken-1">Rewards</div>
                      </v-col>
                    </v-row>

                    <v-row v-if="commissions > 0">
                      <v-col cols="12">
                        <div
                          class="subtitle-1 grey--text text--darken-4"
                        >
                        <UIAmount :microAmount="commissions - account.balances.rewards" :denom="$store.getters[`app/stakeDenom`]" /></div>
                        <div class="body-2 grey--text text--darken-1">Commissions</div>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" md="4" class="hidden-sm-and-down align-self-center">
                    <div class="display-1 font-weight-light grey--text text--darken-4">
                      <UIAmount :microAmount="totalBalance" :denom="$store.getters[`app/stakeDenom`]" />
                    </div>
                    <div
                      class="subtitle-1 grey--text text--darken-1 pt-1"
                    >Total {{ $store.getters[`app/stakeDenom`] }} Balance</div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <TransactionsDataTable
              :transactions="allTransactions"
              default_pagination
              :items_per_page="5"
              :address="address"
            />
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
                v-if="account"
                :headers="delegations_header"
                :items-per-page="5"
                :items="account.delegations"
                :height="288"
              >
                <template v-slot:item.validator_address="{ item }">
                  <UIProposer :valoper="item.validator_address" />
                </template>
                <template
                  v-slot:item.shares="{ item }"
                ><UIAmount :microAmount="item.shares" :denom="$store.getters[`app/stakeDenom`]" /></template>
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
                <template v-slot:item.validator_address="{ item }">
                  <UIProposer :valoper="item.validator_address" />
                </template>
                <template
                  v-slot:item.amount="{ item }"
                ><UIAmount :microAmount="item.amount" :denom="$store.getters[`app/stakeDenom`]" /></template>
                <template v-slot:item.completion_time="{ item }">{{ item.completion_time | toTime }}</template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-card class="elevation-1">
              <v-toolbar flat>
                <v-toolbar-title>Redelegations</v-toolbar-title>
              </v-toolbar>
              <v-divider></v-divider>
              <v-data-table
                :headers="redelegations_header"
                :items-per-page="5"
                :items="formattedRedelegations"
                :height="288"
              >
                <template v-slot:item.validator_src_address="{ item }">
                  <UIProposer :valoper="item.validator_src_address" />
                </template>
                <template v-slot:item.validator_dst_address="{ item }">
                  <UIProposer :valoper="item.validator_dst_address" />
                </template>
                <template v-slot:item.creation_height="{ item }">
                  <nuxt-link :to="`/blocks/${item.creation_height}`">{{ item.creation_height }}</nuxt-link>
                </template>
                <template
                  v-slot:item.balance="{ item }"
                ><UIAmount :microAmount="item.balance" :denom="$store.getters[`app/stakeDenom`]" /></template>
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
import jdenticon from "jdenticon";
import gql from "graphql-tag";
import { toTime } from "@/filters";
import { prettyRound, shortFilter } from "~/assets/utils";
import getTitle from "~/assets/get-title";
import TransactionsDataTable from "@/components/Transactions/DataTable";

import UIProposer from "@/components/UI/Proposer";
import UIAmount from "@/components/UI/Amount";

export default {
  head() {
    const title = getTitle("Account " + this.$route.params.address);
    return {
      title: title,
      meta: [{ hid: "og-title", name: "og:title", content: title }]
    };
  },
  components: {
    TransactionsDataTable,
    UIProposer,
    UIAmount
  },
  filters: {
    toTime,
    address: value => shortFilter(value, 12)
  },
  asyncData({ params, error }) {
    return {
      address: params.address
    };
  },
  data() {
    return {
      delegations_header: [
        { text: "Validator Address", value: "validator_address" },
        { text: "Amount", align: "right", value: "shares" }
      ],
      unbondings_header: [
        { text: "Validator Address", value: "validator_address" },
        { text: "Height", value: "height", align: "center" },
        { text: "Amount", align: "right", value: "amount" },
        { text: "Completition Time", align: "right", value: "completion_time" }
      ],
      redelegations_header: [
        { text: "Height", value: "creation_height" },
        { text: "From", value: "validator_src_address" },
        { text: "To", value: "validator_dst_address", align: "left" },
        { text: "Amount", align: "right", value: "balance" },
        { text: "Completition Time", align: "right", value: "completion_time" }
      ],
      chartOptions: {
        labels: ["Available", "Bonded", "Unbonding", "Rewards"],
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
    account: {
      prefetch: true,
      query: gql`
        query Account($address: String!, $valoper: String) {
          account(address: $address, valoper: $valoper) {
            address
            balances {
              available
              bonded
              unbonding
              rewards
              commissions
            }
            delegations {
              shares
              validator_address
            }
            unbonding_delegations {
              validator_address
              entries {
                creation_height
                completion_time
                initial_balance
                balance
              }
            }
            redelegations {
              validator_src_address
              validator_dst_address
              entries {
                creation_height
                completion_time
                balance
              }
            }
          }
        }
      `,
      variables() {
        return {
          address: this.address,
          valoper: this.valoperAddr
        };
      }
    },
    allTransactions: {
      prefetch: true,
      query: gql`
        query allTransactions(
          $pagination: PaginationInput!
          $filters: TransactionFiltersInput
        ) {
          allTransactions(pagination: $pagination, filters: $filters) {
            docs {
              hash
              msgs {
                type
                value {
                  ... on MsgSend {
                    amount {
                      amount
                      denom
                    }
                  }
                }
              }
              signatures {
                address
              }
              status
              height
              time
            }
            pageInfo {
              total
              limit
              page
              pages
            }
          }
        }
      `,
      variables() {
        return {
          pagination: {
            page: 1,
            limit: 25
          },
          filters: {
            address: this.address
          }
        };
      }
    }
  },
  methods: {
    avatar(value) {
      let size = 64;
      if (this.isMobile) {
        size = 128;
      }
      return jdenticon.toSvg(value, size);
    }
  },
  computed: {
    valoperAddr() {
      const validators = this.$store.getters[`validators/validators`];
      if (validators.length === 0) return null;

      const data = validators.find(v => v.delegator_address === this.address);

      if (!data) return null;
      return data.operator_address;
    },
    commissions() {
      let commissions = 0;
      if (this.account.balances.commissions === undefined) return commissions;
      if (this.account.balances.commissions === null) return commissions;
      commissions = parseFloat(this.account.balances.commissions);
      if (isNaN(commissions)) return commissions;

      return commissions;
    },
    isMobile() {
      return this.$vuetify.breakpoint.name === "xs";
    },
    formattedUnbondings() {
      if (!this.account) return;
      if (!this.account.unbonding_delegations) return;

      return this.account.unbonding_delegations.map(v => {
        return v.entries.map(data => {
          return {
            validator_address: v.validator_address,
            height: data.creation_height,
            amount: data.balance,
            completion_time: data.completion_time
          };
        });
      })[0];
    },
    formattedRedelegations() {
      if (!this.account) return;
      if (!this.account.redelegations) return;

      return this.account.redelegations.map(v => {
        return v.entries.map(data => {
          return {
            validator_src_address: v.validator_src_address,
            validator_dst_address: v.validator_dst_address,
            creation_height: data.creation_height,
            balance: data.balance,
            completion_time: data.completion_time
          };
        });
      })[0];
    },
    totalBalance() {
      if (!this.account) return 0;

      return (
        parseFloat(this.account.balances.available) +
        parseFloat(this.account.balances.bonded) +
        parseFloat(this.account.balances.unbonding) +
        parseFloat(this.account.balances.rewards) +
        this.commissions
      );
    }
  }
};
</script>

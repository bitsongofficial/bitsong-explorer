<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" xl="8" class="mx-auto mt-4">
        <h1 class="display-1 font-weight-light grey--text text--darken-3 pb-3">
          <nuxt-link to="/governance" class="pr-4" style="text-decoration:none">
            <v-icon>mdi-arrow-left</v-icon>
          </nuxt-link>Proposal Detail
        </h1>
      </v-col>
    </v-row>

    <v-row no-gutters class="mt-3" v-if="proposalFormatted">
      <v-col cols="12" xl="8" class="mx-auto">
        <v-row no-gutters>
          <v-col cols="12" class="px-2">
            <v-card>
              <v-row class="px-4">
                <v-col>
                  <span
                    class="title font-weight-regular text--darken-2"
                  >#{{ proposal.id }} - {{ proposal.content.value.title }}</span>
                  <br />
                  <div class="body-2 grey--text text--darken-1">
                    <UIProposer :deladdr="proposal.proposer" />&nbsp;·
                    <span>{{ getTime(proposal.submit_time) }}</span>
                  </div>
                </v-col>
                <v-col cols="4" align="end" align-self="center">
                  <v-chip
                    v-if="proposal.proposal_status === 'VotingPeriod'"
                    color="blue"
                    dark
                  >Voting</v-chip>
                  <v-chip v-if="proposal.proposal_status === 'Rejected'" color="red" dark>Rejected</v-chip>
                  <v-chip v-if="proposal.proposal_status === 'Passed'" color="green" dark>Passed</v-chip>
                </v-col>
              </v-row>

              <v-row class="px-4">
                <v-col>{{ proposal.content.value.description }}</v-col>
              </v-row>

              <v-card-text>
                <v-row no-gutters>
                  <v-col cols="12" md="3">
                    <span class="grey--text text--darken-3">{{ proposal.content.type}}</span>
                    <br />Type
                  </v-col>
                  <v-col cols="12" md="3" class="mt-1">
                    <span class="grey--text text--darken-3">{{ getTime(proposal.deposit_end_time) }}</span>
                    <br />Deposit End Time
                  </v-col>
                  <v-col cols="12" md="3" class="mt-1">
                    <span
                      class="grey--text text--darken-3"
                    >{{ getTime(proposal.voting_start_time) }}</span>
                    <br />Voting Start
                  </v-col>
                  <v-col cols="12" md="3" class="mt-1">
                    <span class="grey--text text--darken-3">{{ getTime(proposal.voting_end_time) }}</span>
                    <br />Voting End
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" class="px-2 mt-4" v-if="proposalFormatted">
            <v-card>
              <v-row class="px-4">
                <v-col>
                  <span class="title font-weight-regular text--darken-2">Vote</span>
                </v-col>
              </v-row>

              <v-row class="px-4" no-gutters>
                <v-col>
                  <v-row>
                    <v-col cols="12" md="4" align="center" class="pl-3 align-self-center">
                      <apexchart
                        width="255"
                        type="pie"
                        :series="chartSeries"
                        :options="chartOptions"
                      ></apexchart>
                    </v-col>
                    <v-col cols="12" class="hidden-sm-and-up" align="center">
                      <div class="display-1 font-weight-light grey--text text--darken-4">
                        <UIAmount :microAmount="total" :denom="$store.getters[`app/stakeDenom`]" />
                      </div>
                      <div class="subtitle-1 grey--text text--darken-1 pt-1">Total</div>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-row>
                        <v-col cols="12">
                          <div class="subtitle-1 grey--text text--darken-4">
                            <UIAmount
                              :microAmount="proposal.tally.yes"
                              :denom="$store.getters[`app/stakeDenom`]"
                            />
                          </div>
                          <div class="body-2 grey--text text--darken-1">Yes</div>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col cols="12">
                          <div class="subtitle-1 grey--text text--darken-4">
                            <UIAmount
                              :microAmount="proposal.tally.no"
                              :denom="$store.getters[`app/stakeDenom`]"
                            />
                          </div>
                          <div class="body-2 grey--text text--darken-1">No</div>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col cols="12">
                          <div class="subtitle-1 grey--text text--darken-4">
                            <UIAmount
                              :microAmount="proposal.tally.no_with_veto"
                              :denom="$store.getters[`app/stakeDenom`]"
                            />
                          </div>
                          <div class="body-2 grey--text text--darken-1">NoWithVeto</div>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col cols="12">
                          <div class="subtitle-1 grey--text text--darken-4">
                            <UIAmount
                              :microAmount="proposal.tally.abstain"
                              :denom="$store.getters[`app/stakeDenom`]"
                            />
                          </div>
                          <div class="body-2 grey--text text--darken-1">Abstain</div>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" md="4" class="hidden-sm-and-down align-self-center">
                      <div class="display-1 font-weight-light grey--text text--darken-4">
                        <UIAmount :microAmount="total" :denom="$store.getters[`app/stakeDenom`]" />
                      </div>
                      <div class="subtitle-1 grey--text text--darken-1 pt-1">Total</div>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-col>

          <v-col cols="12" class="px-2 mt-4">
            <v-card>
              <v-row class="px-4">
                <v-col>
                  <span class="title font-weight-regular text--darken-2">Votes</span>
                </v-col>
              </v-row>
              <v-row class="px-4">
                <v-col>
                  <v-data-table
                    v-if="proposalFormatted"
                    :headers="votes_header"
                    :items-per-page="15"
                    :items="proposal.votes"
                  >
                    <template v-slot:item.voter="{ item }">
                      <UIProposer :deladdr="item.voter" />
                    </template>
                    <template v-slot:item.option="{ item }">{{ item.option }}</template>
                  </v-data-table>
                </v-col>
              </v-row>
            </v-card>
          </v-col>

          <v-col cols="12" class="px-2 mt-4">
            <v-card>
              <v-row class="px-4">
                <v-col>
                  <span class="title font-weight-regular text--darken-2">Depositors</span>
                </v-col>
              </v-row>
              <v-row class="px-4">
                <v-col>
                  <v-data-table
                    v-if="proposalFormatted"
                    :headers="deposits_header"
                    :items-per-page="15"
                    :items="proposal.deposits"
                  >
                    <template v-slot:item.depositor="{ item }">
                      <UIProposer :deladdr="item.depositor" />
                    </template>
                    <template v-slot:item.amount="{ item }">
                      <UIAmount
                        :microAmount="item.amount[0].amount"
                        :denom="$store.getters[`app/stakeDenom`]"
                      />
                    </template>
                  </v-data-table>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row></v-row>
  </v-container>
</template>

<script>
import gql from "graphql-tag";
import parseISO from "date-fns/esm/parseISO";
import formatDistanceStrict from "date-fns/esm/formatDistanceStrict";

import UIAmount from "@/components/UI/Amount";
import UIProposer from "@/components/UI/Proposer";

export default {
  components: {
    UIAmount,
    UIProposer
  },
  methods: {
    getTime(timestamp, allowFuture = true) {
      if (typeof timestamp === "string") {
        timestamp = parseISO(timestamp);
      }
      const now = new Date();
      let isFuture = false;
      // if timestamp from future
      if (timestamp > now) {
        isFuture = true;
      }

      if (timestamp > now && !allowFuture) {
        timestamp = now;
      }

      const distance = formatDistanceStrict(timestamp, now, {
        roundingMethod: "floor"
      });

      return distance && distance !== "Invalid Date"
        ? isFuture
          ? "in " + distance
          : distance + " ago"
        : false;
    }
  },
  apollo: {
    proposal: {
      prefetch: true,
      query: gql`
        query proposal($proposal: Int!) {
          proposal(proposal: $proposal) {
            id
            content {
              type
              value {
                title
                description
              }
            }
            submit_time
            proposer
            proposal_status
            voting_start_time
            voting_end_time
            deposit_end_time
            tally {
              yes
              abstain
              no
              no_with_veto
            }
            votes {
              voter
              option
            }
            deposits {
              depositor
              amount {
                denom
                amount
              }
            }
          }
        }
      `,
      variables() {
        return {
          proposal: Number(this.proposal_id)
        };
      }
    }
  },
  asyncData({ params, error }) {
    const proposal_id = params.id;

    return {
      proposal_id
    };
  },
  computed: {
    chartSeries() {
      return [
        parseFloat(this.proposal.tally.yes),
        parseFloat(this.proposal.tally.abstain),
        parseFloat(this.proposal.tally.no),
        parseFloat(this.proposal.tally.no_with_veto)
      ];
    },
    proposalFormatted() {
      if (!this.proposal) return null;

      return this.proposal;
    },
    total() {
      return (
        Number(this.proposal.tally.yes) +
        Number(this.proposal.tally.no) +
        Number(this.proposal.tally.no_with_veto) +
        Number(this.proposal.tally.abstain)
      );
    }
  },
  data() {
    return {
      votes_header: [
        { text: "Voter", value: "voter", sortable: false },
        { text: "Option", value: "option", sortable: false }
      ],
      deposits_header: [
        { text: "Depositor", value: "depositor", sortable: false },
        { text: "Amount", value: "amount", sortable: false }
      ],
      chartOptions: {
        labels: ["Yes", "No", "NoWithVeto", "Abstain"],
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
  }
};
</script>
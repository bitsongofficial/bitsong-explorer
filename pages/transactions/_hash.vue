<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" xl="8" class="mx-auto mt-4">
        <h1 class="display-1 font-weight-light grey--text text--darken-3 pb-3">
          <nuxt-link v-if="prevUrl" :to="prevUrl" class="pr-4" style="text-decoration:none">
            <v-icon>mdi-arrow-left</v-icon>
          </nuxt-link>Transaction
        </h1>
      </v-col>
      <v-col cols="12" xl="8" class="mx-auto">
        <div class="body-1 font-weight-light text-truncate">{{ tx.hash }}</div>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" xl="8" class="mx-auto mt-4">
        <v-row no-gutters class="mt-4">
          <v-col cols="12">
            <v-card elevation="1">
              <v-card-title>
                <h3 class="title">Transaction Detail</h3>
                <div class="flex-grow-1"></div>
                <v-chip color="green" dark v-if="tx.status">Success</v-chip>
                <v-chip color="red" dark v-else>Fail</v-chip>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="5">
                    <div class="subtitle-1 grey--text text--darken-4">
                      <nuxt-link :to="`/blocks/${tx.height}`">{{ tx.height }}</nuxt-link>
                    </div>
                    <div class="body-2 grey--text text--darken-1">Block Height</div>
                  </v-col>
                  <v-col cols="12" md="7">
                    <div class="subtitle-1 grey--text text--darken-4">{{ tx.time }}</div>
                    <div class="body-2 grey--text text--darken-1">TimeStamp</div>
                  </v-col>
                  <v-col cols="12" md="5">
                    <div
                      class="subtitle-1 grey--text text--darken-4"
                    >{{ tx.gas_used }}/{{ tx.gas_wanted }}</div>
                    <div class="body-2 grey--text text--darken-1">Gas (Used/Requested)</div>
                  </v-col>
                  <v-col cols="12" md="7">
                    <div class="subtitle-1 grey--text text--darken-4">[TO DO]</div>
                    <div class="body-2 grey--text text--darken-1">Memo</div>
                  </v-col>
                  <v-col cols="12" md="5">
                    <div
                      v-for="signature in tx.signatures"
                      class="subtitle-1 grey--text text--darken-4 text-truncate"
                    >
                      <nuxt-link :to="`/account/${signature.address}`">{{ signature.address }}</nuxt-link>
                    </div>
                    <div class="body-2 grey--text text--darken-1">Signature</div>
                  </v-col>
                  <v-col cols="12" md="7">
                    <div class="subtitle-1 grey--text text--darken-4 text-truncate">{{ tx.hash }}</div>
                    <div class="body-2 grey--text text--darken-1">Hash</div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row no-gutters class="mt-4">
          <v-col cols="12">
            <h2 class="display-1 font-weight-light grey--text text--darken-3 pt-3 pb-2">Messages</h2>
          </v-col>
        </v-row>

        <v-row no-gutters class="mt-4" v-for="msg in tx.msgs" :key="msg._id">
          <v-col cols="12">
            <v-card elevation="1">
              <v-card-title>
                <h3 class="title">{{ msg.type | convertMessageType }}</h3>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-row v-if="msg.type === 'cosmos-sdk/MsgUnjail'">
                  <v-col cols="12">
                    <div class="subtitle-1 grey--text text--darken-4 text-truncate">
                      <UIProposer :address="msg.value.address" />
                    </div>
                    <div class="body-2 grey--text text--darken-1">Validator</div>
                  </v-col>
                </v-row>

                <v-row v-if="msg.type === 'cosmos-sdk/MsgDelegate'">
                  <v-col cols="12" md="6">
                    <div class="subtitle-1 grey--text text--darken-4 text-truncate">
                      <nuxt-link
                        :to="`/account/${msg.value.delegator_address}`"
                      >{{ msg.value.delegator_address }}</nuxt-link>
                    </div>
                    <div class="body-2 grey--text text--darken-1">Delegator Address</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="subtitle-1 grey--text text--darken-4 text-truncate">
                      <UIProposer :valoper="msg.value.validator_address" />
                    </div>
                    <div class="body-2 grey--text text--darken-1">Validator</div>
                  </v-col>
                  <v-col cols="12">
                    <div class="subtitle-1 grey--text text--darken-4">
                      {{ msg.value.amount.amount | toBtsg }}
                      <span
                        class="caption"
                      >{{ msg.value.amount.denom | toMacroDenom }}</span>
                    </div>
                    <div class="body-2 grey--text text--darken-1">Amount</div>
                  </v-col>
                </v-row>

                <v-row v-if="msg.type === 'cosmos-sdk/MsgWithdrawDelegationReward'">
                  <v-col cols="12" md="6">
                    <div class="subtitle-1 grey--text text--darken-4 text-truncate">
                      <nuxt-link
                        :to="`/account/${msg.value.delegator_address}`"
                      >{{ msg.value.delegator_address }}</nuxt-link>
                    </div>
                    <div class="body-2 grey--text text--darken-1">Delegator Address</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="subtitle-1 grey--text text--darken-4 text-truncate">
                      <UIProposer :valoper="msg.value.validator_address" />
                    </div>
                    <div class="body-2 grey--text text--darken-1">Validator</div>
                  </v-col>
                </v-row>

                <v-row v-if="msg.type === 'cosmos-sdk/MsgWithdrawValidatorCommission'">
                  <v-col cols="12" md="6">
                    <div class="subtitle-1 grey--text text--darken-4 text-truncate">
                      <UIProposer :valoper="msg.value.validator_address" />
                    </div>
                    <div class="body-2 grey--text text--darken-1">Validator</div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.label {
  max-width: 180px;
}
</style>


<script>
import { toBtsg, toMacroDenom } from "@/filters";
import getTitle from "~/assets/get-title";
import gql from "graphql-tag";
import UIProposer from "@/components/UI/Proposer";

export default {
  head() {
    const title = getTitle("Transaction " + this.$route.params.hash);
    return {
      title: title,
      meta: [{ hid: "og-title", name: "og:title", content: title }]
    };
  },
  components: {
    UIProposer
  },
  filters: {
    toBtsg,
    toMacroDenom,
    convertMessageType: value => {
      return value
        .replace("cosmos-sdk/Msg", "")
        .replace(/([A-Z])/g, " $1")
        .trim();
    }
  },
  data() {
    return {
      prevUrl: null
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name === "account-address" || from.name === "transactions") {
        vm.prevUrl = from.fullPath;
      } else {
        vm.prevUrl = "/transactions";
      }
    });
  },
  asyncData({ params, error }) {
    const hash = params.hash;

    return {
      hash
    };
  },
  computed: {
    tx() {
      if (this.allTransactions) {
        return this.allTransactions.docs[0];
      }

      return {};
    }
  },
  apollo: {
    allTransactions: {
      prefetch: true,
      query: gql`
        query allTransactions(
          $pagination: PaginationInput!
          $filters: TransactionFiltersInput!
        ) {
          allTransactions(pagination: $pagination, filters: $filters) {
            pageInfo {
              total
              limit
              page
              pages
            }
            docs {
              hash
              height
              status
              gas_wanted
              gas_used
              time
              memo
              signatures {
                address
              }
              msgs {
                type
                value {
                  ... on MsgSend {
                    to_address
                    from_address
                    amounts: amount {
                      amount
                      denom
                    }
                  }
                  ... on MsgMultiSend {
                    inputs {
                      address
                      coins {
                        amount
                        denom
                      }
                    }
                    outputs {
                      address
                      coins {
                        amount
                        denom
                      }
                    }
                  }
                  ... on MsgVerifyInvariant {
                    sender
                    invariant_route
                    invariant_module_name
                  }
                  ... on MsgWithdrawDelegationReward {
                    delegator_address
                    validator_address
                  }
                  ... on MsgModifyWithdrawAddress {
                    withdraw_address
                    delegator_address
                  }
                  ... on MsgWithdrawValidatorCommission {
                    validator_address
                  }
                  ... on MsgDelegate {
                    delegator_address
                    validator_address
                    amount {
                      amount
                      denom
                    }
                  }
                  ... on MsgUnjail {
                    address
                  }
                  ... on MsgEditValidator {
                    address
                    Description {
                      moniker
                      identity
                      website
                      details
                    }
                    commission_rate
                    min_self_delegation
                  }
                  ... on MsgCreateValidator {
                    delegator_address
                    validator_address
                    pubkey
                    min_self_delegation
                    value {
                      amount
                      denom
                    }
                    description {
                      moniker
                      identity
                      website
                      details
                    }
                    commission {
                      rate
                      max_rate
                      max_change_rate
                    }
                  }
                  ... on MsgUndelegate {
                    delegator_address
                    validator_address
                    amount {
                      amount
                      denom
                    }
                  }
                  ... on MsgBeginRedelegate {
                    delegator_address
                    validator_src_address
                    validator_dst_address
                    amount {
                      amount
                      denom
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables() {
        return {
          pagination: {
            limit: 1,
            page: 1
          },
          filters: {
            hash: this.hash
          }
        };
      }
    }
  }
};
</script>

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
                <v-row v-if="msg.type === 'go-tichex/MsgCreateIssuer'">
                  <v-col cols="12" md="6">
                    <div class="subtitle-1 grey--text text--darken-4 text-truncate">
                      <nuxt-link
                        :to="`/account/${msg.value.issuer.address}`"
                      >{{ msg.value.issuer.address }}</nuxt-link>
                    </div>
                    <div class="body-2 grey--text text--darken-1">Issuer Address</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div
                      class="subtitle-1 grey--text text--darken-4"
                    >{{ msg.value.issuer.description.name }}</div>
                    <div class="body-2 grey--text text--darken-1">Name</div>
                  </v-col>
                  <v-col cols="12" md="6" v-if="msg.value.issuer.description.street">
                    <div
                      class="subtitle-1 grey--text text--darken-4"
                    >{{ msg.value.issuer.description.street }}</div>
                    <div class="body-2 grey--text text--darken-1">Street</div>
                  </v-col>
                  <v-col cols="12" md="6" v-if="msg.value.issuer.description.identity">
                    <div
                      class="subtitle-1 grey--text text--darken-4"
                    >{{ msg.value.issuer.description.identity }}</div>
                    <div class="body-2 grey--text text--darken-1">Identity</div>
                  </v-col>
                  <v-col cols="12" md="6" v-if="msg.value.issuer.description.website">
                    <div
                      class="subtitle-1 grey--text text--darken-4"
                    >{{ msg.value.issuer.description.website }}</div>
                    <div class="body-2 grey--text text--darken-1">Website</div>
                  </v-col>
                  <v-col cols="12" md="6" v-if="msg.value.issuer.description.security_contact">
                    <div
                      class="subtitle-1 grey--text text--darken-4"
                    >{{ msg.value.issuer.description.security_contact }}</div>
                    <div class="body-2 grey--text text--darken-1">Security Contact</div>
                  </v-col>
                  <v-col cols="12" md="6" v-if="msg.value.issuer.description.details">
                    <div
                      class="subtitle-1 grey--text text--darken-4"
                    >{{ msg.value.issuer.description.details }}</div>
                    <div class="body-2 grey--text text--darken-1">Details</div>
                  </v-col>
                </v-row>
                <v-row v-if="msg.type === 'go-tichex/MsgIssue'">
                  <v-col cols="12" md="6">
                    <div class="subtitle-1 grey--text text--darken-4 text-truncate">
                      <nuxt-link
                        :to="`/account/${msg.value.token.issuer_address}`"
                      >{{ msg.value.token.issuer_address }}</nuxt-link>
                    </div>
                    <div class="body-2 grey--text text--darken-1">Issuer Address</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="subtitle-1 grey--text text--darken-4">{{ msg.value.token.denom }}</div>
                    <div class="body-2 grey--text text--darken-1">Token Denom</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="subtitle-1 grey--text text--darken-4">{{ msg.value.token.name }}</div>
                    <div class="body-2 grey--text text--darken-1">Token Name</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="subtitle-1 grey--text text--darken-4">{{ msg.value.token.decimals }}</div>
                    <div class="body-2 grey--text text--darken-1">Decimals</div>
                  </v-col>
                  <v-col cols="12" md="6" v-if="msg.value.token.description">
                    <div
                      class="subtitle-1 grey--text text--darken-4"
                    >{{ msg.value.token.description }}</div>
                    <div class="body-2 grey--text text--darken-1">Description</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div
                      class="subtitle-1 grey--text text--darken-4"
                    >{{ msg.value.token.freezable }}</div>
                    <div class="body-2 grey--text text--darken-1">Freezable</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div
                      class="subtitle-1 grey--text text--darken-4"
                    >{{ msg.value.token.transfer_fee }}</div>
                    <div class="body-2 grey--text text--darken-1">Transfer Fee</div>
                  </v-col>
                </v-row>
                <v-row v-if="msg.type === 'go-tichex/MsgMint'">
                  <v-col cols="12" md="6">
                    <div class="subtitle-1 grey--text text--darken-4 text-truncate">
                      <nuxt-link
                        :to="`/account/${msg.value.issuer_address}`"
                      >{{ msg.value.issuer_address }}</nuxt-link>
                    </div>
                    <div class="body-2 grey--text text--darken-1">Issuer Address</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="subtitle-1 grey--text text--darken-4 text-truncate">
                      <nuxt-link
                        :to="`/account/${msg.value.account_address}`"
                      >{{ msg.value.account_address }}</nuxt-link>
                    </div>
                    <div class="body-2 grey--text text--darken-1">Account Address</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="subtitle-1 grey--text text--darken-4">
                      {{ msg.value.coin.amount }}
                      <span
                        class="caption"
                      >{{ msg.value.coin.denom | toMacroDenom }}</span>
                    </div>
                    <div class="body-2 grey--text text--darken-1">Amount</div>
                  </v-col>
                </v-row>
                <v-row v-if="msg.type === 'go-tichex/MsgSend'">
                  <v-col cols="12" md="6">
                    <div class="subtitle-1 grey--text text--darken-4 text-truncate">
                      <nuxt-link
                        :to="`/account/${msg.value.from_address}`"
                      >{{ msg.value.from_address }}</nuxt-link>
                    </div>
                    <div class="body-2 grey--text text--darken-1">From Address</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="subtitle-1 grey--text text--darken-4 text-truncate">
                      <nuxt-link :to="`/account/${msg.value.to_address}`">{{ msg.value.to_address }}</nuxt-link>
                    </div>
                    <div class="body-2 grey--text text--darken-1">To Address</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="subtitle-1 grey--text text--darken-4">
                      {{ msg.value.amounts[0].amount }}
                      <span
                        class="caption"
                      >{{ msg.value.amounts[0].denom | toMacroDenom }}</span>
                    </div>
                    <div class="body-2 grey--text text--darken-1">Amount</div>
                  </v-col>
                </v-row>
                <v-row v-if="msg.type === 'go-tichex/MsgBurn'">
                  <v-col cols="12" md="6">
                    <div class="subtitle-1 grey--text text--darken-4 text-truncate">
                      <nuxt-link
                        :to="`/account/${msg.value.issuer_address}`"
                      >{{ msg.value.issuer_address }}</nuxt-link>
                    </div>
                    <div class="body-2 grey--text text--darken-1">Issuer Address</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="subtitle-1 grey--text text--darken-4 text-truncate">
                      <nuxt-link
                        :to="`/account/${msg.value.account_address}`"
                      >{{ msg.value.account_address }}</nuxt-link>
                    </div>
                    <div class="body-2 grey--text text--darken-1">Account Address</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="subtitle-1 grey--text text--darken-4">
                      {{ msg.value.coin.amount }}
                      <span
                        class="caption"
                      >{{ msg.value.coin.denom | toMacroDenom }}</span>
                    </div>
                    <div class="body-2 grey--text text--darken-1">Amount</div>
                  </v-col>
                </v-row>
                <v-row v-if="msg.type === 'go-tichex/MsgFreeze'">
                  <v-col cols="12" md="6">
                    <div class="subtitle-1 grey--text text--darken-4 text-truncate">
                      <nuxt-link
                        :to="`/account/${msg.value.issuer_address}`"
                      >{{ msg.value.issuer_address }}</nuxt-link>
                    </div>
                    <div class="body-2 grey--text text--darken-1">Issuer Address</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="subtitle-1 grey--text text--darken-4 text-truncate">
                      <nuxt-link
                        :to="`/account/${msg.value.frozen_account_address}`"
                      >{{ msg.value.account_address }}</nuxt-link>
                    </div>
                    <div class="body-2 grey--text text--darken-1">Account Address</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div
                      class="subtitle-1 grey--text text--darken-4 text-truncate"
                    >{{ msg.value.denom }}</div>
                    <div class="body-2 grey--text text--darken-1">Token Denom</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div
                      class="subtitle-1 grey--text text--darken-4 text-truncate"
                    >{{ msg.value.reason }}</div>
                    <div class="body-2 grey--text text--darken-1">Reason</div>
                  </v-col>
                </v-row>
                <v-row v-if="msg.type === 'go-tichex/MsgUnfreeze'">
                  <v-col cols="12" md="6">
                    <div class="subtitle-1 grey--text text--darken-4 text-truncate">
                      <nuxt-link
                        :to="`/account/${msg.value.issuer_address}`"
                      >{{ msg.value.issuer_address }}</nuxt-link>
                    </div>
                    <div class="body-2 grey--text text--darken-1">Issuer Address</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="subtitle-1 grey--text text--darken-4 text-truncate">
                      <nuxt-link
                        :to="`/account/${msg.value.frozen_account_address}`"
                      >{{ msg.value.frozen_account_address }}</nuxt-link>
                    </div>
                    <div class="body-2 grey--text text--darken-1">Frozen Address</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div
                      class="subtitle-1 grey--text text--darken-4 text-truncate"
                    >{{ msg.value.denom }}</div>
                    <div class="body-2 grey--text text--darken-1">Token Denom</div>
                  </v-col>
                </v-row>
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
                  ... on MsgCreateIssuer {
                    issuer {
                      address
                      description {
                        name
                        street
                        identity
                        website
                        security_contact
                        details
                      }
                    }
                  }
                  ... on MsgUnfreeze {
                    issuer_address
                    frozen_account_address
                    denom
                  }
                  ... on MsgFreeze {
                    issuer_address
                    account_address
                    denom
                    reason
                  }
                  ... on MsgIssue {
                    token {
                      issuer_address
                      denom
                      name
                      decimals
                      description
                      freezable
                      transfer_fee
                    }
                  }
                  ... on MsgBurn {
                    issuer_address
                    account_address
                    coin {
                      denom
                      amount
                    }
                  }
                  ... on MsgMint {
                    issuer_address
                    account_address
                    coin {
                      denom
                      amount
                    }
                  }
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

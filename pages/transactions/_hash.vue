<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" xl="8" class="mx-auto mt-4">

        <v-row no-gutters>
          <v-col cols="12">
            <h2 class="title">Transaction <span class="ml-2 body-1">{{ tx.hash }}</span></h2>
          </v-col>
        </v-row>

        <v-row no-gutters class="mt-4">
          <v-col cols="12">
            <v-card elevation="1">
              <v-card-title>
                <v-icon large left>mdi-bank-transfer</v-icon>
                <h3 class="title">Transaction Detail</h3>
              </v-card-title>

              <v-list>
                <v-list-item>
                  <v-list-item-content class="body-2 label">Hash:</v-list-item-content>
                  <v-list-item-content class="body-1">{{ tx.hash }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content class="body-2 label">Status:</v-list-item-content>
                  <v-list-item-content class="body-1">{{ tx.status }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content class="body-2 label">Block Height:</v-list-item-content>
                  <v-list-item-content class="body-1">{{ tx.height }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content class="body-2 label">TimeStamp:</v-list-item-content>
                  <v-list-item-content class="body-1">{{ tx.time }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content class="body-2 label">Gas (Used/Requested):</v-list-item-content>
                  <v-list-item-content class="body-1">{{ tx.gas_used }}/{{ tx.gas_wanted }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content class="body-2 label">Memo:</v-list-item-content>
                  <v-list-item-content class="body-1">-</v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>

        <v-row no-gutters class="mt-4">
          <v-col cols="12">
            <h2 class="title">Messages</h2>
          </v-col>
        </v-row>


        <v-row no-gutters class="mt-4" v-for="msg in tx.msgs" :key="msg._id">
          <v-col cols="12">
            <v-card elevation="1">
              <v-card-title>
                <h3 class="title">{{ msg.type }}</h3>
              </v-card-title>

              <v-list dense v-if="msg.type == 'cosmos-sdk/MsgUnjail'">
                <v-list-item>
                  <v-list-item-content class="body-2 label">Address:</v-list-item-content>
                  <v-list-item-content class="body-1">{{ msg.value.address }}</v-list-item-content>
                </v-list-item>
              </v-list>

              <v-list dense v-if="msg.type == 'cosmos-sdk/MsgDelegate'">
                <v-list-item>
                  <v-list-item-content class="body-2 label">Delegator Address:</v-list-item-content>
                  <v-list-item-content class="body-1">{{ msg.value.delegator_address }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content class="body-2 label">Validator Address:</v-list-item-content>
                  <v-list-item-content class="body-1">{{ msg.value.validator_address }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content class="body-2 label">Amount:</v-list-item-content>
                  <v-list-item-content class="body-1">{{ msg.value.amount.amount | toBtsg }} {{ msg.value.amount.denom | toMacroDenom }}</v-list-item-content>
                </v-list-item>
              </v-list>

              <v-list dense v-if="msg.type == 'cosmos-sdk/MsgWithdrawDelegationReward'">
                <v-list-item>
                  <v-list-item-content class="body-2 label">Delegator Address:</v-list-item-content>
                  <v-list-item-content class="body-1">{{ msg.value.delegator_address }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content class="body-2 label">Validator Address:</v-list-item-content>
                  <v-list-item-content class="body-1">{{ msg.value.validator_address }}</v-list-item-content>
                </v-list-item>
              </v-list>

              <v-list dense v-if="msg.type == 'cosmos-sdk/MsgWithdrawValidatorCommission'">
                <v-list-item>
                  <v-list-item-content class="body-2 label">Validator Address:</v-list-item-content>
                  <v-list-item-content class="body-1">{{ msg.value.validator_address }}</v-list-item-content>
                </v-list-item>
              </v-list>

            </v-card>
          </v-col>
        </v-row>


      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.label {
  max-width: 180px
}
</style>


<script>
import { toBtsg, toMacroDenom } from "@/filters"
import { getTransaction } from "~/api";

export default {
  filters: {
    toBtsg,
    toMacroDenom
  },
  data () {
    return {
      tx: null
    }
  },
  asyncData({ params, error }) {
    return getTransaction(params.hash).then((tx) => {
      return {
        tx
      }
    })
    .catch((e) => {
      console.error(e)
    })
  }
}
</script>

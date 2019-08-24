<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" xl="10" class="mx-auto mt-4">
        <v-card class="overflow-hidden elevation-1">
          <ValidatorsToolbarIndex />
          <v-divider></v-divider>
          <v-data-table
            :headers="tableHeaders"
            :items="status === 'active' ? $store.getters[`validators/bonded`] : $store.getters[`validators/unbonded`]"
            :items-per-page="100"
            sort-by="delegator_shares"
            sort-desc="true"
            hide-default-footer
            class="elevation-1 mt-4"
          >
            <template v-slot:body="{ items }">
              <tr v-for="item in items" :key="item.name">
                <td>
                  <v-list-item-avatar>
                    <v-img
                      src="https://s3.amazonaws.com/keybase_processed_uploads/9893f68bf6861fc2153c5956eeb14c05_360_360.jpg"
                    ></v-img>
                  </v-list-item-avatar>
                  <nuxt-link
                    class="pl-4 body-1"
                    :to="`/validators/${item.operator_address}`"
                  >{{ item.description.moniker }}</nuxt-link>
                </td>
                <td>
                  <v-list-item-title
                    class="body-2"
                  >{{ toPower(item.delegator_shares) | prettyRound }}</v-list-item-title>
                  <v-list-item-subtitle
                    class="body-2"
                    style="color:rgba(0,0,0,0.54)"
                  >{{ calculatePower(item.delegator_shares) }}%</v-list-item-subtitle>
                </td>
                <td>{{ percentage(item.commission.commission_rates.rate) }}%</td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ValidatorsToolbarIndex from "@/components/validators/ToolbarIndex";
import config from "@/assets/config";
import axios from "axios";
import BigNumber from "bignumber.js";
import { prettyRound } from "~/assets/utils";

export default {
  components: {
    ValidatorsToolbarIndex
  },
  filters: {
    prettyRound
  },
  data() {
    return {
      tableHeaders: [
        {
          text: `Moniker`,
          align: `left`,
          sortable: true,
          value: `description.moniker`
        },
        {
          text: `Voting Power`,
          align: `left`,
          sortable: true,
          value: `delegator_shares`
        },
        {
          text: `Commission %`,
          align: `left`,
          sortable: true,
          value: `commission.commission_rates.rate`
        }
      ],
      status: "active"
    };
  },
  created() {
    this.$store.dispatch(`validators/getValidators`);
  },
  methods: {
    async getProfilePic(val) {
      try {
        const keybase = await axios
          .get(
            "https://keybase.io/_/api/1.0/user/lookup.json?fields=pictures&key_suffix=2474A8FCC4426BC5"
          )
          .then(res => res.data);
        return keybase.them[0].pictures.primary.url;
      } catch (error) {
        console.error(error);
      }

      //console.log(keybase.them[0].pictures.primary.url)

      //return keybase.them[0].pictures.primary.url
    },
    calculatePower(share) {
      const sharePower = new BigNumber(share);

      return new BigNumber(sharePower)
        .div(this.totalPower)
        .multipliedBy(100)
        .toFixed(2);
    },
    percentage(val) {
      return new BigNumber(val).multipliedBy(100).toFixed(2);
    },
    changeStatus(val) {
      this.status = val;
    },
    toPower(val) {
      return new BigNumber(val).div(10 ** config.decimals).toFixed(0);
    }
  },
  computed: {
    totalPower() {
      let validators = this.$store.getters[`validators/bonded`];
      if (validators.length === 0) return new BigNumber(0).toFixed(0);

      return validators.reduce((acc, val) => {
        return new BigNumber(acc)
          .plus(new BigNumber(val.delegator_shares))
          .toFixed(0);
      }, new BigNumber(0));
    }
  }
};
</script>

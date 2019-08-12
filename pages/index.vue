<template>
  <div>
    <v-layout
      row
      class="mt-4"
    >
      <v-flex xs4>
        <v-card tile elevation="1">
          <v-list-item two-line icon>
            <v-list-item-avatar>
              <v-icon>mdi-currency-usd</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>$0.12</v-list-item-title>
              <v-list-item-subtitle>BTSG Price</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title>$2,125.00</v-list-item-title>
              <v-list-item-subtitle>Market Cap</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item two-line>
            <v-list-item-avatar>
              <v-icon>mdi-cube-outline</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>468 254</v-list-item-title>
              <v-list-item-subtitle>Block Height</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title>20</v-list-item-title>
              <v-list-item-subtitle>Transactions</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </v-card>
      </v-flex>

      <v-flex xs4>
        <v-card tile elevation="1">
          <v-list-item two-line>
            <v-list-item-avatar>
              <v-icon>mdi-arrange-bring-forward</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>16 488 515</v-list-item-title>
              <v-list-item-subtitle>Not Bondend</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title>100 545 245</v-list-item-title>
              <v-list-item-subtitle>Bonded</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item two-line icon>
            <v-list-item-avatar>
              <v-icon>mdi-all-inclusive</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>116 254 154.20</v-list-item-title>
              <v-list-item-subtitle>Total Supply</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-flex>

      <v-flex xs4>
        <v-card tile elevation="1">
          <v-list-item two-line>
            <v-list-item-avatar>
              <v-icon>mdi-server-network</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>32</v-list-item-title>
              <v-list-item-subtitle>Active Validators</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title>16</v-list-item-title>
              <v-list-item-subtitle>Inactive Validators</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item two-line icon>
            <v-list-item-avatar>
              <v-icon>mdi-power-plug</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>2 256</v-list-item-title>
              <v-list-item-subtitle>Voting Power</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-flex>

    </v-layout>

    <v-layout row class="mt-4">
      <v-flex xs12>
        <v-card tile elevation="1">
          <v-card-title>
            <h3 class="title">Consensus State</h3>
          </v-card-title>
          <v-list>
            <v-list-item two-line>
              <v-list-item-content class="text-center">
                <v-list-item-title>465 245</v-list-item-title>
                <v-list-item-subtitle>Height</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content class="text-center">
                <v-list-item-title>0</v-list-item-title>
                <v-list-item-subtitle>Round</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content class="text-center">
                <v-list-item-title>3</v-list-item-title>
                <v-list-item-subtitle>Step</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content style="min-width:700px">
                <v-progress-linear value="15"></v-progress-linear>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row class="mt-4">
      <v-flex xs4>
        <v-card tile elevation="1">
          <v-card-title>
            <h3 class="title">Blocks</h3>
          </v-card-title>
          <v-list>
            <v-list-item two-line>
              <v-list-item-avatar>
                <v-icon>mdi-cube-send</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Block <nuxt-link to="/">4</nuxt-link> </v-list-item-title>
                <v-list-item-subtitle>Includes <nuxt-link to="/">4 txs</nuxt-link>, Fees 0 BTSG</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content class="text-right">
                <v-list-item-title>4s</v-list-item-title>
                <v-list-item-subtitle><nuxt-link to="/">3BF1…03A</nuxt-link></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item two-line>
              <v-list-item-avatar>
                <v-icon>mdi-cube-send</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Block <nuxt-link to="/">4</nuxt-link> </v-list-item-title>
                <v-list-item-subtitle>Includes <nuxt-link to="/">4 txs</nuxt-link>, Fees 0 BTSG</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content class="text-right">
                <v-list-item-title>4s</v-list-item-title>
                <v-list-item-subtitle><nuxt-link to="/">3BF1…03A</nuxt-link></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item two-line>
              <v-list-item-avatar>
                <v-icon>mdi-cube-send</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Block <nuxt-link to="/">4</nuxt-link> </v-list-item-title>
                <v-list-item-subtitle>Includes <nuxt-link to="/">4 txs</nuxt-link>, Fees 0 BTSG</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content class="text-right">
                <v-list-item-title>4s</v-list-item-title>
                <v-list-item-subtitle><nuxt-link to="/">3BF1…03A</nuxt-link></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item two-line>
              <v-list-item-avatar>
                <v-icon>mdi-cube-send</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Block <nuxt-link to="/">4</nuxt-link> </v-list-item-title>
                <v-list-item-subtitle>Includes <nuxt-link to="/">4 txs</nuxt-link>, Fees 0 BTSG</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content class="text-right">
                <v-list-item-title>4s</v-list-item-title>
                <v-list-item-subtitle><nuxt-link to="/">3BF1…03A</nuxt-link></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item two-line>
              <v-list-item-avatar>
                <v-icon>mdi-cube-send</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Block <nuxt-link to="/">4</nuxt-link> </v-list-item-title>
                <v-list-item-subtitle>Includes <nuxt-link to="/">4 txs</nuxt-link>, Fees 0 BTSG</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content class="text-right">
                <v-list-item-title>4s</v-list-item-title>
                <v-list-item-subtitle><nuxt-link to="/">3BF1…03A</nuxt-link></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item two-line>
              <v-list-item-avatar>
                <v-icon>mdi-cube-send</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Block <nuxt-link to="/">4</nuxt-link> </v-list-item-title>
                <v-list-item-subtitle>Includes <nuxt-link to="/">4 txs</nuxt-link>, Fees 0 BTSG</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content class="text-right">
                <v-list-item-title>4s</v-list-item-title>
                <v-list-item-subtitle><nuxt-link to="/">3BF1…03A</nuxt-link></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item two-line>
              <v-list-item-avatar>
                <v-icon>mdi-cube-send</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Block <nuxt-link to="/">4</nuxt-link> </v-list-item-title>
                <v-list-item-subtitle>Includes <nuxt-link to="/">4 txs</nuxt-link>, Fees 0 BTSG</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content class="text-right">
                <v-list-item-title>4s</v-list-item-title>
                <v-list-item-subtitle><nuxt-link to="/">3BF1…03A</nuxt-link></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item two-line>
              <v-list-item-avatar>
                <v-icon>mdi-cube-send</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Block <nuxt-link to="/">4</nuxt-link> </v-list-item-title>
                <v-list-item-subtitle>Includes <nuxt-link to="/">4 txs</nuxt-link>, Fees 0 BTSG</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content class="text-right">
                <v-list-item-title>4s</v-list-item-title>
                <v-list-item-subtitle><nuxt-link to="/">3BF1…03A</nuxt-link></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item two-line>
              <v-list-item-avatar>
                <v-icon>mdi-cube-send</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Block <nuxt-link to="/">4</nuxt-link> </v-list-item-title>
                <v-list-item-subtitle>Includes <nuxt-link to="/">4 txs</nuxt-link>, Fees 0 BTSG</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content class="text-right">
                <v-list-item-title>4s</v-list-item-title>
                <v-list-item-subtitle><nuxt-link to="/">3BF1…03A</nuxt-link></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item two-line>
              <v-list-item-avatar>
                <v-icon>mdi-cube-send</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Block <nuxt-link to="/">4</nuxt-link> </v-list-item-title>
                <v-list-item-subtitle>Includes <nuxt-link to="/">4 txs</nuxt-link>, Fees 0 BTSG</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content class="text-right">
                <v-list-item-title>4s</v-list-item-title>
                <v-list-item-subtitle><nuxt-link to="/">3BF1…03A</nuxt-link></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-flex>

      <v-flex xs8>
        <v-card tile elevation="1">
          <v-card-title>
            <h3 class="title">Transactions</h3>
          </v-card-title>
          <v-list>
            <v-list-item two-line>
              <v-list-item-avatar>
                <v-icon>mdi-cube-send</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Block <nuxt-link to="/">4</nuxt-link> </v-list-item-title>
                <v-list-item-subtitle>Includes <nuxt-link to="/">4 txs</nuxt-link>, Fees 0 BTSG</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content class="text-right">
                <v-list-item-title>4s</v-list-item-title>
                <v-list-item-subtitle><nuxt-link to="/">3BF1…03A</nuxt-link></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item two-line>
              <v-list-item-avatar>
                <v-icon>mdi-cube-send</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Block <nuxt-link to="/">4</nuxt-link> </v-list-item-title>
                <v-list-item-subtitle>Includes <nuxt-link to="/">4 txs</nuxt-link>, Fees 0 BTSG</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content class="text-right">
                <v-list-item-title>4s</v-list-item-title>
                <v-list-item-subtitle><nuxt-link to="/">3BF1…03A</nuxt-link></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item two-line>
              <v-list-item-avatar>
                <v-icon>mdi-cube-send</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Block <nuxt-link to="/">4</nuxt-link> </v-list-item-title>
                <v-list-item-subtitle>Includes <nuxt-link to="/">4 txs</nuxt-link>, Fees 0 BTSG</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content class="text-right">
                <v-list-item-title>4s</v-list-item-title>
                <v-list-item-subtitle><nuxt-link to="/">3BF1…03A</nuxt-link></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item two-line>
              <v-list-item-avatar>
                <v-icon>mdi-cube-send</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Block <nuxt-link to="/">4</nuxt-link> </v-list-item-title>
                <v-list-item-subtitle>Includes <nuxt-link to="/">4 txs</nuxt-link>, Fees 0 BTSG</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content class="text-right">
                <v-list-item-title>4s</v-list-item-title>
                <v-list-item-subtitle><nuxt-link to="/">3BF1…03A</nuxt-link></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item two-line>
              <v-list-item-avatar>
                <v-icon>mdi-cube-send</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Block <nuxt-link to="/">4</nuxt-link> </v-list-item-title>
                <v-list-item-subtitle>Includes <nuxt-link to="/">4 txs</nuxt-link>, Fees 0 BTSG</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content class="text-right">
                <v-list-item-title>4s</v-list-item-title>
                <v-list-item-subtitle><nuxt-link to="/">3BF1…03A</nuxt-link></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item two-line>
              <v-list-item-avatar>
                <v-icon>mdi-cube-send</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Block <nuxt-link to="/">4</nuxt-link> </v-list-item-title>
                <v-list-item-subtitle>Includes <nuxt-link to="/">4 txs</nuxt-link>, Fees 0 BTSG</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content class="text-right">
                <v-list-item-title>4s</v-list-item-title>
                <v-list-item-subtitle><nuxt-link to="/">3BF1…03A</nuxt-link></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item two-line>
              <v-list-item-avatar>
                <v-icon>mdi-cube-send</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Block <nuxt-link to="/">4</nuxt-link> </v-list-item-title>
                <v-list-item-subtitle>Includes <nuxt-link to="/">4 txs</nuxt-link>, Fees 0 BTSG</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content class="text-right">
                <v-list-item-title>4s</v-list-item-title>
                <v-list-item-subtitle><nuxt-link to="/">3BF1…03A</nuxt-link></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item two-line>
              <v-list-item-avatar>
                <v-icon>mdi-cube-send</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Block <nuxt-link to="/">4</nuxt-link> </v-list-item-title>
                <v-list-item-subtitle>Includes <nuxt-link to="/">4 txs</nuxt-link>, Fees 0 BTSG</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content class="text-right">
                <v-list-item-title>4s</v-list-item-title>
                <v-list-item-subtitle><nuxt-link to="/">3BF1…03A</nuxt-link></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item two-line>
              <v-list-item-avatar>
                <v-icon>mdi-cube-send</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Block <nuxt-link to="/">4</nuxt-link> </v-list-item-title>
                <v-list-item-subtitle>Includes <nuxt-link to="/">4 txs</nuxt-link>, Fees 0 BTSG</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content class="text-right">
                <v-list-item-title>4s</v-list-item-title>
                <v-list-item-subtitle><nuxt-link to="/">3BF1…03A</nuxt-link></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item two-line>
              <v-list-item-avatar>
                <v-icon>mdi-cube-send</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Block <nuxt-link to="/">4</nuxt-link> </v-list-item-title>
                <v-list-item-subtitle>Includes <nuxt-link to="/">4 txs</nuxt-link>, Fees 0 BTSG</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content class="text-right">
                <v-list-item-title>4s</v-list-item-title>
                <v-list-item-subtitle><nuxt-link to="/">3BF1…03A</nuxt-link></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {

}
</script>

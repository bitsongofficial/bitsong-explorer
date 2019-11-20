<template>
  <v-row>
    <v-col cols="12" class="pb-0">
      <v-alert
        v-model="sponsor"
        color="primary"
        border="left"
        elevation="2"
        colored-border
        class="mb-0"
      >
        <v-row align="center">
          <v-col class="grow">
            <strong>BitSong</strong> is on
            <strong>BambooRelay (DEX)</strong>.
            <span
              v-if="$vuetify.breakpoint.name !== 'xs' && $vuetify.breakpoint.name !== 'sm'"
            >Exchange your BTSG directly from your wallet in a simple, fast and secure way!</span>
          </v-col>
          <v-col class="shrink">
            <v-btn
              color="primary"
              link
              dark
              href="https://btsg.community/t/how-to-use-bamboorelay-exchange/139"
            >VIEW MORE</v-btn>
          </v-col>
        </v-row>
      </v-alert>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      sponsor: true
    };
  }
};
</script>
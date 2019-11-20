<template>
  <v-text-field
    placeholder="Address / Txhash / Block / Validator Address"
    solo
    hide-details
    prepend-inner-icon="mdi-magnify"
    class="hidden-sm-and-up"
    v-model="query"
    @focus="inputFocus"
    @blur="inputBlur"
    @keyup.enter="submit"
  ></v-text-field>
</template>

<script>
export default {
  data() {
    return {
      query: ""
    };
  },
  methods: {
    submit() {
      let query = this.query.trim();
      if (!query.length) {
        return;
      }
      if (query.slice(0, 14) === "bitsongvaloper") {
        this.$router.push("/validators/" + query);
      } else if (query.slice(0, 7) === "bitsong") {
        this.$router.push("/account/" + query);
      } else if (/^\d+$/.test(query)) {
        this.$router.push("/blocks/" + query);
      } else if (query.length === 64) {
        this.$router.push("/transactions/" + query);
      }
      this.query = "";
    },
    inputFocus() {
      this.$emit("inputFocus");
    },
    inputBlur() {
      this.$emit("inputBlur");
    }
  }
};
</script>

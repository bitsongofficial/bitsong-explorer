<template id="searchbar">
  <v-text-field
    flat
    solo-inverted
    hide-details
    prepend-inner-icon="mdi-magnify"
    placeholder="Address / Txhash / Block / Validator Address"
    class="hidden-sm-and-down"
    v-model="query"
    @focus="inputFocus"
    @blur="inputBlur"
    @keyup.enter="submit"
  ></v-text-field>
</template>

<style>
.v-input--is-focused {
  transform: scale(1.01);
}

.v-input--is-focused .v-icon.mdi-magnify {
  color: #2a2a2a !important;
}

.v-input--is-focused
  > .v-input__control
  > .v-input__slot
  > .v-text-field__slot
  > input {
  caret-color: #868686;
}

.v-input--is-focused
  > .v-input__control
  > .v-input__slot
  > .v-text-field__slot
  > input::placeholder {
  color: #868686;
}
</style>

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

<template>
  <span style="word-break:break-all">
    <nuxt-link :to="account.link">{{ account.name }}</nuxt-link>
  </span>
</template>

<script>
export default {
  props: {
    address: {
      type: String,
      default: ""
    },
    valoper: {
      type: String,
      default: ""
    },
    deladdr: {
      type: String,
      default: ""
    }
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.name === "xs";
    },
    validators() {
      return this.$store.getters[`validators/validators`];
    },
    link() {
      return `/validators/${node_operator_address}`;
    },
    account() {
      let account = {
        name: "",
        link: "/"
      };

      if (this.address) {
        account.name = this.address;
      }
      if (this.valoper) {
        account.name = this.valoper;
        account.link = `/validators/${this.valoper}`;
      }
      if (this.deladdr) {
        account.name = this.deladdr;
        account.link = `/account/${this.deladdr}`;
      }
      if (!this.validators) return account;

      let validator;

      if (this.address) {
        validator = this.validators.find(v => v.address === this.address);
      } else if (this.valoper) {
        validator = this.validators.find(
          v => v.operator_address === this.valoper
        );
      } else {
        validator = this.validators.find(
          v => v.delegator_address === this.deladdr
        );
      }

      if (!validator) return account;

      account.name = validator.description.moniker;
      account.link = `/validators/${validator.operator_address}`;

      return account;
    }
  }
};
</script>

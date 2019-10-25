<template>
  <div>
    <v-avatar :size="size" v-if="!profile_pic" v-html="avatar"></v-avatar>
    <v-avatar :size="size" v-else>
      <img :src="profile_pic" />
    </v-avatar>
  </div>
</template>

<script>
import jdenticon from "jdenticon";

export default {
  props: {
    validator: {
      type: Object,
      required: true
    },
    size: {
      type: String,
      deafult: "36px"
    }
  },
  data() {
    return {
      profile_pic: null
    };
  },
  created() {
    if (this.validator.description.identity) {
      this.getValidatorProfileUrl(this.validator.description.identity);
    }
  },
  computed: {
    avatar() {
      return jdenticon.toSvg(
        this.validator.address,
        parseInt(this.size.replace("px", ""))
      );
    }
  },
  methods: {
    getValidatorProfileUrl(identity) {
      if (identity.length == 16) {
        fetch(
          `https://keybase.io/_/api/1.0/user/lookup.json?key_suffix=${identity}&fields=pictures`
        )
          .then(res => res.json())
          .then(response => {
            let them = response.them;

            if (
              them &&
              them.length &&
              them[0].pictures &&
              them[0].pictures.primary &&
              them[0].pictures.primary.url
            ) {
              this.profile_pic = them[0].pictures.primary.url;
            }
          });
      }
    }
  }
};
</script>

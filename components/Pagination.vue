<template>
  <div v-if="paginationInfo.page && paginationInfo.pages > 1">
    <v-btn icon exact :to="getPageHref(1)" v-if="hasPrev">
      <v-icon>mdi-chevron-double-left</v-icon>
    </v-btn>

    <v-btn icon exact :to="getPageHref(paginationInfo.page - 1)" v-if="hasPrev">
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>

    <v-btn icon exact :to="getPageHref(paginationInfo.page + 1)" v-if="hasNext">
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>

    <v-btn icon exact :to="getPageHref(paginationInfo.pages)" v-if="hasNext">
      <v-icon>mdi-chevron-double-right</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    basePath: {
      type: String,
      default() {
        return this.$route.path;
      }
    },
    paginationInfo: {
      type: Object,
      required: true,
      default: () => ({
        page: null,
        pages: null
      })
    }
  },
  computed: {
    hasPrev() {
      return this.paginationInfo.page > 1;
    },
    hasNext() {
      return this.paginationInfo.page < this.paginationInfo.pages;
    }
  },
  methods: {
    getPageHref(page) {
      let location = {
        path: this.basePath,
        query: Object.assign({}, this.$route.query)
      };
      if (page && page !== 1) {
        location.query.page = page;
      } else {
        delete location.query.page;
      }
      return location;
    }
  }
};
</script>

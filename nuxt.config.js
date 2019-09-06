import colors from "vuetify/es5/util/colors";
import {
  BASE_TITLE,
  BASE_DESCRIPTION
} from "./assets/variables";

export default {
  mode: "spa",
  /*
   ** Headers of the page
   */
  head: {
    title: BASE_TITLE.replace(" — ", ""),
    meta: [{
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: BASE_DESCRIPTION
      },
      {
        hid: "og-title",
        name: "og:title",
        content: BASE_TITLE.replace(" — ", "")
      },
      {
        hid: "og-description",
        name: "og:description",
        content: BASE_DESCRIPTION
      },
      {
        hid: "og-image",
        name: "og:image",
        content: ""
      }
    ],
    link: [{
      rel: "icon",
      href: "/favicon.ico"
    }],
    script: [{
        src: "https://cdn.jsdelivr.net/npm/apexcharts"
      },
      {
        src: "https://cdn.jsdelivr.net/npm/vue-apexcharts"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: "#fff"
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{
      src: "@/plugins/apexcharts",
      ssr: false
    },
    {
      src: "~/plugins/seo-gtag.js",
      ssr: false
    }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  devModules: ["@nuxtjs/vuetify"],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/pwa", "@nuxtjs/apollo"],

  manifest: {
    name: "Commercio Explorer",
    short_name: "Commercio Explorer",
    theme_color: "#38ba8c",
    background_color: "#fafafa",
    display: "fullscreen",
    Scope: "/",
    start_url: "/",
    splash_pages: null
  },

  apollo: {
    includeNodeModules: true,
    defaultOptions: {
      // See 'apollo' definition
      // For example: default query options
      $query: {
        loadingKey: "loading"
        // fetchPolicy: 'cache-and-network',
      }
    },
    errorHandler: "~/plugins/apollo-error-handler.js",
    clientConfigs: {
      default: "@/apollo/config.js"
    }
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: colors.teal.lighten1,
        }
      }
    },
    icons: {
      iconfont: "mdiSvg" // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4'
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};

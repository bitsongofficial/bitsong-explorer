import colors from "vuetify/es5/util/colors";
import { BASE_TITLE, BASE_DESCRIPTION } from "./assets/variables";

require("dotenv").config();

export default {
  mode: "spa",
  /*
   ** Headers of the page
   */
  head: {
    title: BASE_TITLE.replace(" — ", ""),
    meta: [
      {
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
        content: "/social-share.png"
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/png",
        size: "32x32",
        href: "/favicon/favicon-32x32.png"
      },
      {
        rel: "icon",
        type: "image/png",
        size: "96x96",
        href: "/favicon/favicon-96x96.png"
      },
      {
        rel: "icon",
        type: "image/png",
        size: "16x16",
        href: "/favicon/favicon-16x16.png"
      },
      {
        rel: "apple-touch-icon",
        size: "57x57",
        href: "/favicon/apple-icon-57x57.png"
      },
      {
        rel: "apple-touch-icon",
        size: "60x60",
        href: "/favicon/apple-icon-60x60.png"
      },
      {
        rel: "apple-touch-icon",
        size: "72x72",
        href: "/favicon/apple-icon-72x72.png"
      },
      {
        rel: "apple-touch-icon",
        size: "76x76",
        href: "/favicon/apple-icon-76x76.png"
      },
      {
        rel: "apple-touch-icon",
        size: "114x114",
        href: "/favicon/apple-icon-114x114.png"
      },
      {
        rel: "apple-touch-icon",
        size: "120x120",
        href: "/favicon/apple-icon-120x120.png"
      },
      {
        rel: "apple-touch-icon",
        size: "144x144",
        href: "/favicon/apple-icon-144x144.png"
      },
      {
        rel: "apple-touch-icon",
        size: "152x152",
        href: "/favicon/apple-icon-152x152.png"
      },
      {
        rel: "apple-touch-icon",
        size: "180x180",
        href: "/favicon/apple-icon-180x180.png"
      }
    ],
    script: [
      {
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
  plugins: [
    {
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
  modules: ["@nuxtjs/pwa", "@nuxtjs/apollo", "@nuxtjs/dotenv"],

  manifest: {
    name: "BitSong Explorer",
    short_name: "BTSG Explorer",
    theme_color: "#d50000",
    background_color: "#fafafa",
    display: "standalone",
    Scope: "/",
    start_url: "/",
    icons: [
      {
        src: "/favicon/android-icon-36x36.png",
        sizes: "36x36",
        type: "image/png",
        density: "0.75"
      },
      {
        src: "/favicon/android-icon-48x48.png",
        sizes: "48x48",
        type: "image/png",
        density: "1.0"
      },
      {
        src: "/favicon/android-icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
        density: "1.5"
      },
      {
        src: "/favicon/android-icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
        density: "2.0"
      },
      {
        src: "/favicon/android-icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
        density: "3.0"
      },
      {
        src: "/favicon/android-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        density: "4.0"
      }
    ],
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
          primary: colors.red.accent4
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

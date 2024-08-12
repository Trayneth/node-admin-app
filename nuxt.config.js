import server from './config/server';
import head from './config/head';
import loading from './config/loading';
import i18n from './config/i18n';
import toast from './config/toast';
import auth from './config/auth';
import proxy from './config/proxy';
import axios from './config/axios';
import build from './config/build';

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

export default {
  /* SPA OR SSR */
  ssr: false,

  // /* TARGET */
  target: 'server',

  /* GLOBAL PAGE HEADERS */
  head,

  /* GLOBAL CSS */
  css: ['@/assets/sass/main.scss'],

  /* PLUGINS */
  plugins: ['@/plugins/api.js', '@/plugins/global.js', '@/plugins/axios.js'],

  /* IMPORT COMPONENT */
  components: {
    dirs: ['~/components/inputs'],
  },

  /* BUILD MODOULES */
  buildModules: ['@nuxtjs/vuetify'],

  /* BUILD */
  build,

  /* MODOULES */
  modules: [
    '@nuxtjs/moment',
    '@nuxtjs/axios',
    ['@nuxtjs/dotenv', { filename: `.env.${process.env.NODE_ENV}` }],
    '@nuxtjs/auth-next',
    'cookie-universal-nuxt',
    '@nuxtjs/toast',
    'nuxt-route-meta',
    '@nuxtjs/i18n',
  ],

  moment: {
    /* module options */
  },
  /* AXIOS */
  axios: axios(process.env),

  /* PROXY */
  proxy: proxy(process.env),

  /* AUTH */
  auth: auth(process.env),

  /* MESSAGE */
  toast,

  /* LANGUAGE */
  i18n,

  /* PUBLIC RUNTIME */
  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL,
    },
  },

  /* PRIVATE RUNTIME */
  privateRuntimeConfig: {
    axios: {
      apiSecret: process.env.API_SECRET,
    },
  },

  /* UI FRAMEWORK */
  vuetify: {
    optionsPath: '@/config/vuetify.js',
  },
  /* LOADING */
  loading,

  /* SERVER   */
  server: server(process.env),

  /* ENV */
  env: {
    baseUrl: process.env.API_SECRET,
  },
};

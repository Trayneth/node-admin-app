export default {
  defaultLocale: 'en',
  strategy: 'prefix_and_default',
  langDir: '@/languages/',
  lazy: true,
  locales: [
    {
      code: 'en',
      iso: 'en-gb',
      file: 'en.js',
    },
    {
      code: 'kh',
      iso: 'km',
      file: 'kh.js',
    },
  ],
  // detectBrowserLanguage: {
  //   useCookie: true,
  //   cookieKey: 'i18n_redirected',
  //   redirectOn: 'root', // recommended
  // },
  vueI18n: {
    fallbackLocale: 'en',
  },
  vueI18nLoader: true,
}

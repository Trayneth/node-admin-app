export default {
  postcss: null,

  babel: {
    compact: true,
  },

  extractCSS: true,

  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          // test: /\.scss$/,
          test: /\.(css|js|vue)$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
}

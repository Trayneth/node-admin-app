export default (context) => {
  return {
    redirect: {
      login: '/login',
      logout: false,
      callback: '/login',
      home: false,
    },
    localStorage: false,
    // resetOnError: true,
    strategies: {
      local: false,
      cookie: {
        // scheme: 'refresh',

        token: {
          property: 'data.access_token',
          required: true,
          global: true, // Whether to automatically include the authentication token in all axios requests.
        },

        // refreshToken: {
        //   property: 'data.refresh_token',
        //   required: true,
        //   data: 'refreshToken',
        //   tokenRequired: true,
        // },

        user: {
          property: false,
          autoFetch: false,
        },

        endpoints: {
          login: {
            url: context.API_SECRET_PREFIX + '/login',
            method: 'post',
          },
          logout: {
            url: context.API_SECRET_PREFIX + '/logout',
            method: 'post',
          },
          user: {
            url: context.API_SECRET_PREFIX + '/users',
            method: 'get',
          },
          refresh: {
            url: context.API_SECRET_PREFIX + '/auth/refresh-token',
            method: 'post',
          },
        },
      },
    },
  };
};

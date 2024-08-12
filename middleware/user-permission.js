export default ({ app, error, route }) => {
  let user = app.$auth.user;
  const supperAdmin = user.roles.find((item) => item.name == 'Super Admin');
  if (app.$auth.loggedIn && !supperAdmin) {
    var found = [];

    if (user.permissions) {
      found = user.permissions.filter(function (item) {
        return item.permission_slug === route.meta[0]['permission'];
      });
    }

    if (found.length <= 0) {
      error({ statusCode: 403, message: 'No Permission.' });
    }
  }
};

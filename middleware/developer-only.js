export default ({ app, error }) => {
  let user = app.$auth.user;
  const developer = user.roles.find((item) => item.name == 'Developer');

  if (!developer) {
    error({ statusCode: 403, message: 'No Permission.' });
  }
};

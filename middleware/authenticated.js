export default ({ app, redirect, i18n }) => {
  const user = app.$cookies.get('auth._token.cookie') && app.$auth.user.user;
  if (user) {
    redirect(`/${i18n.locale}`);
  }
};

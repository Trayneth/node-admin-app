import Translation from '../api/translation';
import Settings from '@/api/setting';
import Role from '@/api/role';
import User from '@/api/user';
import RolePermission from '@/api/role-permission';
import Banner from "~/api/banner";
import Languages from "~/api/languages";
import Seo from "~/api/seo";


export default (context, inject) => {
  // Initialize API factories
  const factories = {
    settings: Settings(context.$axios, context.env),
    seos: Seo(context.$axios, context.env),
    role: Role(context.$axios, context.env),
    user: User(context.$axios, context.env),
    translation: Translation(context.$axios, context.env),
    rolePermission: RolePermission(context.$axios, context.env),
    banner: Banner(context.$axios, context.env),
    languages: Languages(context.$axios, context.env),
  };
  // Inject $apis
  inject('api', factories);
};

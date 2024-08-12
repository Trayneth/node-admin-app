export default {
  data() {
    return {
      items: [
        //Dashboard
        {
          icon: 'mdi-home-outline',
          title: 'sidebar_home',
          to: '',
          group: 'home',
          childs: [
            {
              title: 'sidebar_slider',
              to: '/home/banner',
              permission: 'banner:read',
            },
            {
              title: 'sidebar_home_content',
              to: '/home/home-content',
              permission: 'homecontent:read',
            },
          ],
        },
        
        //Security
        {
          icon: 'mdi-account-key',
          title: 'sidebar_security',
          to: '',
          group: 'security',
          childs: [
            {
              title: 'sidebar_role',
              to: '/security/role',
              permission: 'role:read',
            },
            {
              title: 'sidebar_user',
              to: '/security/user',
              permission: 'user:read',
            },
            {
              title: 'sidebar_role_permission',
              to: '/security/role-permission',
              permission: 'role_permission:read',
            },
          ],
        },

        //Configuration
        {
          icon: 'mdi-tools',
          title: 'sidebar_configuration',
          to: '',
          group: 'configuration',
          childs: [
            {
              title: 'sidebar_setting',
              to: '/configuration/setting',
              permission: 'general_setting:read',
            },
            {
              title: 'sidebar_language',
              to: '/configuration/languages/',
              permission: 'language:read',
            },
            {
              title: 'sidebar_translation',
              to: '/configuration/translation/',
              permission: 'translation:read',
            },
          ],
        },
      ],
    };
  },

  methods: {
    countChild(data) {
      let item = false;
      if (this.$auth.loggedIn) {
        if (data.length <= 0) return false;
        data.forEach((value, index) => {
          if (this.permission(value.permission)) {
            item = true;
          }
        });
      }
      return item;
    },
  },
};

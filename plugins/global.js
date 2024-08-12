import Vue from 'vue';
import validations from '@/utils/validations';

const global = {
  data() {
    return {
      input_option: {
        outlined: true,
        dense: true,
        hideDetails: 'auto',
        clearable: true,
        clearIcon: 'mdi-close-circle-outline',
      },
      input_option_not_clear: {
        outlined: true,
        dense: true,
        hideDetails: 'auto',
        clearable: false,
      },
      aditi_input_option:{
        outlined: true,
        dense: true,
        hideDetails: 'auto',
      },
      table_item_per_page: [15, 50, 100, 200],
      ...validations,
      copy_right: `&copy; ${new Date().getFullYear()} — ADITI All rights reserved.`,
      status_options: [
        { value: 1, text: 'Active' },
        { value: 2, text: 'Inactive' },
      ],
    };
  },

  computed: {
    isDataLoading() {
      return this.$store.state.loading;
    },
  },

  methods: {
    // call data table
    getDataFromApi(url, search, filter) {
      this.getDataTableData(url, search, filter).then((data) => {
        this.table_options.table_data = data.items;
        this.table_options.total_items = data.total;
      });
    },

    exportExcel(url, datafilter, search) {
      // Create query parameters from datafilter object
      const param = datafilter
        ? Object.keys(datafilter)
            .map((key) => `${key}=${datafilter[key] ?? ''}`)
            .join('&')
        : '';

      // Send axios request
      this.$axios
        .get(
          `${process.env.API_SECRET_PREFIX}/${url}/get-export?${param}&search=${
            search || ''
          }`,
          {
            responseType: 'blob',
          }
        )
        .then((response) => {
          // Create download link and trigger click event to download file
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(new Blob([response.data]));
          link.setAttribute('download', `${url}.xlsx`);
          document.body.appendChild(link);
          link.click();
        })
        .catch(() => {});
    },

    // data table
    getDataTableData(url, search, filter) {
      return new Promise((resolve, reject) => {
        const { sortBy, sortDesc, page, itemsPerPage } = this.options;

        let param = '';

        if (filter) {
          param = Object.keys(filter)
            .map(function (key) {
              let val = filter[key] != null ? filter[key] : '';
              return key + '=' + val;
            })
            .join('&');
        }

        const axiosSource = this.$axios.CancelToken.source();
        this.request = { cancel: axiosSource.cancel, msg: 'Loading...' };

        let items = [];
        let total = 0;

        this.$axios
          .$get(
            `${process.env.API_SECRET_PREFIX}/${url}?page=${search ? 1 : page}&per_page=${itemsPerPage}&search=${
              search ? search : ''
            }${param ? '&' + param : ''}`,
            {
              cancelToken: axiosSource.token,
            }
          )
          .then((response) => {
            if (response) {
              this.$router.push({
                query: {
                  page: page,
                  length: itemsPerPage == -1 ? response.meta.total : itemsPerPage,
                  filter: filter ? JSON.stringify(filter) : '',
                },
              });

              items = response.data;
              total = response.meta.total;

              if (sortBy.length === 1 && sortDesc.length === 1) {
                items = items.sort((a, b) => {
                  let sortA = a[sortBy[0]];
                  let sortB = b[sortBy[0]];

                  if (sortDesc[0]) {
                    if (sortA < sortB) return 1;
                    if (sortA > sortB) return -1;
                    return 0;
                  } else {
                    if (sortA < sortB) return -1;
                    if (sortA > sortB) return 1;
                    return 0;
                  }
                });
              }

              resolve({ items, total });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },

    permission(name) {
      var found = [];

      if (this.$auth.loggedIn) {
        // if (this.$auth.user.permissions) {
        //   found = this.$auth.user.permissions.filter(function (item) {
        //     return item.permission_slug === name;
        //   });
        // }
      }

      // if (name == 'for_developer') {
      //   if (this.isDeveloper()) {
      //     return true;
      //   }
      // } else {
      //   if (this.isSuperAdmin() || this.isDeveloper()) {
      //     return true;
      //   }
      // }

      return found.length > 0 ? true : false;
    },

    languages() {
      let languages = [
        {
          local: null,
          name: null,
        },
      ];

      let arr_languages = this.$store.state.setup_system.languages;

      if (arr_languages.length > 0) {
        languages = arr_languages;
      }

      return languages;
    },

    generalInfo(name) {
      let general_info = [
        {
          app_name: null,
          app_logo: null,
        },
      ];

      general_info = this.$store.state.setup_system.general_info[name];

      return general_info;
    },

    translate(data) {
      // ? JSON.parse(data) : null
      let arr = data;
      let dataAfterTranslated = null;
      if (arr) {
        dataAfterTranslated = arr[this.$i18n.locale];
      }
      return dataAfterTranslated;
    },

    hasErrorFor(field) {
      return !!this.error_messages[field];
    },

    handleError(field) {
      if (this.hasErrorFor(field)) return this.error_messages[field][0];
    },

    encode(data) {
      return Buffer.from(JSON.stringify(data)).toString('base64');
    },

    decode(data) {
      return Buffer.from(JSON.stringify(data), 'base64').toString();
    },

    goBack() {
      this.$router.back();
    },

    isSuperAdmin() {
      let user = this.$auth.user;
      if (!user) {
        return false;
      }

      const supperAdmin = user.roles.find((item) => item.name == 'Super Admin');

      return supperAdmin ? true : false;
    },

    isDeveloper() {
      let user = this.$auth.user;
      if (!user) {
        return false;
      }

      const developer = user.roles.find((item) => item.name == 'Developer');

      return developer ? true : false;
    },

    cleanObject(obj) {
      for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
          delete obj[propName];
        }
      }
      return JSON.stringify(obj);
    },

    objectCheckValue(obj) {
      let data = Object.keys(obj).filter(function (key) {
        return obj[key].value;
      });

      return data.length > 0 ? true : false;
    },

    dateFormat(data) {
      let date = '';
      if (data) {
        date = this.$moment(data).format('DD-MMMM-YYYY');
      }
      return date;
    },
  },
};

Vue.mixin(global);

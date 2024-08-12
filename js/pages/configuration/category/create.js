export default {
    meta: {
        permission: 'category:write',
    },

    middleware: ['auth', 'user-permission'],

    head() {
        return {
            titleTemplate: '%s | Create Category',
        };
    },

    data() {
        return {
            error_messages: [],
            valid: true,
            title: {},
            description: {},
            image_cate:null,
            image_cate_src:null,
            parent:null,

            language_options: [],
            select_language: {},
            menu: false,
            status: true
        }
    },
    computed:{
        formCategory() {
            return {
                parent:this.parent,
                title: this.title,
                description: this.description,
                image_cate:this.image_cate,
                status: this.status,
            };
        },

        statusLabel() {
            return this.status ? 'Active' : 'Inactive';
        }
    },

    methods: {
        async getLanguage() {
            const res = await this.$api.category.getLocale();
            this.language_options = res.data.all;
        },
        async submit() {
            if (this.$refs.form.validate()) {
                const formData = new FormData();
                formData.append('parent_id',this.formCategory.parent);
                formData.append('title',JSON.stringify(this.formCategory.title));
                formData.append('description',JSON.stringify(this.formCategory.description));
                formData.append('status',this.formCategory.status ? 1 : 2);
                formData.append('image',this.formCategory.image_cate);

                const res = await this.$api.category.create(formData);
                if (!res.success) {
                    this.$toast.error(res.message);
                    this.error_messages = res.message_details ? res.message_details : [];
                } else {
                    this.$toast.success(res.message);
                    this.error_messages = res.message_details ? res.message_details : [];
                    this.resetForm();
                }
            }
        },

        resetForm() {
            this.title = {};
            this.description = {};
            this.image_cate_src=null,
            this.image_cate=null,
            this.parent=null,
            this.status = 1;
            this.$refs.form.resetValidation();
        },
        getDynamicLabel(field) {
            return field + ' ' + this.select_language.language;
        },
        itemText(field) {
            return field +'.'+ this.select_language.title;
        },
    },

    beforeCreate() {
        this.$store.commit('setPageTitle', 'Create Category');
    },
    created() {
        this.getLanguage();
    },
};

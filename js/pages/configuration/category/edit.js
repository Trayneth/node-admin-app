import ConfirmDelete from '@/components/alerts/ConfirmDelete';

export default {
    meta: {
        permission: 'category:write',
    },
    components: { ConfirmDelete, },

    middleware: ['auth', 'user-permission'],

    head() {
        return {
            titleTemplate: '%s | Edit Category',
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
            status: true,

            language_options: [],
            select_language: {},
            
        };
    },

    computed: {
        id() {
            return this.$route.params.id;
        },
        formCategory() {
            return {
                title: this.title,
                description: this.description,
                parent: this.parent,
                image_cate: this.image_cate,
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

                const res = await this.$api.category.update(formData, this.id);
                if (!res.success) {
                    this.$toast.error(res.message);
                    this.error_messages = res.message_details ? res.message_details : [];
                } else {
                    this.edit();
                    this.$toast.success(res.message);
                    this.error_messages = [];
                    this.$refs.form.resetValidation();
                }
            }
        },
        async edit() {
            const res = await this.$api.category.show(this.id);
            this.mapData(res);
        },
        mapData(data) {
            this.title = data.title;
            this.description = data.description;
            this.parent = data.parent_id;
            this.image_cate_arc = data.image;
            this.status = data.status === 1 ? true : false;
            console.log("test",data,this.image_cate_arc);

        },
        getDynamicLabel(field) {
            return field + ' ' + this.select_language.language;
        },
        itemText(field) {
            return field +'.'+ this.select_language.title;
        },
    },

    beforeCreate() {
        this.$store.commit('setPageTitle', 'Edit Category');
    },

    created() {
        this.edit();
        this.getLanguage();
    },
    watch: {
        statusLabel(newValue) {
            this.status = newValue === 'Active';
        }
    }
};

import TableSkeleton from '@/components/loading/TableSkeleton';
import ConfirmDelete from '@/components/alerts/ConfirmDelete';
import BlogFilter from '@/components/filters/BlogFilter';
import Breadcrumb from "~/components/Breadcrumb";
export default {
    meta: {
        permission: 'Projects:read',
    },
    middleware: ['auth', 'user-permission'],
    head() {
        return {
            titleTemplate: '%s | Projects ',
        };
    },
    components: { Breadcrumb, TableSkeleton, ConfirmDelete, BlogFilter },

    data() {
        return {
            table_options: {
                headers: [
                    { text: 'Thumbnail', value: 'thumbnail', sortable: true },
                    { text: 'Title', value: 'title', sortable: true },
                    { text: 'Project category', value: 'project_category', sortable: true },
                    { text: 'Description', value: 'description', sortable: true },
                    { text: 'Service', value: 'service', sortable: true },
                    { text: 'client', value: 'client', sortable: true },
                    { text: 'date', value: 'date', sortable: true },
                    { text: 'Status', value: 'status', sortable: false },
                    { text: 'Action', value: 'action', sortable: false },
                ],
                url: 'project', 
                page: 1,
                length: 15,
                page_count: 0,
                table_data: [],
                total_items: 0,
            },
            options: {},
            search: '',
            show_flter: false,
        };
    },
    computed: {
        old_filter() {
            return this.$route.query.filter ? JSON.parse(this.$route.query.filter) : null;
        },
        searchInput() {
            return this.search;
        },
    },
    watch: {
        options: {
            handler() {
                this.getDataFromApi(this.table_options.url, this.old_filter);
            },
            deep: true,
        },
    },
    methods: {
        async deleteData(id) {
            if (await this.$refs.confirm.open()) {
                const res = await this.$api.project.delete(id);
                if (!res.success) {
                    this.$toast.error(res.message);
                } else {
                    this.getDataFromApi(this.table_options.url);
                    this.$toast.success(res.message);
                }
            }
        },
        get(){
            this.test = this.table_options.url
            console.log(this.test);
        },
        onSearch() {
            this.getDataFromApi(this.table_options.url, this.searchInput);
            console.log(this.table_options.url)
        },

        onClearSearch() {
            this.search = '';
            this.getDataFromApi(this.table_options.url, this.searchInput);
        },

        filter(dataFilter) {
            this.getDataFromApi(this.table_options.url, this.searchInput, dataFilter);
            this.show_flter = false;
        },

        refreshData() {
            this.getDataFromApi(this.table_options.url, this.old_filter);
        },
    },
    beforeCreate() {
        this.$store.commit('setPageTitle', 'Project ');
    },

};
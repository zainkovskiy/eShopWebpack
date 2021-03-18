const search = {
   data(){
       return {
           userSearch: '',
       }
   },
    template: `
    <div>
            <form action="#" class="search-form" @submit.prevent="$parent.$refs.products.filter(userSearch)">
                    <input type="text" class="search-field" v-model="userSearch">
                    <button class="btn-search" type="submit">
                    <i class="fa fa-search fa-lg" aria-hidden="true"></i>
                    </button>
            </form>
    </div>
`
};

export default search;
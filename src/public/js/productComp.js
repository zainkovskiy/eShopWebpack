const product = {
    props: ['product'],
    data() {
        return{
            cartAPI: this.$root.$refs.cart,
        };
    },
    template: `
        <div class="product-item">
            <img :src="product.img_catalog" alt="Some img">
            <div class="desk">
                <h3>{{product.product_name}}</h3>
                <p>{{product.price}} ₽</p>
                <button class="buy-btn" @click="cartAPI.addProduct(product)">Купить</button>
            </div>
        </div>
    `
};

const products = {
    components: { product },
    data(){
        return {
            products: [],
            filtered: [],
        }
    },
    methods: {
        filter(value){
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        },
    },
    mounted(){
        this.$parent.getJson('/api/products')
            .then(data => {
                for (let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `
        <div class="products">
            <product v-for="item of filtered" :key="item.id_product" :product="item"></product>
        </div>
    `
};

export default products;
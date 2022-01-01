let paramsString = document.location.search;
let searchParams = new URLSearchParams(paramsString);

let categoryId = searchParams.get("category");

let productApi = Vue.resource('/product{/category_id}{/id}');

Vue.component('product-column', {
    props: ['product'],
    template:
        '<div class="product">' +
            '<form>' +
                '<img v-bind:src="product.image" alt="">' +
                '<h4>{{product.name}}</h4>' +
                '<p>{{product.price}}р</p>' +
                '<button class="btn">Добавить в корзину</button>' +
            '</form>' +
        '</div>'
})

Vue.component('products-list', {
    props: ['products'],
    template:
        '<div class="products wrapper">' +
            '<product-column v-for="product in products" :key="product.id" :product="product" />' +
        '</div>',
    created: function () {
        productApi.get({category_id: categoryId}).then(result =>
            result.json().then(data =>
                data.forEach(product => this.products.push(product)))
        )
    }
});

let catalog = new Vue({
    el: '#catalog',
    template: '<products-list :products="products" />',
    data: {
        products: []
    }
});


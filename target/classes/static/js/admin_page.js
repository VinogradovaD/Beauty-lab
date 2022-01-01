function getCategoryIdByName(name) {
    switch (name) {
        case "Для лица":
            return 1;
            break;
        case "Для тела":
            return 2;
            break;
        case "Для волос":
            return 3;
    }
}

function getIndex(list, id) {
    for (var i = 0; i < list.length; i++ ) {
        if (list[i].id === id) {
            return i;
        }
    }

    return -1;
}

let productApi = Vue.resource('/product{/category_id}{/id}');
let imageFile;
Vue.component('product-form', {
    props: ['products'],
    data: function () {
        return {
            name: '',
            price: '',
            image: '',
            category: '',
            id: ''
        }
    },
    template:
        '<div class="create-product">' +
            '<input type="text" placeholder="Название" v-model="name" required/>' +
            '<input type="number" placeholder="Цена" v-model="price" required/>' +
            '<input type="file" accept="image/*"  @change="previewFiles" multiple name="image" required />' +
            '<select v-model="category" required>' +
                '<option>Для лица</option>' +
                '<option>Для тела</option>' +
                '<option>Для волос</option>' +
            '</select>' +
            '<input type="button" value="Добавить" @click="save"/>' +
        '</div>',
    methods: {

        save: function (e) {
            let product = {
                name: this.name,
                price: this.price,
                image: this.image,
                category: {
                    id: getCategoryIdByName(this.category),
                    category_name: this.category
                }
            }
            console.log(product);

            productApi.save({}, product).then(result =>
                 result.json().then(data => {
                     console.log(data);
                     this.products.push(data);
             })
             )
            alert("Товар добавлен!");
        }
    }
});

Vue.component('product-column', {
    props: ['product', 'products'],
    data: function() {
        return {
            id: '',
            name: '',
            price: '',
            image: '',
            category: ''
        }
    },
    watch: {
        product: function(newVal, oldVal) {
            this.product.name = newVal.name;
            this.product.price = newVal.price;
        }
    },
    template:
        '<div class="product">'  +
            '<img v-bind:src="product.image" alt="">' +
            '<input class="edit-input" type="text"  v-model="product.name"/>' +
            '<input class="edit-input" type="number" v-model="product.price"/>' +
            '<a class="btn-action" @click="edit">Сохранить</a>' +
            '<a class="btn-action" @click="del">Удалить</a>' +
        '</div>',
    methods: {
        del: function () {
            isDelete = confirm("Хотите удалить продукт?");
            if (isDelete) {
                productApi.remove({category_id: this.product.category.id, id: this.product.id}).then(result => {
                    if (result.ok) {
                        this.products.splice(this.products.indexOf(this.product), 1)
                    }
                })
            }
        },
        edit: function () {

            let product = {name: this.product.name, price: this.product.price};

            productApi.update({category_id: this.product.category.id, id: this.product.id}, product)
                 .then(result => result.json().then(data => {
                     let index = getIndex(this.products, data.id);
                     this.products.splice(index, 1, data);
                 })
            )
            alert("Изменения успешно сохранены!");
        }
    }
})

Vue.component('products-list', {
    props: ['products'],
    data: function () {
        return {
            product: null
        }
    },
    template:
        '<div class="products wrapper">' +
            '<product-column v-for="product in products" :key="product.id" :product="product" :products="products"/>' +
        '</div>',
    created: function () {
        productApi.get().then(result =>
            result.json().then(data =>
                data.forEach(product => this.products.push(product)))
        )
    }
});

let catalog = new Vue({
    el: '#catalog',
    template:
        '<div>' +
            '<product-form :products="products"/>' +
            '<products-list :products="products" />' +
        '</div>',
    data: {
        products: []
    }
});


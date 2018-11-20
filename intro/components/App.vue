<template>
  <div>
    <div class="cart">
      <p>Cart({{ cart.length }})</p>
    </div>
    <product :premium="premium" @add-to-cart="updateCart"></product>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from "vue-class-component"
    import Product from "./Product.vue";

    @Component({
        components: {
            product: Product
        }
    })
    export default class App extends Vue {
        premium: boolean = true;
        cart: number[] = [];

        updateCart(id: number) {
            this.cart.push(id);
        }
    }
</script>

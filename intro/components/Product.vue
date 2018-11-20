<template>
  <div class="product">

    <div class="product-image">
      <img :src="image"/>
    </div>

    <div class="product-info">
      <h1>{{ product }}</h1>
      <p v-if="inStock">In Stock</p>
      <p v-else>Out of Stock</p>

      <info-tabs :shipping="shipping" :details="details"></info-tabs>

      <div class="color-box"
           v-for="(variant, index) in variants"
           :key="variant.variantId"
           :style="{ backgroundColor: variant.variantColor }"
           @mouseover="updateProduct(index)"
      >
      </div>

      <button v-on:click="addToCart"
              :disabled="!inStock"
              :class="{ disabledButton: !inStock }"
      >
        Add to cart
      </button>

    </div>

    <product-tabs :reviews="reviews"></product-tabs>

  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";
    import InfoTabs from "./InfoTabs.vue";
    import ProductTabs from "./ProductTabs.vue";
    import IVariant from "../interfaces/IVariant";
    import IReview from "../interfaces/IReview";
    import eventBus from "../eventBus"

    @Component({
        components: {
            "info-tabs": InfoTabs,
            "product-tabs": ProductTabs,
        },
    })
    export default class Product extends Vue {
        @Prop({required: true}) premium: boolean;
        product: string = 'Socks';
        brand: string = 'Vue Mastery';
        selectedVariant: number = 0;
        details: string[] = ['80% cotton', '20% polyester', 'Gender-neutral'];
        variants: IVariant[] = [
            {
                variantId: 2234,
                variantColor: 'green',
                variantImage: 'https://dl.dropboxusercontent.com/s/9zccs3f0pimj0wj/vmSocks-green-onWhite.jpg?dl=0',
                variantQuantity: 10
            },
            {
                variantId: 2235,
                variantColor: 'blue',
                variantImage: 'https://dl.dropboxusercontent.com/s/t32hpz32y7snfna/vmSocks-blue-onWhite.jpg?dl=0',
                variantQuantity: 0
            }
        ];
        reviews: IReview[] = [];

        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        }

        updateProduct(index) {
            this.selectedVariant = index
        }

        get title() {
            return this.brand + ' ' + this.product
        }

        get image() {
            return this.variants[this.selectedVariant].variantImage
        }

        get inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        }

        get shipping() {
            if (this.premium) {
                return "Free"
            }
            return 2.99
        }

        mounted() {
            eventBus.$on('review-submitted', (productReview: IReview) => {
                this.reviews.push(productReview)
            })
        }
    }
</script>
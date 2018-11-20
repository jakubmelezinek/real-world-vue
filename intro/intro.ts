import Vue from 'vue'
import Component from "vue-class-component";
import {Prop} from "vue-property-decorator";


let eventBus: Vue = new Vue();

interface IVariant {
    variantId: number;
    variantColor: string;
    variantImage: string;
    variantQuantity: number;
}

interface IReview {
    name: string;
    review: string;
    rating: string;
}

@Component({
    components: {
        "info-tabs": InfoTabs,
        "product-tabs": ProductTabs,
    },
    template: `
     <div class="product">

        <div class="product-image">
          <img :src="image" />
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
     `,
})
class Product extends Vue {
    @Prop({required: true}) premium: boolean;
    product: string =  'Socks';
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

    get image(){
        return this.variants[this.selectedVariant].variantImage
    }

    get inStock(){
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

@Component({
    template: `
    <form class="review-form" @submit.prevent="onSubmit">

      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name">
      </p>

      <p>
        <label for="review">Review:</label>
        <textarea id="review" v-model="review"></textarea>
      </p>

      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>

      <p>
        <input type="submit" value="Submit">
      </p>

    </form>
    `,
})
class ProductReview extends Vue {
    name: string = null;
    review: string = null;
    rating: string = null;
    errors: string[] = [];

    onSubmit() {
        if (this.name && this.review && this.rating) {
            let productReview: IReview = {
                name: this.name,
                review: this.review,
                rating: this.rating
            };
            eventBus.$emit('review-submitted', productReview);
            this.name = null;
            this.review = null;
            this.rating = null;
        }
        else {
            if(!this.name) this.errors.push("Name required.");
            if(!this.review) this.errors.push("Review required.");
            if(!this.rating) this.errors.push("Rating required.");
        }
    }
}

@Component({
    components: {
        "product-review": ProductReview
    },
    template: `
      <div>

        <ul>
          <span class="tabs"
                :class="{ activeTab: selectedTab === tab }"
                v-for="(tab, index) in tabs"
                @click="selectedTab = tab"
                :key="tab"
          >{{ tab }}</span>
        </ul>

        <div v-show="selectedTab === 'Reviews'">
            <p v-if="!reviews.length">There are no reviews yet.</p>
            <ul v-else>
                <li v-for="(review, index) in reviews" :key="index">
                  <p>{{ review.name }}</p>
                  <p>Rating:{{ review.rating }}</p>
                  <p>{{ review.review }}</p>
                </li>
            </ul>
        </div>

        <div v-show="selectedTab === 'Make a Review'">
          <product-review></product-review>
        </div>

      </div>
    `,
})
class ProductTabs extends Vue {
    @Prop({required: true}) reviews: IReview[];
    tabs: string[] = ['Reviews', 'Make a Review'];
    selectedTab: string = 'Reviews';
}


@Component({
    template: `
      <div>

        <ul>
          <span class="tabs"
                :class="{ activeTab: selectedTab === tab }"
                v-for="(tab, index) in tabs"
                @click="selectedTab = tab"
                :key="tab"
          >{{ tab }}</span>
        </ul>

        <div v-show="selectedTab === 'Shipping'">
          <p>{{ shipping }}</p>
        </div>

        <div v-show="selectedTab === 'Details'">
          <ul>
            <li v-for="detail in details">{{ detail }}</li>
          </ul>
        </div>

      </div>
    `,
})
class InfoTabs extends Vue{
    @Prop({required: true}) shipping: string | number;
    @Prop({required: true}) details: string[];
    tabs: string[] = ['Shipping', 'Details'];
    selectedTab: string = 'Shipping';
}

@Component({
    components: {
        product: Product
    },
    template: `
    <div>
      <div class="cart">
        <p>Cart({{ cart.length }})</p>
      </div>
      <product :premium="premium" @add-to-cart="updateCart"></product>
    </div>
    `
})
class App extends Vue {
    premium: boolean = true;
    cart: number[] = [];

    updateCart(id: number) {
        this.cart.push(id);
    }
}

console.log("about to instantiate Vue #app");
new App({el: '#app'});
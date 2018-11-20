<template>
  <div>

    <ul>
      <span
        class="tabs"
        :class="{ activeTab: selectedTab === tab }"
        v-for="(tab, index) in tabs"
        @click="selectedTab = tab"
        :key="tab">
        {{ tab }}
      </span>
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
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";
    import ProductReview from "./ProductReview.vue";
    import IReview from "../interfaces/IReview";

    @Component({
        components: {
            "product-review": ProductReview
        },
    })
    export default class ProductTabs extends Vue {
        @Prop({required: true}) reviews: IReview[];
        tabs: string[] = ['Reviews', 'Make a Review'];
        selectedTab: string = 'Reviews';
    }
</script>

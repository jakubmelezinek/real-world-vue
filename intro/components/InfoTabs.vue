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

    <div v-show="selectedTab === 'Shipping'">
      <p>{{ shipping }}</p>
    </div>

    <div v-show="selectedTab === 'Details'">
      <ul>
        <li v-for="detail in details">{{ detail }}</li>
      </ul>
    </div>

  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";

    @Component
    export default class InfoTabs extends Vue {
        @Prop({required: true}) shipping: string | number;
        @Prop({required: true}) details: string[];
        tabs: string[] = ['Shipping', 'Details'];
        selectedTab: string = 'Shipping';
    }
</script>
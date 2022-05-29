<template>
  <div class="flex flex-wrap gap-8 px-12 py-6">
    <product
      v-for="(product, idx) in products"
      :key="idx"
      :product="product"
      @stockEnd="$emit('stockEnd')"
      @addToCart="$emit('addToCart', $event)"
    ></product>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Product from '@/components/products/product.vue';

export default defineComponent({
  components: {
    Product,
  },
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>

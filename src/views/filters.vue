<template>
  <div class="py-2 px-6 text-left">
    <div>
      <div class="text-xl font-semibold py-4">Categories</div>
      <div class="overflow-scroll h-96">
        <div
          class="flex items-center py-2 capitalize"
          v-for="(category, idx) in getCategories"
          :key="idx"
        >
          <input
            class="h-4 w-4 align-top mr-2 cursor-pointer"
            type="checkbox"
            v-model="selectedCategory[category]"
            :id="category"
            :checked="selectedCategory[category]"
          />
          <label class="inline-block text-base" :for="category">
            {{ category.replace('-', ' ') }}
          </label>
        </div>
      </div>
    </div>
    <div class="border-t border-gray-400 my-3"></div>
    <div>
      <div class="text-xl font-semibold py-4">Brands</div>
      <div class="overflow-scroll h-96">
        <div class="flex items-center py-2 capitalize" v-for="(brand, idx) in getBrands" :key="idx">
          <input
            class="h-4 w-4 align-top mr-2 cursor-pointer"
            type="checkbox"
            v-model="selectedBrands[brand]"
            :id="brand"
            :checked="selectedBrands[brand]"
          />
          <label class="inline-block text-base" :for="brand">
            {{ brand.replace('-', ' ') }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch, watchEffect } from 'vue';
import { products } from '../data';
import { useStore } from '@/store';

export default defineComponent({
  name: 'Filters',
  setup() {
    const store = useStore();
    const selectedCategory = ref({
      // smartphones: true,
      // laptops: true,
      // fragrances: true,
      // skincare: true,
      // groceries: true,
      // 'home-decoration': true,
      // furniture: true,
      // tops: true,
      // 'womens-dresses': true,
      // 'womens-shoes': true,
      // 'mens-shirts': true,
      // 'mens-shoes': true,
      // 'mens-watches': true,
      // 'womens-watches': true,
      // 'womens-bags': true,
      // 'womens-jewellery': true,
      // sunglasses: true,
      // automotive: true,
      // motorcycle: true,
      // lighting: true,
    }) as any;

    const selectedBrands = ref({}) as any;
    const getCategories = computed(() => {
      return [...new Set(products.map((product) => product.category.toLowerCase()))];
    });
    const getBrands = computed(() => {
      const tempCategory = Object.keys(selectedCategory.value)
        .map((i: string) => {
          if (selectedCategory.value[i] === true) {
            return i;
          }
        })
        .filter((val) => val !== undefined);

      const tempProduct = products.filter((product) => tempCategory.includes(product?.category));

      store.dispatch('app/categories', tempCategory ? (tempCategory as string[]) : null);
      return tempProduct.length > 0
        ? [...new Set(tempProduct.map((product) => product.brand.toLowerCase()))]
        : [...new Set(products.map((product) => product.brand.toLowerCase()))];
    });
    watch(selectedBrands.value, (val) => {
      if (val) {
        const tempBrands = Object.keys(selectedBrands.value)
          .map(
            (i: string) => {
              if (selectedBrands.value[i] === true) {
                return i;
              }
            },
            { deep: true }
          )
          .filter((val) => val !== undefined);
        // console.log('🚀 ~ file: Filters.vue ~ line 128 ~ tempBrands ~ tempBrands', tempBrands);
        store.dispatch('app/brands', tempBrands ? (tempBrands as string[]) : null);
      }
    });
    return {
      getCategories,
      getBrands,
      selectedCategory,
      selectedBrands,
    };
  },
});
</script>

<style scoped></style>

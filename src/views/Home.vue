<template>
  <div class="home">
    <modal v-if="modalVisible" :isVisible="modalVisible" @cancel="modalVisible = false">
      <template #title>
        <p>Notify</p>
      </template>
      <template #body>
        <div class="px-4 flex flex-col gap-5">
          <div class="mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="64"
              height="64"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
            >
              <g fill="none" stroke="#222" stroke-linecap="round" stroke-width="2">
                <path d="M12 9v5m0 3.5v.5" />
                <path
                  stroke-linejoin="round"
                  d="M2.232 19.016L10.35 3.052c.713-1.403 2.59-1.403 3.302 0l8.117 15.964C22.45 20.36 21.544 22 20.116 22H3.883c-1.427 0-2.334-1.64-1.65-2.984Z"
                />
              </g>
            </svg>
          </div>
          <div class="text-3xl">Hurry! only a few items left</div>

          <button
            class="text-center mt-2 py-3 px-10 border border-indigo-700 focus:outline-none rounded-md text-white bg-indigo-700 mx-auto"
            @click="modalVisible = false"
          >
            OK
          </button>
        </div>
      </template>
    </modal>
    <div v-if="addToCart" class="absolute right-6 z-50">
      <div
        id="toast-success"
        class="flex items-center w-full max-w-md p-4 mb-4 bg-white rounded-lg shadow"
        role="alert"
      >
        <div
          class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg"
        >
          <svg
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <div class="ml-3 text-xl">Item added to cart successfully.</div>
        <button
          type="button"
          class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8"
          data-dismiss-target="#toast-success"
          aria-label="Close"
          @click="addToCart = false"
        >
          <span class="sr-only">Close</span>
          <svg
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <div class="flex items-center justify-between mt-5 pb-4 border-b-2 border-gray-300">
      <div class="px-6 text-2xl font-semibold">Filters</div>
      <div
        class="relative text-left border border-gray-300 rounded-md"
        @mouseenter="showSort = true"
        @mouseleave="showSort = false"
        style="min-width: 280px"
      >
        <div class="px-4 py-2 hover:shadow-md flex items-center">
          Sort By:&nbsp;
          <span class="font-semibold flex-1">{{ selectedSort.title }}</span>
          <img class="ml-2 h-4 w-4 transform rotate-90" src="@/assets/icon/arrow-right.svg" />
        </div>
        <div v-if="showSort" class="absolute shadow-md w-full bg-white">
          <template v-for="(so, idx) in sortOptions" :key="idx">
            <div
              class="px-4 py-2 cursor-pointer hover:bg-gray-100"
              @click="
                selectedSort = so;
                showSort = false;
              "
            >
              {{ so.title }}
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="flex">
      <Filters style="min-width: 250px" class="shadow-md filters" />
      <Products
        :products="getProducts"
        class="products"
        @stockEnd="modalVisible = true"
        @addToCart="addToCart = $event"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref } from 'vue';
import Modal from '@/components/global/TheModal.vue';
import Products from '@/views/products.vue';
import Filters from '@/views/filters.vue';
import { products } from '../data';
import { useStore } from '@/store';

export default defineComponent({
  name: 'Home',
  components: {
    Modal,
    Filters,
    Products,
  },
  setup() {
    const store = useStore();
    const modalVisible = ref(false);
    const addToCart = ref(false);
    const showSort = ref(false);
    const selectedSort = ref({
      title: 'Better Discount',
      value: 'discount',
    });

    const sortOptions = [
      {
        title: 'Better Discount',
        value: 'discount',
      },
      {
        title: 'Customer Rating',
        value: 'rating',
      },
      {
        title: 'Price High to Low',
        value: 'high_price',
      },
      {
        title: 'Price low to High',
        value: 'low_price',
      },
    ];
    const getProducts = computed(() => {
      const tempCategory = store.state.app.categories;
      const tempBrands = store.state.app.brands;
      let tempProducts =
        tempCategory && tempCategory.length > 0
          ? products.filter((product) => tempCategory?.includes(product?.category))
          : products;
      if (tempBrands && tempBrands.length > 0) {
        tempProducts = tempProducts.filter((product) =>
          tempBrands?.includes(product.brand.toLowerCase())
        );
      }
      if (selectedSort.value.value === 'discount') {
        tempProducts = tempProducts.sort((a, b) => b.discountPercentage - a.discountPercentage);
        return [...tempProducts];
      }
      if (selectedSort.value.value === 'rating') {
        tempProducts = tempProducts.sort((a, b) => b.rating - a.rating);
        return [...tempProducts];
      }
      if (selectedSort.value.value === 'high_price') {
        tempProducts = tempProducts.sort((a, b) => b.price - a.price);
        return [...tempProducts];
      }
      if (selectedSort.value.value === 'low_price') {
        tempProducts = tempProducts.sort((a, b) => a.price - b.price);
        return [...tempProducts];
      }
      return tempProducts;
    });
    return {
      showSort,
      modalVisible,
      addToCart,
      sortOptions,
      selectedSort,
      getProducts,
    };
  },
});
</script>

<style lang="scss" scoped>
.products,
.filters {
  height: calc(100vh - 130px);
  overflow-y: scroll;
  scroll-behavior: smooth;
}
</style>

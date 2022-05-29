<template>
  <div v-if="getCart && getCart.length > 0" class="flex">
    <div class="w-full mr-10 products">
      <div class="border border-gray-500 text-left rounded-xl p-6 my-3">
        <div class="text-3xl text-indigo-700 font-semibold">Free Shipping For Members.</div>
        <p class="text-lg">Become a member for free and fast shipping.</p>
      </div>
      <div
        v-for="(product, idx) in getCart"
        :key="idx"
        class="bg-white shadow-md rounded-3xl w-full p-6 pb-4 flex my-3"
      >
        <img
          class="rounded-2xl w-56 h-56 shadow-md object-cover"
          :src="product.thumbnail"
          alt="Makeup"
        />

        <div class="text-left flex flex-col p-6">
          <div class="font-semibold text-4xl">
            {{ product.brand }}
          </div>
          <div class="flex items-center">
            <svg
              class="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              ></path>
            </svg>
            <p class="pl-0.5 text-gray-900">{{ product.rating }}</p>
          </div>

          <div class="text-xl">{{ product.title }}</div>
          <div class="text-xl">{{ product.description }}</div>
          <div class="text-3xl font-semibold">
            <span> Rs. </span>
            {{ product.price }}
            <span
              v-if="product.discountPercentage && product.discountPercentage !== ''"
              class="text-red-400 font-light"
            >
              ({{ product.discountPercentage }}%) OFF
            </span>
          </div>
          <div
            class="mt-2 text-base font-semibold text-red-600"
            v-if="product.stock && product.stock < 50"
          >
            Only Few Left!
          </div>
        </div>
      </div>
    </div>
    <div class="text-left mx-6 p-6 shadow-md" style="min-width: 450px">
      <div class="font-bold text-3xl my-3">Summary</div>
      <div class="font-semibold my-3">Do you have a Promo Code ?</div>
      <div class="my-3 flex justify-between font-semibold">
        <div>Subtotal</div>
        <div>Rs.{{ getTotal }}.00</div>
      </div>
      <div class="my-3 flex justify-between font-semibold">
        <div>Discount</div>
        <div>Rs.100.00</div>
      </div>
      <div class="my-3 flex justify-between font-semibold">
        <div>Estimated Shipping & Handling</div>
        <div>Rs.500.00</div>
      </div>
      <div class="my-3 flex justify-between font-semibold">
        <div>Estimated Tax</div>
        <div>Rs.500.00</div>
      </div>
      <div class="border-t border-gray-400 my-3"></div>

      <div class="my-3 flex justify-between font-semibold">
        <div>Total Amount</div>
        <div>Rs.{{ getTotal + 900 }}.00</div>
      </div>
      <button
        class="w-full text-center mt-2 py-3 border border-indigo-700 focus:outline-none rounded-3xl bg-indigo-700 text-white text-xl shadow-md"
      >
        Checkout
      </button>
    </div>
  </div>
  <div
    v-else
    class="flex flex-col text-left items-center border border-gray-300 p-6 m-6 rounded-xl shadow-md"
  >
    <div class="font-semibold text-2xl self-start">My Cart</div>
    <img class="w-96 h-full" src="@/assets/logo/cart.webp" />
    <div class="text-3xl font-semibold">Your cart is empty!</div>
    <div class="text-xl font-normal">Add items to it now.</div>
    <button
      class="text-center my-4 py-3 border border-indigo-700 focus:outline-none rounded-md bg-indigo-700 text-white text-xl shadow-md m-auto px-10"
      @click="$router.push({ name: 'Home' })"
    >
      Shop Now
    </button>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'Cart',
  setup() {
    const store = useStore();
    const getCart = computed(() => store.state.app.cart);
    const getTotal = computed(() => {
      const prices = getCart.value.map((product: any) => product.price);
      return prices.reduce(
        (previousValue: any, currentValue: any) => previousValue + currentValue,
        0
      );
    });
    return {
      getCart,
      getTotal,
    };
  },
});
</script>

<style lang="scss" scoped>
.products {
  height: calc(100vh - 100px);
  overflow-y: scroll;
  scroll-behavior: smooth;
}
</style>

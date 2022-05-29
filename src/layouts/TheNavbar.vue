<template>
  <div class="flex justify-between select-none bg-white shadow-md h-16">
    <div class="flex items-center cursor-pointer" @click="$router.push({ name: 'Home' })">
      <div class="overflow-hidden p-2 w-16">
        <img class="w-full h-full" src="@/assets/logo/hg.png" />
      </div>
      <div class="text-2xl font-bold">My App</div>
    </div>
    <div class="flex justify-around items-center mx-4">
      <div class="cursor-pointer relative" @click="$router.push({ name: 'Cart' })">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          width="22"
          height="22"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 16 16"
        >
          <g fill="#222">
            <path
              d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"
            />
            <path
              d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607l1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4a2 2 0 0 0 0-4h7a2 2 0 1 0 0 4a2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0a1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0z"
            />
          </g>
        </svg>
        <div class="absolute -top-3 -right-3 rounded-full bg-indigo-700 text-white h-6 w-6">
          {{ cartItems }}
        </div>
      </div>
      <img class="ml-8 h-8 cursor-pointer" src="@/assets/icon/notification.svg" />
      <div class="flex cursor-pointer items-center relative">
        <div
          v-if="showLogOut"
          @click="showLogOut = false"
          class="fixed inset-0 bg-black opacity-25 h-full w-full cursor-default"
        ></div>
        <span
          v-if="user"
          class="relative z-10 flex justify-center font-semibold items-center bg-black text-white w-9 h-9 ml-8 rounded-full"
          @click="showLogOut = !showLogOut"
        >
          {{ user.firstName.charAt(0) }}{{ user.lastName.charAt(0) }}
        </span>
        <span v-else class="ml-2 text-gray-dark" @click="logout">Logout</span>
        <button
          v-if="showLogOut"
          class="absolute mt-10 w-32 text-gray-700 flex items-center text-sm px-3 ring-1 ring-black ring-opacity-5 right-0 top-0 py-2 rounded-md shadow-lg bg-white hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store';
import { computed, defineComponent, onUnmounted, ref } from 'vue';

export default defineComponent({
  name: 'TheNavbar',

  setup() {
    const showLogOut = ref(false);
    const store = useStore();
    const sidebar = computed(() => store.state.app.sidebar);
    const cartItems = computed(() => store.state.app.cart?.length);
    const isMobile = computed(() => store.state.app.device === 'mobile');
    const user = ref({
      firstName: 'Harsh',
      lastName: 'Gupta',
    });
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Esc' || e.key === 'Escape') {
        showLogOut.value = false;
      }
    };
    document.addEventListener('keydown', handleEscape);
    onUnmounted(() => {
      document.removeEventListener('keydown', handleEscape);
    });
    const toggleSideBar = () => {
      store.dispatch('app/toggleSideBar');
    };
    return {
      showLogOut,
      sidebar,
      isMobile,
      user,
      toggleSideBar,
      cartItems,
    };
  },
});
</script>

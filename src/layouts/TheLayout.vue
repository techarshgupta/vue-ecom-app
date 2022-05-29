<template>
  <main :class="classObj">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="fixed inset-0 bg-black opacity-25 h-full w-full z-50"
      @click="handleClickOutside"
    />
    <div class="wrapper" :class="navExpand ? 'click-collapse' : 'hover-collapse'">
      <div
        class="header fixed z-40 w-full"
        :class="navExpand ? 'click-collapse' : 'hover-collapse'"
      >
        <navbar />
      </div>
      <div
        class="body pt-16 px-4"
        :class="device === 'mobile' && sidebar.opened ? 'fixed overflow-hidden' : ''"
      >
        <dashboard />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue';
import Dashboard from './Dashboard.vue';
import Navbar from './TheNavbar.vue';
import { useStore } from '@/store';

export default defineComponent({
  name: 'TheLayout',
  components: {
    Dashboard,
    Navbar,
  },
  setup() {
    const store = useStore();
    const { body } = document;
    const WIDTH = 992;
    const navExpand = ref(false);
    const isMobile = (): boolean => {
      const rect = body.getBoundingClientRect();
      return rect.width - 1 < WIDTH;
    };
    const resizeHandler = (): void => {
      if (!document.hidden) {
        const isMob: boolean = isMobile();
        store.dispatch('app/toggleDevice', isMob ? 'mobile' : 'desktop');
        if (isMob) {
          store.dispatch('app/closeSideBar', { withoutAnimation: true });
        }
      }
    };
    onBeforeMount(() => {
      window.addEventListener('resize', resizeHandler);
    });
    onMounted(() => {
      const isMob = isMobile();
      if (isMob) {
        store.dispatch('app/toggleDevice', 'mobile');
        store.dispatch('app/closeSideBar', { withoutAnimation: true });
      }
    });
    onBeforeUnmount(() => {
      window.removeEventListener('resize', resizeHandler);
    });
    const sidebar = computed(() => store.state.app.sidebar);
    const device = computed(() => store.state.app.device);
    const classObj = computed(() => {
      return {
        'hide-sidebar': !sidebar.value.opened,
        openSidebar: sidebar.value.opened,
        withoutAnimation: sidebar.value.withoutAnimation,
        mobile: device.value === 'mobile',
      };
    });
    /* check device type on load */
    if (device.value === 'mobile' && sidebar.value.opened) {
      store.dispatch('app/closeSideBar', { withoutAnimation: false });
    }
    const toggleSidebar = () => {
      store.dispatch('app/toggleSideBar');
    };
    const handleClickOutside = () => {
      store.dispatch('app/closeSideBar', { withoutAnimation: false });
    };
    return {
      classObj,
      navExpand,
      toggleSidebar,
      sidebar,
      device,
      handleClickOutside,
    };
  },
});
</script>

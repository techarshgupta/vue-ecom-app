import { MutationTree } from 'vuex';
import { AppState, closeSidebar } from './state';

export type Mutations<S = AppState> = {
  TOGGLE_SIDEBAR(state: S): void;
  CLOSE_SIDEBAR(state: S, anim: closeSidebar): void;
  TOGGLE_DEVICE(state: S, device: string): void;
  CATEGORIES(state: S, data: string[] | null): void;
  BRANDS(state: S, data: string[] | null): void;
  ADD_TO_CART(state: S, data: any): void;
};

export const mutations: MutationTree<AppState> & Mutations = {
  TOGGLE_SIDEBAR: (state: AppState) => {
    state.sidebar.opened = !state.sidebar.opened;
    state.sidebar.withoutAnimation = false;
  },
  CLOSE_SIDEBAR: (state: AppState, { withoutAnimation }) => {
    state.sidebar.opened = false;
    state.sidebar.withoutAnimation = withoutAnimation;
  },
  TOGGLE_DEVICE: (state: AppState, device) => {
    state.device = device;
  },
  CATEGORIES: (state: AppState, data) => {
    state.categories = data;
  },
  BRANDS: (state: AppState, data) => {
    state.brands = data;
  },
  ADD_TO_CART: (state: AppState, data) => {
    state.cart.push(data);
  },
};

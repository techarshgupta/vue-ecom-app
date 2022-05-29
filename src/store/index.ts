import { createStore } from 'vuex';
import { store as app, AppStore, AppState } from '@/store/app';

export type RootState = {
  app: AppState;
};

export type Store = AppStore<Pick<RootState, 'app'>>;

// const debug = process.env.NODE_ENV !== 'production';
// const plugins = debug ? [createLogger({})] : [];

export const store = createStore({
  strict: true,
  // plugins,
  modules: {
    app,
  },
});

export function useStore(): Store {
  return store as Store;
}

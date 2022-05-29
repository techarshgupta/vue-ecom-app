export interface AppState {
  device: string;
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
  };
  categories: string[] | null;
  brands: null | string[];
  cart: any;
}

export interface closeSidebar {
  withoutAnimation: boolean;
}

export const appState: AppState = {
  device: 'desktop',
  sidebar: {
    opened: false,
    withoutAnimation: false,
  },
  categories: null,
  brands: null,
  cart: [],
};

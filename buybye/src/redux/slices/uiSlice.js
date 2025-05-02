// src/redux/slices/uiSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  navbarOpen: false,
  cartDrawerOpen: false,
  filterDrawerOpen: false,
  searchDrawerOpen: false,
  mobileMenuOpen: false,
  theme: localStorage.getItem("theme") || "light",
  alerts: [],
  modalState: {
    isOpen: false,
    type: null, // 'login', 'register', 'forgotPassword', 'productQuickView', 'locationPicker', etc.
    data: null,
  },
  toasts: [],
  isLoading: false,
  pageTitle: "",
  activeSidebarItem: "",
  appVersion: import.meta.env.VITE_APP_VERSION || "1.0.0",
};

// UI slice
const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    // Navigation
    toggleNavbar: (state) => {
      state.navbarOpen = !state.navbarOpen;
    },
    setNavbarOpen: (state, action) => {
      state.navbarOpen = action.payload;
    },
    toggleCartDrawer: (state) => {
      state.cartDrawerOpen = !state.cartDrawerOpen;
    },
    setCartDrawerOpen: (state, action) => {
      state.cartDrawerOpen = action.payload;
    },
    toggleFilterDrawer: (state) => {
      state.filterDrawerOpen = !state.filterDrawerOpen;
    },
    setFilterDrawerOpen: (state, action) => {
      state.filterDrawerOpen = action.payload;
    },
    toggleSearchDrawer: (state) => {
      state.searchDrawerOpen = !state.searchDrawerOpen;
    },
    setSearchDrawerOpen: (state, action) => {
      state.searchDrawerOpen = action.payload;
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    setMobileMenuOpen: (state, action) => {
      state.mobileMenuOpen = action.payload;
    },

    // Theme
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.theme);
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
    },

    // Alerts
    addAlert: (state, action) => {
      const id = Date.now().toString();
      state.alerts.push({
        id,
        type: action.payload.type || "info",
        message: action.payload.message,
        autoClose:
          action.payload.autoClose !== undefined
            ? action.payload.autoClose
            : true,
        duration: action.payload.duration || 5000,
      });
    },
    removeAlert: (state, action) => {
      state.alerts = state.alerts.filter(
        (alert) => alert.id !== action.payload
      );
    },
    clearAlerts: (state) => {
      state.alerts = [];
    },

    // Modals
    openModal: (state, action) => {
      state.modalState = {
        isOpen: true,
        type: action.payload.type,
        data: action.payload.data || null,
      };
    },
    closeModal: (state) => {
      state.modalState = {
        isOpen: false,
        type: null,
        data: null,
      };
    },
    setModalData: (state, action) => {
      state.modalState.data = action.payload;
    },

    // Toasts
    addToast: (state, action) => {
      const id = Date.now().toString();
      state.toasts.push({
        id,
        type: action.payload.type || "info",
        message: action.payload.message,
        title: action.payload.title || "",
        autoClose:
          action.payload.autoClose !== undefined
            ? action.payload.autoClose
            : true,
        duration: action.payload.duration || 5000,
      });
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter(
        (toast) => toast.id !== action.payload
      );
    },
    clearToasts: (state) => {
      state.toasts = [];
    },

    // Loading state
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    // Page title
    setPageTitle: (state, action) => {
      state.pageTitle = action.payload;
      document.title = action.payload
        ? `${action.payload} | BBBolt Customer`
        : "BBBolt Customer";
    },

    // Sidebar
    setActiveSidebarItem: (state, action) => {
      state.activeSidebarItem = action.payload;
    },
  },
});

// Export actions and reducer
export const {
  // Navigation
  toggleNavbar,
  setNavbarOpen,
  toggleCartDrawer,
  setCartDrawerOpen,
  toggleFilterDrawer,
  setFilterDrawerOpen,
  toggleSearchDrawer,
  setSearchDrawerOpen,
  toggleMobileMenu,
  setMobileMenuOpen,

  // Theme
  toggleTheme,
  setTheme,

  // Alerts
  addAlert,
  removeAlert,
  clearAlerts,

  // Modals
  openModal,
  closeModal,
  setModalData,

  // Toasts
  addToast,
  removeToast,
  clearToasts,

  // Loading state
  setIsLoading,

  // Page title
  setPageTitle,

  // Sidebar
  setActiveSidebarItem,
} = uiSlice.actions;

// Selectors
export const selectNavbarOpen = (state) => state.ui.navbarOpen;
export const selectCartDrawerOpen = (state) => state.ui.cartDrawerOpen;
export const selectFilterDrawerOpen = (state) => state.ui.filterDrawerOpen;
export const selectSearchDrawerOpen = (state) => state.ui.searchDrawerOpen;
export const selectMobileMenuOpen = (state) => state.ui.mobileMenuOpen;
export const selectTheme = (state) => state.ui.theme;
export const selectAlerts = (state) => state.ui.alerts;
export const selectModalState = (state) => state.ui.modalState;
export const selectToasts = (state) => state.ui.toasts;
export const selectIsLoading = (state) => state.ui.isLoading;
export const selectPageTitle = (state) => state.ui.pageTitle;
export const selectActiveSidebarItem = (state) => state.ui.activeSidebarItem;
export const selectAppVersion = (state) => state.ui.appVersion;

export default uiSlice.reducer;

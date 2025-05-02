// C:\Users\faeiz\Desktop\buy-bye-frontend\buybye\src\redux\store.js
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";

// Import reducers
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import productReducer from "./slices/productSlice";
import categoryReducer from "./slices/categorySlice";
import vendorReducer from "./slices/vendorSlice";
import orderReducer from "./slices/orderSlice";
import uiReducer from "./slices/uiSlice";
import locationReducer from "./slices/locationSlice";
import searchReducer from "./slices/searchSlice";

// Configure the store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productReducer,
    categories: categoryReducer,
    vendors: vendorReducer,
    orders: orderReducer,
    ui: uiReducer,
    location: locationReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serializability check
        ignoredActions: ["auth/login/fulfilled", "auth/register/fulfilled"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        // Ignore these paths in the state
        ignoredPaths: ["auth.user.createdAt", "auth.user.updatedAt"],
      },
    }),
  devTools: import.meta.env.DEV,
});

// Enable listener behavior for the store
setupListeners(store.dispatch);

export default store;

// Export all actions and selectors from one place
export * from "./slices/authSlice";
export * from "./slices/cartSlice";
export * from "./slices/productSlice";
export * from "./slices/categorySlice";
export * from "./slices/vendorSlice";
export * from "./slices/orderSlice";
export * from "./slices/uiSlice";
export * from "./slices/locationSlice";
export * from "./slices/searchSlice";

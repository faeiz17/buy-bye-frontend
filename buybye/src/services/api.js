// src/services/api.js
import axios from "axios";
import { API_URL } from "./apiConfig";

// Create axios instance with base URL from config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor to attach the auth token to every request
api.interceptors.request.use(
  async (config) => {
    try {
      const token = localStorage.getItem("userToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error getting token from storage:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors (expired token)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Remove token and let auth context handle the redirect
      localStorage.removeItem("userToken");

      // You can dispatch an event or use a global state manager to handle logout
      // For example with a custom event:
      window.dispatchEvent(new CustomEvent("unauthorized"));

      // Or if using React Context or Redux, you could call a logout action here
    }

    return Promise.reject(error);
  }
);

// Customer API endpoints
export const customerApi = {
  // Auth
  register: (data) => api.post("/customers/register", data),
  login: (data) => api.post("/customers/login", data),
  verifyEmail: (token) => api.get(`/customers/verify-email/${token}`),
  forgotPassword: (email) => api.post("/customers/forgot-password", { email }),
  resetPassword: (token, password) =>
    api.post(`/customers/reset-password/${token}`, { password }),

  // Profile
  getProfile: () => api.get("/customers/profile"),
  updateProfile: (data) => api.put("/customers/profile", data),
  updatePassword: (data) => api.put("/customers/update-password", data),

  // Location
  updateLocation: (data) => api.post("/customers/update-location", data),
  getNearbyVendors: (params) =>
    api.get("/customers/nearby-vendors", { params }),
  getNearbyProducts: (params) =>
    api.get("/customers/nearby-products", { params }),

  searchNearbyVendorsAndProducts: (params) =>
    api.get("/customers/search-nearby-vendors-products", { params }),
  priceComparison: (params) =>
    api.get("/customers/price-comparison", { params }),
};

// Products API endpoints
export const productApi = {
  getAllProducts: (params) => api.get("/products", { params }),
  getProductById: (id) => api.get(`/products/${id}`),
  getProductsByCategory: (categoryId, params) =>
    api.get(`/products/category/${categoryId}`, { params }),
  getProductsBySubCategory: (subCategoryId, params) =>
    api.get(`/products/sub-category/${subCategoryId}`, { params }),
  searchProducts: (params) => api.get("/products/search", { params }),
  getFeaturedProducts: () => api.get("/products/featured"),
  getNewArrivals: () => api.get("/products/new-arrivals"),
  getBestSellers: () => api.get("/products/best-sellers"),
};

// Vendor Products API endpoints
export const vendorProductApi = {
  getNearbyVendorProducts: (params) =>
    api.get("/customers/nearby-products", { params }),
  getVendorProductById: (id) => api.get(`/vendor-products/${id}`),
  getVendorProductsByCategory: (categoryId, locationParams) =>
    api.get("/customers/nearby-products", {
      params: { ...locationParams, categoryId },
    }),
  searchProductsByKeyword: (keyword, locationParams) =>
    api.get("/customers/nearby-products", {
      params: { ...locationParams, keyword },
    }),
};

export const vendorApi = {
  getNearbyVendors: (params) => api.get("/vendors/nearby", { params }),
  getAllVendors: (params) => api.get("/vendors", { params }),
  getVendorById: (id) => api.get(`/vendors/${id}`),
  getVendorProducts: (id, params) =>
    api.get(`/vendors/${id}/products`, { params }),
  getVendorReviews: (id, params) =>
    api.get(`/vendors/${id}/reviews`, { params }),
};

// Categories API endpoints
export const categoryApi = {
  getAllCategories: () => api.get("/categories"),
  getCategoryById: (id) => api.get(`/categories/${id}`),
  getAllSubCategories: () => api.get("/subcategories"),
  getSubCategoriesByCategory: (categoryId) =>
    api.get(`/subcategories/by-category/${categoryId}`),
};

// Cart API endpoints
export const cartApi = {
  getCart: () => api.get("/cart"),
  addToCart: (vendorProductId, quantity = 1) =>
    api.post("/cart", { vendorProductId, quantity }),
  updateCartItem: (vendorProductId, quantity) =>
    api.put(`/cart/${vendorProductId}`, { quantity }),
  removeCartItem: (vendorProductId) => api.delete(`/cart/${vendorProductId}`),
  clearCart: () => api.delete("/cart"),
  saveForLater: (vendorProductId) =>
    api.post(`/cart/save-for-later/${vendorProductId}`),
  getSavedItems: () => api.get("/cart/saved-items"),
  moveToCart: (savedItemId) => api.post(`/cart/move-to-cart/${savedItemId}`),
};

// Order API endpoints
export const orderApi = {
  createOrder: (data) => api.post("/orders", data),
  createDirectOrder: (data) => api.post("/orders/direct", data),
  getOrders: (params) => api.get("/customer/orders", { params }),
  getOrderById: (id) => api.get(`/customer/orders/${id}`),
  cancelOrder: (id, reason) =>
    api.put(`/customer/orders/${id}/cancel`, { reason }),
  getOrderTracking: (id) => api.get(`/customer/orders/${id}/tracking`),
  rateOrder: (id, rating, review) =>
    api.post(`/customer/orders/${id}/rate`, { rating, review }),
  reorder: (id) => api.post(`/customer/orders/${id}/reorder`),
};

// Wishlist API endpoints
export const wishlistApi = {
  getWishlist: () => api.get("/customer/wishlist"),
  addToWishlist: (productId) => api.post("/customer/wishlist", { productId }),
  removeFromWishlist: (productId) =>
    api.delete(`/customer/wishlist/${productId}`),
  moveToCart: (productId, quantity = 1) =>
    api.post(`/customer/wishlist/${productId}/move-to-cart`, { quantity }),
};

// Review API endpoints
export const reviewApi = {
  getProductReviews: (productId, params) =>
    api.get(`/reviews/product/${productId}`, { params }),
  getVendorReviews: (vendorId, params) =>
    api.get(`/reviews/vendor/${vendorId}`, { params }),
  addProductReview: (productId, data) =>
    api.post(`/reviews/product/${productId}`, data),
  addVendorReview: (vendorId, data) =>
    api.post(`/reviews/vendor/${vendorId}`, data),
  updateReview: (reviewId, data) => api.put(`/reviews/${reviewId}`, data),
  deleteReview: (reviewId) => api.delete(`/reviews/${reviewId}`),
};

// Search API endpoints
export const searchApi = {
  globalSearch: (query, params) =>
    api.get("/search", { params: { query, ...params } }),
  autoComplete: (query) =>
    api.get("/search/autocomplete", { params: { query } }),
  searchHistory: () => api.get("/search/history"),
  clearSearchHistory: () => api.delete("/search/history"),
};

// For creating apiConfig.js file
export const createApiConfig = (baseUrl) => {
  return `// src/services/apiConfig.js
export const API_URL = '${baseUrl}';
`;
};

export default api;

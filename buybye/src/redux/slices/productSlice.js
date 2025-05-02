// src/redux/slices/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productApi, vendorProductApi } from "../../services/api";

// Async thunks
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async (params, { rejectWithValue }) => {
    try {
      const response = await productApi.getAllProducts(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products."
      );
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await productApi.getProductById(productId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch product details."
      );
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchProductsByCategory",
  async ({ categoryId, params }, { rejectWithValue }) => {
    try {
      const response = await productApi.getProductsByCategory(
        categoryId,
        params
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products by category."
      );
    }
  }
);

export const fetchProductsBySubCategory = createAsyncThunk(
  "products/fetchProductsBySubCategory",
  async ({ subCategoryId, params }, { rejectWithValue }) => {
    try {
      const response = await productApi.getProductsBySubCategory(
        subCategoryId,
        params
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch products by subcategory."
      );
    }
  }
);

export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async (params, { rejectWithValue }) => {
    try {
      const response = await productApi.searchProducts(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to search products."
      );
    }
  }
);

export const fetchFeaturedProducts = createAsyncThunk(
  "products/fetchFeaturedProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await productApi.getFeaturedProducts();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch featured products."
      );
    }
  }
);

export const fetchNewArrivals = createAsyncThunk(
  "products/fetchNewArrivals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await productApi.getNewArrivals();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch new arrivals."
      );
    }
  }
);

export const fetchBestSellers = createAsyncThunk(
  "products/fetchBestSellers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await productApi.getBestSellers();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch best sellers."
      );
    }
  }
);

export const fetchNearbyProducts = createAsyncThunk(
  "products/fetchNearbyProducts",
  async (params, { rejectWithValue }) => {
    try {
      const response = await vendorProductApi.getNearbyVendorProducts(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch nearby products."
      );
    }
  }
);

export const fetchVendorProduct = createAsyncThunk(
  "products/fetchVendorProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await vendorProductApi.getVendorProductById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch vendor product."
      );
    }
  }
);

export const fetchNearbyProductsByCategory = createAsyncThunk(
  "products/fetchNearbyProductsByCategory",
  async ({ categoryId, locationParams }, { rejectWithValue }) => {
    try {
      const response = await vendorProductApi.getVendorProductsByCategory(
        categoryId,
        locationParams
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch nearby products by category."
      );
    }
  }
);

export const searchNearbyProducts = createAsyncThunk(
  "products/searchNearbyProducts",
  async ({ keyword, locationParams }, { rejectWithValue }) => {
    try {
      const response = await vendorProductApi.searchProductsByKeyword(
        keyword,
        locationParams
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to search nearby products."
      );
    }
  }
);

// Initial state
const initialState = {
  products: [],
  product: null,
  vendorProduct: null,
  featuredProducts: [],
  newArrivals: [],
  bestSellers: [],
  nearbyProducts: [],
  searchResults: [],
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20,
  },
  filters: {
    categoryId: null,
    subCategoryId: null,
    priceRange: { min: 0, max: 0 },
    rating: 0,
    sortBy: "popularity",
    sortOrder: "desc",
  },
};

// Product slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProductError: (state) => {
      state.error = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    setPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.pagination.itemsPerPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch all products
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.pagination = {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          totalItems: action.payload.totalItems,
          itemsPerPage: action.payload.itemsPerPage,
        };
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch products by category
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch products by subcategory
      .addCase(fetchProductsBySubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsBySubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchProductsBySubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Search products
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload.products;
        state.pagination = action.payload.pagination;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch featured products
      .addCase(fetchFeaturedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredProducts = action.payload;
      })
      .addCase(fetchFeaturedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch new arrivals
      .addCase(fetchNewArrivals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewArrivals.fulfilled, (state, action) => {
        state.loading = false;
        state.newArrivals = action.payload;
      })
      .addCase(fetchNewArrivals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch best sellers
      .addCase(fetchBestSellers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBestSellers.fulfilled, (state, action) => {
        state.loading = false;
        state.bestSellers = action.payload;
      })
      .addCase(fetchBestSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch nearby products
      .addCase(fetchNearbyProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNearbyProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.nearbyProducts = action.payload.products;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchNearbyProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch vendor product
      .addCase(fetchVendorProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendorProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.vendorProduct = action.payload;
      })
      .addCase(fetchVendorProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch nearby products by category
      .addCase(fetchNearbyProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNearbyProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.nearbyProducts = action.payload.products;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchNearbyProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Search nearby products
      .addCase(searchNearbyProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchNearbyProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.nearbyProducts = action.payload.products;
        state.pagination = action.payload.pagination;
      })
      .addCase(searchNearbyProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const {
  clearProductError,
  setFilters,
  resetFilters,
  setPage,
  setItemsPerPage,
} = productSlice.actions;

// Selectors
export const selectAllProducts = (state) => state.products.products;
export const selectProductDetails = (state) => state.products.product;
export const selectVendorProductDetails = (state) =>
  state.products.vendorProduct;
export const selectFeaturedProducts = (state) =>
  state.products.featuredProducts;
export const selectNewArrivals = (state) => state.products.newArrivals;
export const selectBestSellers = (state) => state.products.bestSellers;
export const selectNearbyProducts = (state) => state.products.nearbyProducts;
export const selectSearchResults = (state) => state.products.searchResults;
export const selectProductLoading = (state) => state.products.loading;
export const selectProductError = (state) => state.products.error;
export const selectProductPagination = (state) => state.products.pagination;
export const selectProductFilters = (state) => state.products.filters;

export default productSlice.reducer;

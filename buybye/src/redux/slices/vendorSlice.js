// src/redux/slices/vendorSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { vendorApi, customerApi } from "../../services/api";

// Async thunks
export const fetchNearbyVendors = createAsyncThunk(
  "vendors/fetchNearbyVendors",
  async (params, { rejectWithValue }) => {
    try {
      const response = await customerApi.getNearbyVendors(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch nearby vendors."
      );
    }
  }
);

export const fetchAllVendors = createAsyncThunk(
  "vendors/fetchAllVendors",
  async (params, { rejectWithValue }) => {
    try {
      const response = await vendorApi.getAllVendors(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch vendors."
      );
    }
  }
);

export const fetchVendorById = createAsyncThunk(
  "vendors/fetchVendorById",
  async (vendorId, { rejectWithValue }) => {
    try {
      const response = await vendorApi.getVendorById(vendorId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch vendor details."
      );
    }
  }
);

export const fetchVendorProducts = createAsyncThunk(
  "vendors/fetchVendorProducts",
  async ({ vendorId, params }, { rejectWithValue }) => {
    try {
      const response = await vendorApi.getVendorProducts(vendorId, params);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch vendor products."
      );
    }
  }
);

export const searchNearbyVendorsAndProducts = createAsyncThunk(
  "vendors/searchNearbyVendorsAndProducts",
  async (params, { rejectWithValue }) => {
    try {
      const response = await customerApi.searchNearbyVendorsAndProducts(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to search nearby vendors and products."
      );
    }
  }
);

export const comparePrices = createAsyncThunk(
  "vendors/comparePrices",
  async (params, { rejectWithValue }) => {
    try {
      const response = await customerApi.priceComparison(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to compare prices."
      );
    }
  }
);

// Initial state
const initialState = {
  vendors: [],
  nearbyVendors: [],
  selectedVendor: null,
  vendorProducts: [],
  searchResults: {
    vendors: [],
    products: [],
  },
  priceComparison: [],
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20,
  },
};

// Vendor slice
const vendorSlice = createSlice({
  name: "vendors",
  initialState,
  reducers: {
    clearVendorError: (state) => {
      state.error = null;
    },
    setVendorPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    setVendorItemsPerPage: (state, action) => {
      state.pagination.itemsPerPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch nearby vendors
    builder
      .addCase(fetchNearbyVendors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNearbyVendors.fulfilled, (state, action) => {
        state.loading = false;
        state.nearbyVendors = action.payload.vendors;
        state.pagination = action.payload.pagination || state.pagination;
      })
      .addCase(fetchNearbyVendors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch all vendors
      .addCase(fetchAllVendors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllVendors.fulfilled, (state, action) => {
        state.loading = false;
        state.vendors = action.payload.vendors;
        state.pagination = action.payload.pagination || state.pagination;
      })
      .addCase(fetchAllVendors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch vendor by ID
      .addCase(fetchVendorById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendorById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedVendor = action.payload;
      })
      .addCase(fetchVendorById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch vendor products
      .addCase(fetchVendorProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendorProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.vendorProducts = action.payload.products;
        state.pagination = action.payload.pagination || state.pagination;
      })
      .addCase(fetchVendorProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Search nearby vendors and products
      .addCase(searchNearbyVendorsAndProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchNearbyVendorsAndProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = {
          vendors: action.payload.vendors || [],
          products: action.payload.products || [],
        };
        state.pagination = action.payload.pagination || state.pagination;
      })
      .addCase(searchNearbyVendorsAndProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Compare prices
      .addCase(comparePrices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(comparePrices.fulfilled, (state, action) => {
        state.loading = false;
        state.priceComparison = action.payload;
      })
      .addCase(comparePrices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { clearVendorError, setVendorPage, setVendorItemsPerPage } =
  vendorSlice.actions;

// Selectors
export const selectAllVendors = (state) => state.vendors.vendors;
export const selectNearbyVendors = (state) => state.vendors.nearbyVendors;
export const selectSelectedVendor = (state) => state.vendors.selectedVendor;
export const selectVendorProducts = (state) => state.vendors.vendorProducts;
export const selectVendorSearchResults = (state) => state.vendors.searchResults;
export const selectPriceComparison = (state) => state.vendors.priceComparison;
export const selectVendorLoading = (state) => state.vendors.loading;
export const selectVendorError = (state) => state.vendors.error;
export const selectVendorPagination = (state) => state.vendors.pagination;

export default vendorSlice.reducer;

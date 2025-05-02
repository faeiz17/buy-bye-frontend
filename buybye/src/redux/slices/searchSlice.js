// src/redux/slices/searchSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchApi } from "../../services/api";

// Async thunks
export const globalSearch = createAsyncThunk(
  "search/globalSearch",
  async ({ query, params }, { rejectWithValue }) => {
    try {
      const response = await searchApi.globalSearch(query, params);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Search failed. Please try again."
      );
    }
  }
);

export const getAutocompleteSuggestions = createAsyncThunk(
  "search/getAutocompleteSuggestions",
  async (query, { rejectWithValue }) => {
    try {
      const response = await searchApi.autoComplete(query);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get suggestions."
      );
    }
  }
);

export const fetchSearchHistory = createAsyncThunk(
  "search/fetchSearchHistory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await searchApi.searchHistory();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch search history."
      );
    }
  }
);

export const clearSearchHistory = createAsyncThunk(
  "search/clearSearchHistory",
  async (_, { rejectWithValue }) => {
    try {
      await searchApi.clearSearchHistory();
      return true;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to clear search history."
      );
    }
  }
);

// Initial state
const initialState = {
  query: "",
  results: {
    products: [],
    vendors: [],
    categories: [],
  },
  suggestions: [],
  searchHistory: [],
  loading: false,
  suggestionsLoading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20,
  },
  filters: {
    category: null,
    priceRange: { min: 0, max: 0 },
    rating: 0,
    sortBy: "relevance",
    sortOrder: "desc",
  },
};

// Search slice
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },
    clearSearchQuery: (state) => {
      state.query = "";
    },
    clearSearchResults: (state) => {
      state.results = initialState.results;
    },
    clearSearchError: (state) => {
      state.error = null;
    },
    setSearchFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetSearchFilters: (state) => {
      state.filters = initialState.filters;
    },
    setSearchPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    addToSearchHistory: (state, action) => {
      // Add to the beginning and ensure no duplicates
      state.searchHistory = [
        action.payload,
        ...state.searchHistory.filter((item) => item !== action.payload),
      ].slice(0, 10); // Keep only the 10 most recent
    },
  },
  extraReducers: (builder) => {
    // Global search
    builder
      .addCase(globalSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(globalSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.results;
        state.pagination = action.payload.pagination || state.pagination;

        // Add to search history if not empty query
        if (state.query && state.query.trim()) {
          state.searchHistory = [
            state.query,
            ...state.searchHistory.filter((item) => item !== state.query),
          ].slice(0, 10);
        }
      })
      .addCase(globalSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get autocomplete suggestions
      .addCase(getAutocompleteSuggestions.pending, (state) => {
        state.suggestionsLoading = true;
      })
      .addCase(getAutocompleteSuggestions.fulfilled, (state, action) => {
        state.suggestionsLoading = false;
        state.suggestions = action.payload;
      })
      .addCase(getAutocompleteSuggestions.rejected, (state) => {
        state.suggestionsLoading = false;
        state.suggestions = [];
      })

      // Fetch search history
      .addCase(fetchSearchHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.searchHistory = action.payload;
      })
      .addCase(fetchSearchHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Clear search history
      .addCase(clearSearchHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearSearchHistory.fulfilled, (state) => {
        state.loading = false;
        state.searchHistory = [];
      })
      .addCase(clearSearchHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const {
  setSearchQuery,
  clearSearchQuery,
  clearSearchResults,
  clearSearchError,
  setSearchFilters,
  resetSearchFilters,
  setSearchPage,
  addToSearchHistory,
} = searchSlice.actions;

// Selectors
export const selectSearchQuery = (state) => state.search.query;
export const selectSearchResults = (state) => state.search.results;
export const selectSearchProductResults = (state) =>
  state.search.results.products;
export const selectSearchVendorResults = (state) =>
  state.search.results.vendors;
export const selectSearchCategoryResults = (state) =>
  state.search.results.categories;
export const selectSearchSuggestions = (state) => state.search.suggestions;
export const selectSearchHistory = (state) => state.search.searchHistory;
export const selectSearchLoading = (state) => state.search.loading;
export const selectSuggestionsLoading = (state) =>
  state.search.suggestionsLoading;
export const selectSearchError = (state) => state.search.error;
export const selectSearchPagination = (state) => state.search.pagination;
export const selectSearchFilters = (state) => state.search.filters;

export default searchSlice.reducer;

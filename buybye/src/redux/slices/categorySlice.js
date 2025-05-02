// src/redux/slices/categorySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { categoryApi } from '../../services/api';

// Async thunks
export const fetchAllCategories = createAsyncThunk(
  'categories/fetchAllCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await categoryApi.getAllCategories();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch categories.'
      );
    }
  }
);

export const fetchCategoryById = createAsyncThunk(
  'categories/fetchCategoryById',
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await categoryApi.getCategoryById(categoryId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch category details.'
      );
    }
  }
);

export const fetchAllSubCategories = createAsyncThunk(
  'categories/fetchAllSubCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await categoryApi.getAllSubCategories();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch subcategories.'
      );
    }
  }
);

export const fetchSubCategoriesByCategory = createAsyncThunk(
  'categories/fetchSubCategoriesByCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await categoryApi.getSubCategoriesByCategory(categoryId);
      return { categoryId, subCategories: response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch subcategories by category.'
      );
    }
  }
);

// Initial state
const initialState = {
  categories: [],
  selectedCategory: null,
  subCategories: [],
  subCategoriesByCategory: {},
  loading: false,
  error: null,
};

// Category slice
const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearCategoryError: (state) => {
      state.error = null;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch all categories
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch category by ID
      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCategory = action.payload;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch all subcategories
      .addCase(fetchAllSubCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSubCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategories = action.payload;
      })
      .addCase(fetchAllSubCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch subcategories by category
      .addCase(fetchSubCategoriesByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubCategoriesByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategoriesByCategory = {
          ...state.subCategoriesByCategory,
          [action.payload.categoryId]: action.payload.subCategories,
        };
      })
      .addCase(fetchSubCategoriesByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { clearCategoryError, setSelectedCategory } = categorySlice.actions;

// Selectors
export const selectAllCategories = (state) => state.categories.categories;
export const selectSelectedCategory = (state) => state.categories.selectedCategory;
export const selectAllSubCategories = (state) => state.categories.subCategories;
export const selectSubCategoriesByCategory = (state) => (categoryId) =>
  state.categories.subCategoriesByCategory[categoryId] || [];
export const selectCategoryLoading = (state) => state.categories.loading;
export const selectCategoryError = (state) => state.categories.error;

export default categorySlice.reducer;
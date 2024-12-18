import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productListViewServiceFunc } from "@/services/products/productService";
import { productCategoriesServiceFunc } from "@/services/products/productService";
import { getFeatureProductsServiceFunc } from "@/services/products/productService";
const initialState = {
  products: [],
  loading: false,
  error: null,
  success: false,
  productCategories: [],
  featureProducts: [],
};

export const getProductsList = createAsyncThunk(
  "products/getProductsList",
  productListViewServiceFunc
);

export const getProductCategories = createAsyncThunk(
  "products/getProductCategories",
  productCategoriesServiceFunc
);

export const getFeaturedProducts = createAsyncThunk(
  "products/getFeaturedProducts",
  getFeatureProductsServiceFunc
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsList.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getProductsList.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.products = action.payload;
      })
      .addCase(getProductsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.success = false;
      })
      .addCase(getProductCategories.pending, (state) => {
        debugger;
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getProductCategories.fulfilled, (state, action) => {
        debugger;
        state.loading = false;
        state.success = true;
        console.log(action.payload);
        state.productCategories = action.payload;
      })
      .addCase(getProductCategories.rejected, (state, action) => {
        debugger;
        state.loading = false;
        state.error = action.error;
        state.success = false;
      })
      .addCase(getFeaturedProducts.pending, (state) => {
        debugger;
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getFeaturedProducts.fulfilled, (state, action) => {
        debugger;
        state.loading = false;
        state.success = true;
        state.featureProducts = action.payload;
      })
      .addCase(getFeaturedProducts.rejected, (state, action) => {
        debugger;
        state.loading = false;
        state.error = action.error;
        state.success = false;
      });
  },
});

export default productSlice.reducer;

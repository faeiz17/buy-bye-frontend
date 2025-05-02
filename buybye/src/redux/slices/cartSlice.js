// src/redux/slices/cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cartApi } from "../../services/api";

// Async thunks
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartApi.getCart();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart."
      );
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ vendorProductId, quantity = 1 }, { rejectWithValue }) => {
    try {
      const response = await cartApi.addToCart(vendorProductId, quantity);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add item to cart."
      );
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ vendorProductId, quantity }, { rejectWithValue }) => {
    try {
      const response = await cartApi.updateCartItem(vendorProductId, quantity);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update cart item."
      );
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (vendorProductId, { rejectWithValue }) => {
    try {
      await cartApi.removeCartItem(vendorProductId);
      return vendorProductId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove cart item."
      );
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      await cartApi.clearCart();
      return true;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to clear cart."
      );
    }
  }
);

export const saveForLater = createAsyncThunk(
  "cart/saveForLater",
  async (vendorProductId, { rejectWithValue }) => {
    try {
      const response = await cartApi.saveForLater(vendorProductId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to save item for later."
      );
    }
  }
);

export const getSavedItems = createAsyncThunk(
  "cart/getSavedItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartApi.getSavedItems();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch saved items."
      );
    }
  }
);

export const moveToCart = createAsyncThunk(
  "cart/moveToCart",
  async (savedItemId, { rejectWithValue }) => {
    try {
      const response = await cartApi.moveToCart(savedItemId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to move item to cart."
      );
    }
  }
);

// Initial state
const initialState = {
  items: [],
  savedItems: [],
  subtotal: 0,
  total: 0,
  tax: 0,
  shipping: 0,
  discount: 0,
  loading: false,
  error: null,
  lastUpdated: null,
  itemCount: 0,
};

// Calculate cart totals helper function
const calculateCartTotals = (cartItems) => {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  // Simple calculation - can be customized based on your business logic
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 0 ? 5 : 0; // $5 shipping fee if cart has items
  const discount = 0; // Placeholder for discount logic
  const total = subtotal + tax + shipping - discount;
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return { subtotal, tax, shipping, discount, total, itemCount };
};

// Cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCartError: (state) => {
      state.error = null;
    },
    applyCoupon: (state, action) => {
      state.discount = action.payload.discountAmount;
      state.total =
        state.subtotal + state.tax + state.shipping - state.discount;
    },
    // This can be used for a quick client-side calculation when changing quantity
    // before sending the update to the server
    updateCartTotals: (state) => {
      const { subtotal, tax, shipping, discount, total, itemCount } =
        calculateCartTotals(state.items);
      state.subtotal = subtotal;
      state.tax = tax;
      state.shipping = shipping;
      state.discount = discount;
      state.total = total;
      state.itemCount = itemCount;
    },
  },
  extraReducers: (builder) => {
    // Fetch cart
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.subtotal = action.payload.subtotal;
        state.tax = action.payload.tax;
        state.shipping = action.payload.shipping;
        state.discount = action.payload.discount;
        state.total = action.payload.total;
        state.itemCount = action.payload.items.reduce(
          (count, item) => count + item.quantity,
          0
        );
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.subtotal = action.payload.subtotal;
        state.tax = action.payload.tax;
        state.shipping = action.payload.shipping;
        state.discount = action.payload.discount;
        state.total = action.payload.total;
        state.itemCount = action.payload.items.reduce(
          (count, item) => count + item.quantity,
          0
        );
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update cart item
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.subtotal = action.payload.subtotal;
        state.tax = action.payload.tax;
        state.shipping = action.payload.shipping;
        state.discount = action.payload.discount;
        state.total = action.payload.total;
        state.itemCount = action.payload.items.reduce(
          (count, item) => count + item.quantity,
          0
        );
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Remove cart item
      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.loading = false;
        // Filter out the removed item
        state.items = state.items.filter(
          (item) => item.vendorProductId !== action.payload
        );
        // Recalculate cart totals
        const { subtotal, tax, shipping, discount, total, itemCount } =
          calculateCartTotals(state.items);
        state.subtotal = subtotal;
        state.tax = tax;
        state.shipping = shipping;
        state.discount = discount;
        state.total = total;
        state.itemCount = itemCount;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Clear cart
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
        state.subtotal = 0;
        state.tax = 0;
        state.shipping = 0;
        state.discount = 0;
        state.total = 0;
        state.itemCount = 0;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Save for later
      .addCase(saveForLater.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveForLater.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the item from cart items and add to saved items
        const itemToSave = state.items.find(
          (item) => item.vendorProductId === action.payload.vendorProductId
        );

        if (itemToSave) {
          state.items = state.items.filter(
            (item) => item.vendorProductId !== action.payload.vendorProductId
          );
          state.savedItems = [...state.savedItems, action.payload];

          // Recalculate cart totals
          const { subtotal, tax, shipping, discount, total, itemCount } =
            calculateCartTotals(state.items);
          state.subtotal = subtotal;
          state.tax = tax;
          state.shipping = shipping;
          state.discount = discount;
          state.total = total;
          state.itemCount = itemCount;
        }

        state.lastUpdated = new Date().toISOString();
      })
      .addCase(saveForLater.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get saved items
      .addCase(getSavedItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSavedItems.fulfilled, (state, action) => {
        state.loading = false;
        state.savedItems = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(getSavedItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Move to cart
      .addCase(moveToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(moveToCart.fulfilled, (state, action) => {
        state.loading = false;

        // Remove from saved items and add to cart
        state.savedItems = state.savedItems.filter(
          (item) => item.id !== action.payload.savedItemId
        );

        state.items = action.payload.items;
        state.subtotal = action.payload.subtotal;
        state.tax = action.payload.tax;
        state.shipping = action.payload.shipping;
        state.discount = action.payload.discount;
        state.total = action.payload.total;
        state.itemCount = action.payload.items.reduce(
          (count, item) => count + item.quantity,
          0
        );

        state.lastUpdated = new Date().toISOString();
      })
      .addCase(moveToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { clearCartError, applyCoupon, updateCartTotals } =
  cartSlice.actions;

// Selectors
export const selectCart = (state) => state.cart;
export const selectCartItems = (state) => state.cart.items;
export const selectSavedItems = (state) => state.cart.savedItems;
export const selectCartTotal = (state) => state.cart.total;
export const selectCartSubtotal = (state) => state.cart.subtotal;
export const selectCartTax = (state) => state.cart.tax;
export const selectCartShipping = (state) => state.cart.shipping;
export const selectCartDiscount = (state) => state.cart.discount;
export const selectCartItemCount = (state) => state.cart.itemCount;
export const selectCartLoading = (state) => state.cart.loading;
export const selectCartError = (state) => state.cart.error;

export default cartSlice.reducer;

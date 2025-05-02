// src/redux/slices/orderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { orderApi } from "../../services/api";

// Async thunks
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await orderApi.createOrder(orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create order."
      );
    }
  }
);

export const createDirectOrder = createAsyncThunk(
  "orders/createDirectOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await orderApi.createDirectOrder(orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create direct order."
      );
    }
  }
);

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (params, { rejectWithValue }) => {
    try {
      const response = await orderApi.getOrders(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders."
      );
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  "orders/fetchOrderById",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await orderApi.getOrderById(orderId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch order details."
      );
    }
  }
);

export const cancelOrder = createAsyncThunk(
  "orders/cancelOrder",
  async ({ orderId, reason }, { rejectWithValue }) => {
    try {
      const response = await orderApi.cancelOrder(orderId, reason);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to cancel order."
      );
    }
  }
);

export const trackOrder = createAsyncThunk(
  "orders/trackOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await orderApi.getOrderTracking(orderId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to track order."
      );
    }
  }
);

export const rateOrder = createAsyncThunk(
  "orders/rateOrder",
  async ({ orderId, rating, review }, { rejectWithValue }) => {
    try {
      const response = await orderApi.rateOrder(orderId, rating, review);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to rate order."
      );
    }
  }
);

export const reorder = createAsyncThunk(
  "orders/reorder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await orderApi.reorder(orderId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to reorder."
      );
    }
  }
);

// Initial state
const initialState = {
  orders: [],
  currentOrder: null,
  trackingInfo: null,
  loading: false,
  error: null,
  success: false,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  },
  orderStatuses: {
    pending: "PENDING",
    confirmed: "CONFIRMED",
    preparing: "PREPARING",
    readyForPickup: "READY_FOR_PICKUP",
    outForDelivery: "OUT_FOR_DELIVERY",
    delivered: "DELIVERED",
    completed: "COMPLETED",
    cancelled: "CANCELLED",
  },
  filters: {
    status: null,
    startDate: null,
    endDate: null,
    sortBy: "createdAt",
    sortOrder: "desc",
  },
};

// Order slice
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrderError: (state) => {
      state.error = null;
    },
    clearOrderSuccess: (state) => {
      state.success = false;
    },
    setOrderPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    setOrderItemsPerPage: (state, action) => {
      state.pagination.itemsPerPage = action.payload;
    },
    setOrderFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetOrderFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    // Create order
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
        state.success = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Create direct order
      .addCase(createDirectOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createDirectOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
        state.success = true;
      })
      .addCase(createDirectOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Fetch orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.pagination = action.payload.pagination || state.pagination;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch order by ID
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Cancel order
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
        state.success = true;

        // Update the order in the orders list
        const orderIndex = state.orders.findIndex(
          (order) => order.id === action.payload.id
        );
        if (orderIndex !== -1) {
          state.orders[orderIndex] = action.payload;
        }
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Track order
      .addCase(trackOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(trackOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.trackingInfo = action.payload;
      })
      .addCase(trackOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Rate order
      .addCase(rateOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(rateOrder.fulfilled, (state, action) => {
        state.loading = false;

        // Update the order in the orders list
        const orderIndex = state.orders.findIndex(
          (order) => order.id === action.payload.id
        );
        if (orderIndex !== -1) {
          state.orders[orderIndex] = action.payload;
        }

        // Update current order if it matches
        if (state.currentOrder && state.currentOrder.id === action.payload.id) {
          state.currentOrder = action.payload;
        }

        state.success = true;
      })
      .addCase(rateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Reorder
      .addCase(reorder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(reorder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
        state.success = true;
      })
      .addCase(reorder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

// Export actions and reducer
export const {
  clearOrderError,
  clearOrderSuccess,
  setOrderPage,
  setOrderItemsPerPage,
  setOrderFilters,
  resetOrderFilters,
} = orderSlice.actions;

// Selectors
export const selectAllOrders = (state) => state.orders.orders;
export const selectCurrentOrder = (state) => state.orders.currentOrder;
export const selectTrackingInfo = (state) => state.orders.trackingInfo;
export const selectOrderLoading = (state) => state.orders.loading;
export const selectOrderError = (state) => state.orders.error;
export const selectOrderSuccess = (state) => state.orders.success;
export const selectOrderPagination = (state) => state.orders.pagination;
export const selectOrderFilters = (state) => state.orders.filters;
export const selectOrderStatuses = (state) => state.orders.orderStatuses;

export default orderSlice.reducer;

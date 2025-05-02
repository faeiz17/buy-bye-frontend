// src/redux/slices/locationSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { customerApi } from "../../services/api";

// Async thunks
export const updateUserLocation = createAsyncThunk(
  "location/updateUserLocation",
  async (locationData, { rejectWithValue }) => {
    try {
      const response = await customerApi.updateLocation(locationData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update location."
      );
    }
  }
);

// Helper function to get current geolocation
export const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }
  });
};

// Async thunk to get and update location
export const detectAndUpdateLocation = createAsyncThunk(
  "location/detectAndUpdateLocation",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const position = await getCurrentPosition();

      // Update the location on the server
      dispatch(updateUserLocation(position));

      return position;
    } catch (error) {
      return rejectWithValue(
        error.message ||
          "Failed to detect location. Please enable location services."
      );
    }
  }
);

// Initial state
const initialState = {
  latitude: null,
  longitude: null,
  address: null,
  city: null,
  state: null,
  country: null,
  postalCode: null,
  loading: false,
  error: null,
  permissionStatus: "not_asked", // 'not_asked', 'granted', 'denied', 'unavailable'
  radius: 5, // Default radius in kilometers/miles
};

// Location slice
const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    clearLocationError: (state) => {
      state.error = null;
    },
    setManualLocation: (state, action) => {
      return { ...state, ...action.payload, loading: false, error: null };
    },
    setLocationPermissionStatus: (state, action) => {
      state.permissionStatus = action.payload;
    },
    setSearchRadius: (state, action) => {
      state.radius = action.payload;
    },
    resetLocation: () => initialState,
  },
  extraReducers: (builder) => {
    // Update user location
    builder
      .addCase(updateUserLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserLocation.fulfilled, (state, action) => {
        state.loading = false;

        // Update location data
        state.latitude = action.payload.latitude;
        state.longitude = action.payload.longitude;
        state.address = action.payload.address;
        state.city = action.payload.city;
        state.state = action.payload.state;
        state.country = action.payload.country;
        state.postalCode = action.payload.postalCode;
      })
      .addCase(updateUserLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Detect and update location
      .addCase(detectAndUpdateLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(detectAndUpdateLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.latitude = action.payload.latitude;
        state.longitude = action.payload.longitude;
        state.permissionStatus = "granted";
      })
      .addCase(detectAndUpdateLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.permissionStatus = "denied";
      });
  },
});

// Export actions and reducer
export const {
  clearLocationError,
  setManualLocation,
  setLocationPermissionStatus,
  setSearchRadius,
  resetLocation,
} = locationSlice.actions;

// Selectors
export const selectLocation = (state) => state.location;
export const selectCoordinates = (state) => ({
  latitude: state.location.latitude,
  longitude: state.location.longitude,
});
export const selectLocationLoading = (state) => state.location.loading;
export const selectLocationError = (state) => state.location.error;
export const selectLocationPermissionStatus = (state) =>
  state.location.permissionStatus;
export const selectSearchRadius = (state) => state.location.radius;

// Export helper function to check if location is available
export const selectIsLocationAvailable = (state) =>
  state.location.latitude !== null && state.location.longitude !== null;

// Export helper function to get location parameters for API requests
export const getLocationParams = (state) => {
  const { latitude, longitude, radius } = state.location;
  return { latitude, longitude, radius };
};

export default locationSlice.reducer;

import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { customerApi } from '../services/api';
import { useAuth } from './AuthContext';

const LocationContext = createContext();

export const useLocation = () => useContext(LocationContext);

export const LocationProvider = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [locationPermission, setLocationPermission] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // Request permission and get location
  const requestLocationPermission = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by this browser');
        return;
      }

      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        });
      });

      setLocationPermission('granted');
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });

      // Get address from coordinates using reverse geocoding
      await getAddressFromCoordinates(latitude, longitude);

      // Update server if user is logged in
      if (isLoggedIn) {
        await updateServerLocation({ lat: latitude, lng: longitude });
      }
    } catch (err) {
      setError('Location permission denied or error getting location');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Get address from coordinates using reverse geocoding
  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      
      if (data.results && data.results[0]) {
        const formattedAddress = data.results[0].formatted_address;
        setAddress(formattedAddress);
      }
    } catch (err) {
      console.error('Error getting address:', err);
      // Fallback to coordinates if geocoding fails
      setAddress(`${latitude}, ${longitude}`);
    }
  };

  // Get current location
  const getCurrentLocation = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by this browser');
        return;
      }

      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        });
      });

      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });

      // Get address from coordinates
      await getAddressFromCoordinates(latitude, longitude);

      // Update server if user is logged in
      if (isLoggedIn) {
        await updateServerLocation({ lat: latitude, lng: longitude });
      }
    } catch (err) {
      setError('Error getting current location');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Update location on server
  const updateServerLocation = async (coordinates) => {
    try {
      await customerApi.updateLocation(coordinates);
    } catch (err) {
      console.error('Error updating server location:', err);
      // Don't set error state here to avoid bothering the user
    }
  };

  // Set manual address
  const setManualAddress = async (addressString) => {
    setIsLoading(true);
    setError(null);

    try {
      // Use geocoding to get coordinates from address
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(addressString)}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();

      if (data.results && data.results[0]) {
        const { lat, lng } = data.results[0].geometry.location;
        setLocation({ latitude: lat, longitude: lng });
        setAddress(addressString);

        // Update server if user is logged in
        if (isLoggedIn) {
          await updateServerLocation({
            lat,
            lng,
            address: addressString,
          });
        }
      } else {
        setError('Could not find coordinates for this address');
      }
    } catch (err) {
      setError('Error geocoding address');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize on mount - automatically request permission and get location
  useEffect(() => {
    (async () => {
      try {
        // Check if geolocation is supported
        if (!navigator.geolocation) {
          setError('Geolocation is not supported by this browser');
          return;
        }

        // Check current permission status
        const permission = await navigator.permissions.query({ name: 'geolocation' });
        setLocationPermission(permission.state);

        if (permission.state === 'granted') {
          // Permission already granted, get location
          await getCurrentLocation();
        } else {
          // Permission not granted, request it immediately
          await requestLocationPermission();
        }
      } catch (error) {
        console.error('Error initializing location:', error);
        setError('Error initializing location services');
      }
    })();
  }, []);

  // Update server location when auth status changes
  useEffect(() => {
    if (isLoggedIn && location) {
      updateServerLocation({
        lat: location.latitude,
        lng: location.longitude,
      });
    }
  }, [isLoggedIn]);

  const value = {
    location,
    address,
    locationPermission,
    isLoading,
    error,
    requestLocationPermission,
    getCurrentLocation,
    setManualAddress,
    // Helper for API calls that need location params
    getLocationParams: () =>
      location
        ? {
            lat: location.latitude,
            lng: location.longitude,
            radius: 50, // 50km radius for nearby products
          }
        : null,
    
    // Enhanced helper function for API calls with additional options
    getLocationAndSearchParams: (options = {}) => {
      const params = {};
      
      if (location) {
        params.lat = location.latitude;
        params.lng = location.longitude;
      }
      
      // Add radius if specified, otherwise use default 50km
      params.radius = options.radius || 50;
      
      // Add category and subcategory if specified
      if (options.categoryId) {
        params.categoryId = options.categoryId;
      }
      
      if (options.subCategoryId) {
        params.subCategoryId = options.subCategoryId;
      }
      
      // Add search term if specified
      if (options.searchTerm) {
        params.searchTerm = options.searchTerm;
      }
      
      // Add sort option if specified
      if (options.sortBy) {
        params.sortBy = options.sortBy;
      }
      
      return params;
    },
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

LocationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LocationContext; 
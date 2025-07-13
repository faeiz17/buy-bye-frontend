import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { orderApi } from '../services/api';
import { useAuth } from './AuthContext';

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch orders from server
  const fetchOrders = useCallback(async (params = {}) => {
    if (!isLoggedIn) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await orderApi.getOrders(params);
      setOrders(response.data.orders || response.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to fetch orders. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [isLoggedIn]);

  // Get order by ID
  const getOrderById = useCallback(async (orderId) => {
    if (!isLoggedIn) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await orderApi.getOrderById(orderId);
      setCurrentOrder(response.data);
      return response.data;
    } catch (err) {
      console.error('OrderContext: Error fetching order:', err);
      setError('Failed to fetch order details. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [isLoggedIn]);

  // Create new order
  const createOrder = async (orderData) => {
    if (!isLoggedIn) {
      throw new Error('Please login to create an order');
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await orderApi.createOrder(orderData);
      
      // Add new order to list
      setOrders(prevOrders => [response.data, ...prevOrders]);
      
      return response.data;
    } catch (err) {
      console.error('Error creating order:', err);
      setError('Failed to create order. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Create direct order (without cart)
  const createDirectOrder = async (orderData) => {
    if (!isLoggedIn) {
      throw new Error('Please login to create an order');
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await orderApi.createDirectOrder(orderData);
      
      // Add new order to list
      setOrders(prevOrders => [response.data, ...prevOrders]);
      
      return response.data;
    } catch (err) {
      console.error('Error creating direct order:', err);
      setError('Failed to create order. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Cancel order
  const cancelOrder = async (orderId, reason) => {
    if (!isLoggedIn) {
      throw new Error('Please login to cancel an order');
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await orderApi.cancelOrder(orderId, reason);
      
      // Update order in list
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? { ...order, status: 'cancelled' } : order
        )
      );
      
      // Update current order if it's the one being cancelled
      if (currentOrder && currentOrder._id === orderId) {
        setCurrentOrder({ ...currentOrder, status: 'cancelled' });
      }
      
      return response.data;
    } catch (err) {
      console.error('Error cancelling order:', err);
      setError('Failed to cancel order. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Get order tracking
  const getOrderTracking = async (orderId) => {
    if (!isLoggedIn) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await orderApi.getOrderTracking(orderId);
      return response.data;
    } catch (err) {
      console.error('Error fetching order tracking:', err);
      setError('Failed to fetch order tracking. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Clear current order
  const clearCurrentOrder = () => {
    setCurrentOrder(null);
  };

  // Get orders by status
  const getOrdersByStatus = (status) => {
    return orders.filter(order => order.status === status);
  };

  // Get order statistics
  const getOrderStats = () => {
    const total = orders.length;
    const pending = orders.filter(order => order.status === 'pending').length;
    const confirmed = orders.filter(order => order.status === 'confirmed').length;
    const shipped = orders.filter(order => order.status === 'shipped').length;
    const delivered = orders.filter(order => order.status === 'delivered').length;
    const cancelled = orders.filter(order => order.status === 'cancelled').length;

    return {
      total,
      pending,
      confirmed,
      shipped,
      delivered,
      cancelled,
    };
  };

  // Fetch orders when user logs in
  useEffect(() => {
    if (isLoggedIn) {
      fetchOrders();
    } else {
      setOrders([]);
      setCurrentOrder(null);
    }
  }, [isLoggedIn, fetchOrders]);

  const value = {
    orders,
    currentOrder,
    isLoading,
    error,
    fetchOrders,
    getOrderById,
    createOrder,
    createDirectOrder,
    cancelOrder,
    getOrderTracking,
    clearCurrentOrder,
    getOrdersByStatus,
    getOrderStats,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

OrderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default OrderContext; 
import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { cartApi } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch cart from server
  const fetchCart = async () => {
    if (!isLoggedIn) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await cartApi.getCart();

      // Transform server response to match local cart structure
      const formattedItems = response.data.items.map((item) => {
        const vendorProduct = item.vendorProduct;
        const basePrice = extractPrice(vendorProduct.product.price);
        
        // Calculate discounted price
        let finalPrice = basePrice;
        if (vendorProduct.discountType && vendorProduct.discountValue) {
          if (vendorProduct.discountType === "percentage") {
            finalPrice = basePrice * (1 - vendorProduct.discountValue / 100);
          } else if (vendorProduct.discountType === "amount") {
            finalPrice = Math.max(0, basePrice - vendorProduct.discountValue);
          }
        }
        
        finalPrice = parseFloat(finalPrice.toFixed(2));
        
        return {
          id: vendorProduct._id,
          productId: vendorProduct.product._id,
          name: vendorProduct.product.title,
          price: basePrice,
          originalPrice: basePrice,
          finalPrice: finalPrice,
          discountType: vendorProduct.discountType,
          discountValue: vendorProduct.discountValue,
          image: vendorProduct.product.imageUrl,
          quantity: item.quantity,
          vendor: {
            id: vendorProduct.vendor._id,
            name: vendorProduct.vendor.name,
            location: vendorProduct.vendor.location,
            distance: calculateDistance(vendorProduct.vendor.location),
          },
          category: vendorProduct.product.category?.name || '',
          subCategory: vendorProduct.product.subCategory?.name || '',
          // Preserve the full vendorProduct structure for recipe functionality
          vendorProduct: vendorProduct,
        };
      });
      setCartItems(formattedItems);
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError('Failed to fetch cart. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Extract numeric price from string (e.g., "Rs. 825" -> 825)
  const extractPrice = (ps) => {
    if (!ps) return 0;
    if (typeof ps === 'number') return ps;
    const m = String(ps).match(/[\d,]+/);
    return m ? parseInt(m[0].replace(/,/g, ''), 10) : 0;
  };

  // Placeholder for distance calculation - would use actual coordinates
  const calculateDistance = (location) => {
    return location?.formattedAddress ? '~1.2 km away' : 'Unknown distance';
  };

  // Calculate final price with discount
  const calculateFinalPrice = (basePrice, discountType, discountValue) => {
    if (!discountType || !discountValue) return basePrice;
    
    if (discountType === 'percentage') {
      return basePrice * (1 - discountValue / 100);
    } else if (discountType === 'amount') {
      return Math.max(0, basePrice - discountValue);
    }
    
    return basePrice;
  };

  // Add item to cart
  const addToCart = async (vendorProduct) => {
    if (!isLoggedIn) {
      throw new Error('Please login to add items to cart');
    }

    setIsLoading(true);
    setError(null);

    try {
      // Add to server
      await cartApi.addToCart(vendorProduct._id, 1);

      // Update local state using functional update to ensure we have the latest state
      setCartItems(prevCartItems => {
        const existingItemIndex = prevCartItems.findIndex(
          (item) => item.id === vendorProduct._id
        );

        if (existingItemIndex !== -1) {
          // Item exists, update quantity
          const updatedItems = [...prevCartItems];
          updatedItems[existingItemIndex].quantity += 1;
          return updatedItems;
        } else {
          // New item with discount info
          const newItem = {
            id: vendorProduct._id,
            productId: vendorProduct.product?._id || vendorProduct.productId,
            name: vendorProduct.product?.title || vendorProduct.name,
            price: extractPrice(vendorProduct.product?.price || vendorProduct.price),
            originalPrice: extractPrice(vendorProduct.product?.price || vendorProduct.price),
            discountType: vendorProduct.discountType,
            discountValue: vendorProduct.discountValue,
            finalPrice: calculateFinalPrice(
              extractPrice(vendorProduct.product?.price || vendorProduct.price),
              vendorProduct.discountType,
              vendorProduct.discountValue
            ),
            image: vendorProduct.product?.imageUrl || vendorProduct.image,
            quantity: 1,
            vendor: {
              id: vendorProduct.vendor?._id || vendorProduct.vendor?.id,
              name: vendorProduct.vendor?.name || 'Unknown Vendor'
            },
            category: vendorProduct.product?.category?.name || vendorProduct.category || '',
            subCategory: vendorProduct.product?.subCategory?.name || vendorProduct.subCategory || ''
          };
          return [...prevCartItems, newItem];
        }
      });

      return true;
    } catch (err) {
      console.error('Error adding to cart:', err);
      setError('Failed to add item to cart. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Update item quantity
  const updateQuantity = async (itemId, quantity) => {
    if (quantity < 1) {
      return removeFromCart(itemId);
    }

    if (!isLoggedIn) {
      throw new Error('Please login to update cart');
    }

    setIsLoading(true);
    setError(null);

    try {
      // Update on server
      await cartApi.updateCartItem(itemId, quantity);

      // Update local state using functional update to ensure we have the latest state
      setCartItems(prevCartItems => 
        prevCartItems.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    } catch (err) {
      console.error('Error updating cart:', err);
      setError('Failed to update cart. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    if (!isLoggedIn) {
      throw new Error('Please login to remove items from cart');
    }

    setIsLoading(true);
    setError(null);

    try {
      // Remove from server
      await cartApi.removeCartItem(itemId);

      // Update local state using functional update to ensure we have the latest state
      setCartItems(prevCartItems => prevCartItems.filter((item) => item.id !== itemId));
    } catch (err) {
      console.error('Error removing from cart:', err);
      setError('Failed to remove item from cart. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Clear cart
  const clearCart = async () => {
    if (!isLoggedIn) {
      throw new Error('Please login to clear cart');
    }

    setIsLoading(true);
    setError(null);

    try {
      // Clear on server
      await cartApi.clearCart();

      // Clear local state
      setCartItems([]);
    } catch (err) {
      console.error('Error clearing cart:', err);
      setError('Failed to clear cart. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate cart total
  const getCartTotal = () =>
    cartItems.reduce((sum, item) => sum + item.finalPrice * item.quantity, 0);

  // Get cart count
  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  // Fetch cart when user logs in
  useEffect(() => {
    if (isLoggedIn) {
      fetchCart();
    } else {
      setCartItems([]);
    }
  }, [isLoggedIn]);

  const value = {
    cartItems,
    isLoading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
    fetchCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartContext; 
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify"; // Assuming react-toastify is installed

// Create context with a default value
const CartContext = createContext(undefined);

// Provider component
export const CartProvider = ({ children }) => {
  // Load cart from local storage on initial render
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /**
   * Add a product to the cart with specified quantity
   * @param {Object} product - Product to add
   * @param {number} quantityToAdd - Quantity to add (defaults to 1)
   * @param {number} maxStock - Maximum stock available
   */
  const addToCart = (product, quantityToAdd = 1, maxStock = null) => {
    // Validate stock if maxStock is provided
    const availableStock = maxStock !== null ? maxStock : product.stock_quantity;
    
    if (availableStock <= 0) {
      toast.error("Sorry, this product is out of stock!");
      return false;
    }

    setCart((currentCart) => {
      // Check if product already exists in cart
      const existingItemIndex = currentCart.findIndex((item) => item.id === product.id);
      
      if (existingItemIndex !== -1) {
        // Product already in cart - update quantity
        const existingItem = currentCart[existingItemIndex];
        const newQuantity = existingItem.quantity + quantityToAdd;
        
        // Check against available stock
        if (newQuantity > availableStock) {
          toast.warning(`Only ${availableStock} items available. Adjusted quantity to maximum available.`);
          
          // Create a new array with updated item
          const updatedCart = [...currentCart];
          updatedCart[existingItemIndex] = { 
            ...existingItem, 
            quantity: availableStock 
          };
          
          return updatedCart;
        } else {
          // Create a new array with updated item
          const updatedCart = [...currentCart];
          updatedCart[existingItemIndex] = { 
            ...existingItem, 
            quantity: newQuantity 
          };
          
          toast.success(`Added ${quantityToAdd} more ${product.name} to your cart`);
          return updatedCart;
        }
      } else {
        // New product - add to cart with validation
        const qtyToAdd = Math.min(quantityToAdd, availableStock);
        
        if (qtyToAdd < quantityToAdd) {
          toast.warning(`Only ${availableStock} items available. Added maximum quantity.`);
        } else {
          toast.success(`Added ${product.name} to your cart`);
        }
        
        // Add new item to cart
        return [...currentCart, { 
          ...product, 
          quantity: qtyToAdd 
        }];
      }
    });
    
    return true;
  };

  /**
   * Remove a product from the cart
   * @param {number} id - Product ID to remove
   */
  const removeFromCart = (id) => {
    setCart((currentCart) => {
      const removedItem = currentCart.find(item => item.id === id);
      if (removedItem) {
        toast.info(`Removed ${removedItem.name} from your cart`);
      }
      return currentCart.filter((item) => item.id !== id);
    });
  };

  /**
   * Update quantity of a product in the cart
   * @param {number} id - Product ID to update
   * @param {number} quantity - New quantity
   * @param {number} maxStock - Maximum stock available
   */
  const updateQuantity = (id, quantity, maxStock = null) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCart((currentCart) => {
      const itemIndex = currentCart.findIndex(item => item.id === id);
      
      if (itemIndex === -1) return currentCart;
      
      const item = currentCart[itemIndex];
      const availableStock = maxStock !== null ? maxStock : item.stock_quantity;
      
      // Check against available stock
      if (quantity > availableStock) {
        toast.warning(`Only ${availableStock} items available. Adjusted quantity to maximum.`);
        quantity = availableStock;
      }
      
      // Create a new array with updated item
      const updatedCart = [...currentCart];
      updatedCart[itemIndex] = { ...item, quantity };
      
      return updatedCart;
    });
  };

  /**
   * Clear all items from the cart
   */
  const clearCart = () => {
    setCart([]);
    toast.info("Your cart has been cleared");
  };

  /**
   * Get the total number of items in the cart
   * @returns {number}
   */
  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };
  
  /**
   * Get the total cost of items in the cart
   * @returns {number}
   */
  const getCartSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  /**
   * Check if a product is already in the cart
   * @param {number} id - Product ID to check
   * @returns {boolean}
   */
  const isInCart = (id) => {
    return cart.some(item => item.id === id);
  };

  return (
    <CartContext.Provider
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart,
        getCartItemCount,
        getCartSubtotal,
        isInCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for using the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

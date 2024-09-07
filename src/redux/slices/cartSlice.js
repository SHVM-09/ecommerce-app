// redux/slices/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

/**
 * Load the cart state from localStorage. If no cart data exists, return the initial empty state.
 * @returns {Object} Cart state object
 */
const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem("cart");
  return savedCart
    ? JSON.parse(savedCart)
    : { items: [], totalQuantity: 0, totalPrice: 0 };
};

/**
 * Save the current cart state to localStorage.
 * @param {Object} state - The cart state to save
 */
const saveCartToLocalStorage = (state) => {
  localStorage.setItem("cart", JSON.stringify(state));
};

// Initial state of the cart
const initialState = loadCartFromLocalStorage();

// Create a slice of the Redux store for cart management
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /**
     * Add a product to the cart. If the product already exists, increase its quantity.
     * @param {Object} state - The current cart state
     * @param {Object} action - The action object containing the product to add
     */
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalQuantity += 1;
      state.totalPrice += action.payload.price;
      saveCartToLocalStorage(state);
    },

    /**
     * Remove a product from the cart by its ID.
     * @param {Object} state - The current cart state
     * @param {Object} action - The action object containing the product ID to remove
     */
    removeFromCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (existingItem) {
        state.totalPrice -= existingItem.price * existingItem.quantity;
        state.totalQuantity -= existingItem.quantity;
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id,
        );
        saveCartToLocalStorage(state);
      }
    },

    /**
     * Adjust the quantity of a product in the cart.
     * @param {Object} state - The current cart state
     * @param {Object} action - The action object containing the product ID and new quantity
     */
    adjustQuantity: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (existingItem) {
        const difference = action.payload.quantity - existingItem.quantity;
        state.totalQuantity += difference;
        state.totalPrice += difference * existingItem.price;
        existingItem.quantity = action.payload.quantity;
        saveCartToLocalStorage(state);
      }
    },

    /**
     * Clear all items from the cart.
     * @param {Object} state - The current cart state
     */
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      saveCartToLocalStorage(state);
    },
  },
});

// Export actions and reducer
export const { addToCart, removeFromCart, adjustQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;

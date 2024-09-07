// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";

/**
 * Configures and creates the Redux store with the given reducers.
 * The store is the central repository of state in a Redux application.
 *
 * @returns {Object} The configured Redux store
 */
export const store = configureStore({
  reducer: {
    cart: cartReducer, // Reducer for managing the cart state
    // Add other reducers here if needed in the future
  },
});

// Export the store as the default export
export default store;

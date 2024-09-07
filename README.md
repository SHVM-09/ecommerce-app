# E-Commerce Project Overview

## Project Structure

### 1. `components/`
- **Footer**: Displays footer information.
- **LoadingSpinner**: A spinner component shown during data fetching.
- **Navbar**: The navigation bar for the app.
- **ProductCard**: Displays individual product information in a card format.

### 2. `context/`
- **AuthContext**: Provides authentication data and context across the application.

### 3. `pages/`
- **__tests__/**: Contains test files for different pages and components.
  - **cart.test.js**: Tests related to the Cart page.
  - **home.test.js**: Tests related to the Home page.
  - **info.test.js**: Tests related to the InfoPage.
  - **ordersummary.test.js**: Tests related to the OrderSummary page.
- **Cart**: Page for viewing and managing the shopping cart.
- **Checkout**: Page for checking out and confirming the order.
- **Home**: Home page displaying products and search functionality.
- **ProductDetail**: Page displaying detailed information about a specific product.
- **InfoPage**: Page providing additional information about the application.
- **SuccessPage**: Page shown upon successful order placement.
- **OrderSummary**: Page showing a summary of the order before confirmation.
- **LoginPage**: Page for user login.

### 4. `redux/`
- **slices/**:
  - **cartSlice**: Redux slice for managing cart state.
  - **store.js**: Configures and exports the Redux store.

### 5. `app.jsx`
- Main app component that sets up routing and global components like Navbar and Footer.

### 6. `main.jsx`
- Entry point of the application, rendering the App component to the DOM.

## Technologies Used
- **React**: For building the user interface.
- **Vite**: Build tool for fast development and bundling.
- **Tailwind CSS**: For styling the components.
- **Axios**: For making HTTP requests.
- **Vitest**: For testing React components.
- **Redux**: For state management.
- **Context API**: For managing authentication state.
- **FakeStore API**: Fetch product details for Ecommerce site.

## Key Features and Functionality

### 1. Home Page (`Home.jsx`)
- Displays a list of products.
- Includes a search input to filter products.
- Shows a loading spinner while data is being fetched.
- Uses `axios` for API calls and `redux` for state management.

### 2. Product Detail Page (`ProductDetail.jsx`)
- Fetches and displays detailed information about a selected product.
- Includes an "Add to Cart" button that dispatches an action to add the product to the cart.

### 3. Cart Page (`Cart.jsx`)
- Displays products added to the cart.
- Allows users to remove items or proceed to checkout.

### 4. Checkout Page (`Checkout.jsx`)
- Contains a form for user details and payment information.
- Integrates with `AuthContext` to auto-fill user details if logged in.

### 5. Order Summary Page (`OrderSummary.jsx`)
- Shows a summary of the order.
- Includes options to edit or confirm the order.
- Confirms the order and clears the cart upon confirmation.

### 6. Success Page (`SuccessPage.jsx`)
- Displays a success message after order placement.

### 7. Info Page (`InfoPage.jsx`)
- Provides additional information about the application or company.

### 8. Login Page (`LoginPage.jsx`)
- Allows users to log in with their credentials.
- Updates the `AuthContext` with user information upon successful login.

## Code Explanation

### 1. `app.jsx`
```jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSummary from './pages/OrderSummary';
import SuccessPage from './pages/SuccessPage';
import InfoPage from './pages/InfoPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/ordersummary" element={<OrderSummary />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
```
- Sets up routing and global components like Navbar and Footer.

### 2. `main.jsx`
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```
- Renders the `App` component to the DOM.

### 3. `redux/slices/cartSlice.js`
```javascript
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
    },
    removeFromCart: (state, action) => {
      return state.filter(item => item.id !== action.payload.id);
    },
    clearCart: () => [],
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
```
- Manages cart state with actions to add, remove, or clear items.

### 4. `context/AuthContext.js`
```jsx
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
```
- Provides authentication state and context throughout the application.

### 5. `components/LoadingSpinner.jsx`
```jsx
import React from 'react';

const LoadingSpinner = () => (
  <div data-testid="loading-spinner" className="spinner">
    {/* Add spinner styling here */}
  </div>
);

export default LoadingSpinner;
```
- A simple spinner component used during data fetching.

## Testing
- **Vitest** is used for testing components and ensuring functionality.
- Tests include checking if components render correctly, if the loading spinner shows during data fetching, and verifying user interactions.

## Conclusion
This e-commerce project utilizes modern tools and technologies to provide a robust and user-friendly shopping experience. It integrates various features, including product management, user authentication, and order processing, to deliver a seamless e-commerce platform.

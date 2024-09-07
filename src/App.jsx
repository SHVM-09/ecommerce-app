// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";
import OrderSummary from "./pages/OrderSummary";
import InfoPage from "./pages/InfoPage";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import SuccessPage from "./pages/SuccessPage";

/**
 * Main application component that sets up the routing for the application.
 *
 * @returns {JSX.Element} The rendered application component with routing and layout
 */
function App() {
  return (
    <Router>
      {/* Render the navigation bar */}
      <Navbar />
      <div className="container mx-auto px-4">
        {/* Define application routes */}
        <Routes>
          <Route path="/" element={<InfoPage />} />
          <Route path="/products" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-summary" element={<OrderSummary />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/success" element={<SuccessPage />} />
          {/* Catch-all route for undefined paths */}
          <Route
            path="*"
            element={<h1 className="text-center text-2xl">Page Not Found</h1>}
          />
        </Routes>
      </div>
      {/* Render the footer */}
      <Footer />
    </Router>
  );
}

export default App;

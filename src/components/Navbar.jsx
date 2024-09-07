// components/Navbar.jsx
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { GiShoppingCart } from "react-icons/gi";
import { FiShoppingBag } from "react-icons/fi";
import { useAuth } from "../context/AuthContext"; // Import the auth context for user authentication

const Navbar = () => {
  const { user, logout } = useAuth(); // Retrieve user information and logout function from auth context
  const totalQuantity = useSelector((state) => state.cart.totalQuantity); // Get total quantity of items in the cart from Redux store

  return (
    <nav className="flex items-center justify-between bg-gray-700 px-6 py-3 text-white">
      {/* Logo and Navigation Links */}
      <div className="flex items-center gap-2">
        <Link to="/" className="mr-6 text-2xl font-bold">
          <FiShoppingBag />
        </Link>
        <div className="flex gap-4">
          <Link to="/" className="text-lg">
            Home
          </Link>
          <Link to="/products" className="text-lg">
            Products
          </Link>
        </div>
      </div>

      {/* Cart and User Section */}
      <div className="flex items-center gap-6">
        {/* User Authentication Display */}
        {user ? (
          <div className="flex items-center space-x-4">
            <span>Hello, {user.name}</span>
            <button
              onClick={logout}
              className="rounded bg-red-500 px-3 py-1 transition duration-200 hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="text-lg">
            Login
          </Link>
        )}

        {/* Cart Icon with Total Quantity Badge */}
        <Link to="/cart" className="relative">
          <GiShoppingCart className="text-3xl" />
          {totalQuantity > 0 && (
            <span className="absolute -right-1.5 top-0 rounded-full bg-red-500 px-2 text-xs text-white">
              {totalQuantity}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

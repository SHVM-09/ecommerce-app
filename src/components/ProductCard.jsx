// components/ProductCard.jsx
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice"; // Import the action to add items to the cart

const ProductCard = ({ product }) => {
  const dispatch = useDispatch(); // Hook to dispatch actions to the Redux store

  // Function to handle adding a product to the cart
  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="m-2 flex flex-col justify-between rounded-lg bg-white shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg">
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.title}
        className="h-36 w-full rounded-t-lg object-contain transition-transform duration-300 ease-in-out hover:scale-105"
      />
      <div className="flex flex-grow flex-col p-4">
        {/* Product Title */}
        <h2 className="text-md truncate font-semibold">{product.title}</h2>
        <div className="mt-4 flex flex-col justify-between gap-2 rounded-lg border p-2">
          {/* Product Price and Brand */}
          <div className="flex flex-col">
            <p className="mt-1 text-2xl text-gray-600">
              ${product.price}{" "}
              <span className="text-xs text-gray-400 line-through">
                ${product.price + 0.1 * product.price}
              </span>
            </p>
            <p className="text-gray-500">
              Brand:{" "}
              <span className="font-semibold lowercase text-gray-900">
                {product.brand}
              </span>
            </p>
          </div>
          <div className="space-y-2">
            {/* Buttons for Product Actions */}
            <Link to={`/product/${product.id}`}>
              <button className="mb-2 w-full rounded border border-gray-500 px-3 py-1 text-gray-500 transition-colors duration-200 hover:bg-gray-700 hover:text-white">
                View Details
              </button>
            </Link>
            <Link to="/cart">
              <button className="w-full rounded border border-gray-500 px-3 py-1 text-gray-500 transition-colors duration-200 hover:bg-gray-700 hover:text-white">
                View Cart
              </button>
            </Link>
            <button
              onClick={handleAddToCart}
              className="w-full rounded border border-blue-500 px-3 py-1 text-blue-500 transition-colors duration-200 hover:bg-blue-700 hover:text-white"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

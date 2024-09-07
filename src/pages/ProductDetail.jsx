// pages/ProductDetail.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice"; // Import the addToCart action

/**
 * ProductDetail component fetches and displays detailed information about a specific product.
 * It also allows the user to add the product to their cart.
 */
const ProductDetail = () => {
  const { id } = useParams(); // Extract product ID from URL parameters
  const [product, setProduct] = useState(null); // State to hold product data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const dispatch = useDispatch(); // Initialize Redux dispatch

  // Fetch product details when component mounts or ID changes
  useEffect(() => {
    axios
      .get(`https://fakestoreapi.in/api/products/${id}`)
      .then((response) => {
        setProduct(response.data.product); // Update state with fetched product data
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching product:", error); // Log any errors
        setLoading(false); // Set loading to false in case of error
      });
  }, [id]);

  // Handler for adding the product to the cart
  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product)); // Dispatch action to add product to cart
    }
  };

  // Display loading message if data is still being fetched
  if (loading) return <p className="text-center text-lg">Loading...</p>;

  // Display error message if product is not found
  if (!product)
    return <p className="text-center text-lg">Product not found.</p>;

  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="mt-4 overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="flex flex-col md:flex-row">
          <img
            src={product.image}
            alt={product.title}
            className="h-96 w-full rounded-t-lg object-cover transition-transform duration-300 hover:scale-105 md:w-1/2 md:rounded-l-lg md:rounded-tr-none"
          />
          <div className="flex flex-col justify-between p-6">
            <div>
              <h1 className="mb-4 text-3xl font-bold text-gray-900">
                {product.title}
              </h1>
              <p className="mb-4 text-sm text-gray-700">
                {product.description}
              </p>
              <p className="mb-2 text-xl font-semibold">
                Price: <span className="text-gray-600">${product.price}</span>
              </p>
              <p className="mb-2 text-base font-semibold">
                Brand: <span className="text-gray-600">{product.brand}</span>
              </p>
              <p className="mb-2 text-base font-semibold">
                Category:{" "}
                <span className="text-gray-600">{product.category}</span>
              </p>
              <p className="mb-2 text-base font-semibold">
                Color: <span className="text-gray-600">{product.color}</span>
              </p>
            </div>
            <button
              onClick={handleAddToCart}
              className="w-full rounded-lg border border-blue-500 px-4 py-2 font-semibold text-blue-500 transition duration-300 hover:bg-blue-600 hover:text-white md:w-auto"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

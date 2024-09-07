import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
  // State to store products fetched from API
  const [products, setProducts] = useState([]);
  // State to handle the search query
  const [search, setSearch] = useState("");
  // State to handle loading status
  const [loading, setLoading] = useState(true);

  // Fetch products from API on component mount
  useEffect(() => {
    // Indicate that loading has started
    setLoading(true);
    axios
      .get("https://fakestoreapi.in/api/products")
      .then((response) => {
        // Update products state with fetched data
        setProducts(response.data.products);
        console.log("Products fetched:", response.data.products);
      })
      .catch((error) => console.error("Error fetching products:", error))
      .finally(() => {
        // Indicate that loading has finished
        setLoading(false);
      });
  }, []);

  // Filter products based on search input
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-4">
      {loading ? (
        <LoadingSpinner /> // Show spinner while data is loading
      ) : (
        <>
          {/* Search input for filtering products */}
          <div className="px-2">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-4 w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none md:w-1/2 lg:w-1/3"
            />
          </div>

          {/* Display filtered products in a grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;

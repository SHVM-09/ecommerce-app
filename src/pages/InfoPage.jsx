import { GiShoppingCart } from "react-icons/gi";
import { Link } from "react-router-dom";

const InfoPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      {/* Centered container for the info page content */}
      <div className="text-center">
        {/* Main heading of the page */}
        <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
          Welcome to the{" "}
          <span className="text-4xl text-blue-600 sm:text-6xl">E-Commerce</span>{" "}
          Store!
        </h1>

        {/* Description paragraph */}
        <p className="mb-6 text-lg text-gray-700">
          Discover an extensive range of products at unbeatable prices. Shop now
          and take advantage of amazing discounts and exclusive offers!
        </p>
        <div className="flex items-center justify-center gap-4">
          <GiShoppingCart className="text-[150px] text-blue-600 sm:text-[300px]" />

          {/* Button to navigate to the products page */}
          <Link to="/products">
            <button className="rounded-lg border border-blue-600 bg-white px-6 py-2 font-semibold text-blue-600 shadow-md transition duration-300 ease-in-out hover:bg-blue-700 hover:text-white">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;

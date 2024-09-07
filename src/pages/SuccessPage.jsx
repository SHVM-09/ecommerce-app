// pages/SuccessPage.jsx
import { useNavigate } from "react-router-dom";

/**
 * SuccessPage component displays a success message after a successful order placement.
 * It includes a button to navigate back to the home page.
 */
const SuccessPage = () => {
  const navigate = useNavigate(); // Initialize navigation hook

  // Handler to navigate to the home page
  const handleHomeRedirect = () => {
    navigate("/"); // Redirect to the home page
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-xl rounded-lg bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-extrabold text-gray-900">Success!</h1>
        <p className="mt-4 text-lg text-gray-700">
          Your order has been placed successfully. Thank you for shopping with
          us!
        </p>
        <div className="mt-6">
          <button
            onClick={handleHomeRedirect}
            className="w-full rounded-md border border-blue-600 px-4 py-2 text-blue-600 transition duration-300 hover:bg-blue-600 hover:text-white"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;

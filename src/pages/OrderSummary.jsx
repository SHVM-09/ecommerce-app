// pages/OrderSummary.jsx
import { useNavigate } from "react-router-dom";

/**
 * OrderSummary component displays the summary of the order including cart items, total price,
 * and shipping address. It provides options to edit the order or confirm and proceed with payment.
 *
 * @param {Object} props - Component props
 * @param {Object} props.orderSummary - The summary of the order including cart items, total price, and shipping address.
 * @param {Function} props.onConfirmOrder - Function to handle order confirmation.
 */
const OrderSummary = ({ orderSummary, onConfirmOrder }) => {
  const navigate = useNavigate();

  // Handler for confirming the order
  const handleConfirmOrder = () => {
    if (
      window.confirm(
        "Are you sure you want to confirm the order and proceed with payment?",
      )
    ) {
      onConfirmOrder(); // Call the passed in function to handle order confirmation
      navigate("/success"); // Redirect to the success page
    }
  };

  // Handler for editing the order
  const handleEditOrder = () => {
    navigate("/cart"); // Navigate back to the cart page for editing
  };

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6">
      <h1 className="mb-4 text-center text-2xl font-bold sm:text-3xl">
        Order Summary
      </h1>
      <div className="rounded-lg bg-white p-4 shadow-md sm:p-6">
        <div className="overflow-x-auto">
          <table className="mb-4 min-w-full divide-y divide-gray-200 text-sm sm:text-base">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-500 sm:px-6">
                  Item
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-500 sm:px-6">
                  Quantity
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-500 sm:px-6">
                  Price
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {orderSummary.cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="max-w-lg truncate whitespace-nowrap px-4 py-2 text-gray-900 sm:px-6">
                    {item.title}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-500 sm:px-6">
                    {item.quantity}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-500 sm:px-6">
                    ${item.price.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 p-2">
          <p className="text-xl font-bold">
            Total:{" "}
            <span className="text-gray-600">
              ${orderSummary.totalPrice.toFixed(2)}
            </span>
          </p>
          <p className="mt-2 text-lg font-semibold">Shipping Address:</p>
          <p className="text-sm sm:text-base">{orderSummary.name}</p>
          <p className="text-sm sm:text-base">{orderSummary.address}</p>
          <p className="text-sm sm:text-base">
            {orderSummary.city}, {orderSummary.state} {orderSummary.postalCode}
          </p>
          <p className="text-sm sm:text-base">Phone: {orderSummary.phone}</p>
        </div>
        <div className="mt-4 flex flex-col sm:flex-row sm:space-x-4">
          <button
            onClick={handleEditOrder}
            className="mb-2 inline-block rounded-md border border-blue-500 bg-white px-4 py-2 text-blue-500 shadow-sm hover:bg-blue-600 hover:text-white sm:mb-0"
          >
            Edit Order
          </button>
          <button
            onClick={handleConfirmOrder}
            className="inline-block rounded-md border border-green-500 bg-white px-4 py-2 text-green-500 shadow-sm hover:bg-green-600 hover:text-white"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

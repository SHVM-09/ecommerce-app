// pages/Cart.jsx
import { useSelector, useDispatch } from "react-redux";
import { adjustQuantity, removeFromCart } from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  // Get cart items and total price from Redux store
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();

  // Remove item from cart
  const handleRemove = (id) => {
    dispatch(removeFromCart({ id }));
  };

  // Adjust the quantity of a cart item
  const handleAdjustQuantity = (id, quantity) => {
    dispatch(adjustQuantity({ id, quantity }));
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Order Details</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div>
          {/* Table displaying cart items */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  {/* Table headers */}
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Image
                  </th>
                  <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 lg:block">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {/* Map over cart items to create table rows */}
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className="whitespace-nowrap px-6 py-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-16 w-16 rounded object-contain"
                      />
                    </td>
                    <td className="hidden max-w-80 truncate whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 lg:block">
                      {item.title}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-2">
                        {/* Adjust quantity buttons */}
                        <button
                          onClick={() =>
                            handleAdjustQuantity(
                              item.id,
                              Math.max(item.quantity - 1, 1),
                            )
                          }
                          className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 bg-gray-100 text-gray-500 hover:bg-gray-200"
                        >
                          -
                        </button>
                        <span className="px-4 text-sm font-medium text-gray-700">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleAdjustQuantity(item.id, item.quantity + 1)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 bg-gray-100 text-gray-500 hover:bg-gray-200"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Total price and checkout button */}
          <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4">
            <h2 className="text-xl font-bold text-gray-800">
              Total: ${totalPrice.toFixed(2)}
            </h2>
            <Link
              to="/checkout"
              className="rounded border border-blue-500 px-6 py-2 font-semibold text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

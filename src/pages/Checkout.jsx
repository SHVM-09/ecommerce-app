import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/slices/cartSlice";
import { useAuth } from "../context/AuthContext";
import OrderSummary from "./OrderSummary";

const Checkout = () => {
  // Get user details from authentication context
  const { user } = useAuth();
  // Initialize state for form data, errors, submission status, and order summary
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
    paymentMethod: "cod", // Default payment method
    cardNumber: "",
    cardExpiry: "",
    cardCVV: "",
    upiId: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [orderSummary, setOrderSummary] = useState(null);

  // Get cart items and total price from Redux store
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();

  // Set form data with user info if user is logged in
  useEffect(() => {
    if (user) {
      setFormData({
        ...formData,
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    const {
      name,
      email,
      address,
      city,
      state,
      postalCode,
      phone,
      paymentMethod,
      cardNumber,
      cardExpiry,
      cardCVV,
      upiId,
    } = formData;

    // Check required fields and their formats
    if (!name) newErrors.name = "Name is required.";
    if (!email || !/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Valid email is required.";
    if (!address) newErrors.address = "Address is required.";
    if (!city) newErrors.city = "City is required.";
    if (!state) newErrors.state = "State is required.";
    if (!postalCode || !/^\d{6}$/.test(postalCode))
      newErrors.postalCode = "Valid postal code is required.";
    if (!phone || !/^\d{10}$/.test(phone))
      newErrors.phone = "Valid phone number is required.";

    // Validate payment method-specific fields
    if (paymentMethod === "card") {
      if (!cardNumber || !/^\d{16}$/.test(cardNumber))
        newErrors.cardNumber = "Valid card number is required.";
      if (!cardExpiry || !/^\d{2}\/\d{2}$/.test(cardExpiry))
        newErrors.cardExpiry = "Valid expiry date is required (MM/YY).";
      if (!cardCVV || !/^\d{3}$/.test(cardCVV))
        newErrors.cardCVV = "Valid CVV is required.";
    }

    if (paymentMethod === "upi" && !upiId)
      newErrors.upiId = "UPI ID is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle change in payment method
  const handlePaymentMethodChange = (e) => {
    setFormData({
      ...formData,
      paymentMethod: e.target.value,
      cardNumber: "", // Reset card details if payment method changes
      cardExpiry: "",
      cardCVV: "",
      upiId: "", // Reset UPI ID if payment method changes
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setOrderSummary({
        ...formData,
        cartItems,
        totalPrice,
      });
      setSubmitted(true);
    }
  };

  // Handle order confirmation
  const handleConfirmOrder = () => {
    dispatch(clearCart());
    setOrderSummary(null);
    setFormData({
      name: "",
      email: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      phone: "",
      paymentMethod: "cod",
      cardNumber: "",
      cardExpiry: "",
      cardCVV: "",
      upiId: "",
    });
    setSubmitted(false);
  };

  // Render the OrderSummary component if the form has been submitted
  if (submitted) {
    return (
      <OrderSummary
        orderSummary={orderSummary}
        onConfirmOrder={handleConfirmOrder}
      />
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Checkout</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-lg bg-white p-6 shadow-md"
      >
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border ${errors.name ? "border-red-500" : "border-gray-300"} p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border ${errors.email ? "border-red-500" : "border-gray-300"} p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
        {/* Address */}
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <input
            id="address"
            name="address"
            type="text"
            required
            value={formData.address}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border ${errors.address ? "border-red-500" : "border-gray-300"} p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">{errors.address}</p>
          )}
        </div>
        {/* City */}
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            City
          </label>
          <input
            id="city"
            name="city"
            type="text"
            required
            value={formData.city}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border ${errors.city ? "border-red-500" : "border-gray-300"} p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city}</p>
          )}
        </div>
        {/* State */}
        <div>
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700"
          >
            State
          </label>
          <input
            id="state"
            name="state"
            type="text"
            required
            value={formData.state}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border ${errors.state ? "border-red-500" : "border-gray-300"} p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
          />
          {errors.state && (
            <p className="mt-1 text-sm text-red-600">{errors.state}</p>
          )}
        </div>
        {/* Postal Code */}
        <div>
          <label
            htmlFor="postalCode"
            className="block text-sm font-medium text-gray-700"
          >
            Postal Code
          </label>
          <input
            id="postalCode"
            name="postalCode"
            type="text"
            required
            value={formData.postalCode}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border ${errors.postalCode ? "border-red-500" : "border-gray-300"} p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
          />
          {errors.postalCode && (
            <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>
          )}
        </div>
        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            required
            value={formData.phone}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border ${errors.phone ? "border-red-500" : "border-gray-300"} p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        {/* Payment Method */}
        <div className="mt-4">
          <fieldset className="space-y-2">
            <legend className="block text-sm font-medium text-gray-700">
              Payment Method
            </legend>
            <div className="flex items-center">
              <input
                id="paymentMethodCOD"
                name="paymentMethod"
                type="radio"
                value="cod"
                checked={formData.paymentMethod === "cod"}
                onChange={handlePaymentMethodChange}
                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="paymentMethodCOD"
                className="ml-2 text-sm font-medium text-gray-700"
              >
                Cash on Delivery
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="paymentMethodCard"
                name="paymentMethod"
                type="radio"
                value="card"
                checked={formData.paymentMethod === "card"}
                onChange={handlePaymentMethodChange}
                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="paymentMethodCard"
                className="ml-2 text-sm font-medium text-gray-700"
              >
                Card
              </label>
            </div>
            {formData.paymentMethod === "card" && (
              <div className="mt-2 space-y-4">
                <div>
                  <label
                    htmlFor="cardNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Card Number
                  </label>
                  <input
                    id="cardNumber"
                    name="cardNumber"
                    type="text"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border ${errors.cardNumber ? "border-red-500" : "border-gray-300"} p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                  />
                  {errors.cardNumber && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.cardNumber}
                    </p>
                  )}
                </div>
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label
                      htmlFor="cardExpiry"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Expiry Date (MM/YY)
                    </label>
                    <input
                      id="cardExpiry"
                      name="cardExpiry"
                      type="text"
                      value={formData.cardExpiry}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border ${errors.cardExpiry ? "border-red-500" : "border-gray-300"} p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                    />
                    {errors.cardExpiry && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.cardExpiry}
                      </p>
                    )}
                  </div>
                  <div className="w-1/2">
                    <label
                      htmlFor="cardCVV"
                      className="block text-sm font-medium text-gray-700"
                    >
                      CVV
                    </label>
                    <input
                      id="cardCVV"
                      name="cardCVV"
                      type="text"
                      value={formData.cardCVV}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border ${errors.cardCVV ? "border-red-500" : "border-gray-300"} p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                    />
                    {errors.cardCVV && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.cardCVV}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
            <div className="flex items-center">
              <input
                id="paymentMethodUPI"
                name="paymentMethod"
                type="radio"
                value="upi"
                checked={formData.paymentMethod === "upi"}
                onChange={handlePaymentMethodChange}
                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="paymentMethodUPI"
                className="ml-2 text-sm font-medium text-gray-700"
              >
                UPI
              </label>
            </div>
            {formData.paymentMethod === "upi" && (
              <div>
                <label
                  htmlFor="upiId"
                  className="block text-sm font-medium text-gray-700"
                >
                  UPI ID
                </label>
                <input
                  id="upiId"
                  name="upiId"
                  type="text"
                  value={formData.upiId}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border ${errors.upiId ? "border-red-500" : "border-gray-300"} p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
                />
                {errors.upiId && (
                  <p className="mt-1 text-sm text-red-600">{errors.upiId}</p>
                )}
              </div>
            )}
          </fieldset>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;

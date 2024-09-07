// __tests__/OrderSummary.test.jsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import OrderSummary from "../OrderSummary";
import { MemoryRouter } from "react-router-dom";

const mockOrderSummary = {
  cartItems: [
    { id: 1, title: "Product 1", quantity: 2, price: 20 },
    { id: 2, title: "Product 2", quantity: 1, price: 10 },
  ],
  totalPrice: 50,
  name: "John Doe",
  address: "123 Main St",
  city: "Anytown",
  state: "CA",
  postalCode: "12345",
  phone: "555-555-5555",
};

const mockOnConfirmOrder = () => {};

describe("OrderSummary", () => {
  it("renders the order summary component", () => {
    render(
      <MemoryRouter>
        <OrderSummary
          orderSummary={mockOrderSummary}
          onConfirmOrder={mockOnConfirmOrder}
        />
      </MemoryRouter>,
    );

    // Check if the title is rendered
    expect(screen.getByText(/Order Summary/i)).toBeInTheDocument();

    // Check if the order items are rendered
    expect(screen.getByText(/Product 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Product 2/i)).toBeInTheDocument();

    // Check if the total price is rendered
    expect(screen.getByText(/Total:/i)).toBeInTheDocument();

    // Check if the buttons are rendered
    expect(screen.getByText(/Edit Order/i)).toBeInTheDocument();
    expect(screen.getByText(/Confirm Order/i)).toBeInTheDocument();
  });
});

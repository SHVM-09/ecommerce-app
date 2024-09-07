// src/pages/__tests__/Cart.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../../redux/slices/cartSlice";
import Cart from "../Cart";

const renderWithStore = (initialState) => {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: initialState,
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    </Provider>,
  );
};

describe("Cart Component", () => {
  test("renders the cart with items", () => {
    const initialState = {
      cart: {
        items: [
          {
            id: 1,
            image: "image-url",
            title: "Product 1",
            price: 10.0,
            quantity: 2,
          },
        ],
        totalPrice: 20.0,
      },
    };

    renderWithStore(initialState);

    expect(screen.getByText("Order Details")).toBeInTheDocument();
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("$10.00")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("$20.00")).toBeInTheDocument();
    expect(screen.getByText("Checkout")).toBeInTheDocument();
  });

  test("displays empty cart message when no items are present", () => {
    const initialState = {
      cart: {
        items: [],
        totalPrice: 0.0,
      },
    };

    renderWithStore(initialState);

    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
  });

  test("handles quantity adjustment", () => {
    const initialState = {
      cart: {
        items: [
          {
            id: 1,
            image: "image-url",
            title: "Product 1",
            price: 10.0,
            quantity: 2,
          },
        ],
        totalPrice: 20.0,
      },
    };

    renderWithStore(initialState);

    // Use getByText to find buttons by their text content
    const decrementButton = screen.getByText("-");
    const incrementButton = screen.getByText("+");

    fireEvent.click(decrementButton);
    expect(screen.getByText("1")).toBeInTheDocument();

    fireEvent.click(incrementButton);
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  test("handles item removal", () => {
    const initialState = {
      cart: {
        items: [
          {
            id: 1,
            image: "image-url",
            title: "Product 1",
            price: 10.0,
            quantity: 2,
          },
        ],
        totalPrice: 20.0,
      },
    };

    const { container } = renderWithStore(initialState);
    const removeButton = container.querySelector("button.text-red-600");

    fireEvent.click(removeButton);
    expect(screen.queryByText("Product 1")).not.toBeInTheDocument();
  });

  test("calculates total price correctly", () => {
    const initialState = {
      cart: {
        items: [
          {
            id: 1,
            image: "image-url",
            title: "Product 1",
            price: 10.0,
            quantity: 2,
          },
        ],
        totalPrice: 20.0,
      },
    };

    renderWithStore(initialState);

    expect(screen.getByText("Total: $20.00")).toBeInTheDocument();
  });

  test("navigates to checkout page", () => {
    const initialState = {
      cart: {
        items: [
          {
            id: 1,
            image: "image-url",
            title: "Product 1",
            price: 10.0,
            quantity: 2,
          },
        ],
        totalPrice: 20.0,
      },
    };

    renderWithStore(initialState);

    const checkoutButton = screen.getByText("Checkout");
    expect(checkoutButton).toBeInTheDocument();
    // Assuming you have a mock for routing here if needed
  });
});

import { render, screen, waitFor } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import Home from "../Home";
import axios from "axios";

// Mock axios to avoid making real API calls
vi.mock("axios");

test("shows loading spinner while data is loading", async () => {
  // Mock axios to resolve with some data
  axios.get.mockResolvedValue({ data: { products: [] } });

  render(<Home />);

  // Wait for the loading spinner to be in the document
  await waitFor(() => {
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });
});

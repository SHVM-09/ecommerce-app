import { render } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import InfoPage from "../InfoPage";

describe("InfoPage Component", () => {
  test("renders the InfoPage with title and button", () => {
    const { container } = render(
      <MemoryRouter>
        <InfoPage />
      </MemoryRouter>,
    );

    const titleElement = container.querySelector("h1");
    expect(titleElement).toHaveTextContent("Welcome to the E-Commerce Store!");

    expect(container.querySelector("button")).toHaveTextContent("Shop Now");
  });
});

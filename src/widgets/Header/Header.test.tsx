import { screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Header } from "./Header";
import { renderWithProviders } from "../../shared/testing/utils";

describe("Header", () => {
  it("should render Header correctly", async () => {
    renderWithProviders(<Header />);

    waitFor(() => {
      expect(screen.queryByText("hh .FE")).toBeInTheDocument();
    });
    waitFor(() => {
      expect(screen.queryByText("Вакансии FE")).toBeInTheDocument();
    });
    waitFor(() => {
      expect(screen.queryByText("Обо мне")).toBeInTheDocument();
    });
  });
});

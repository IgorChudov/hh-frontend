import { screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MainPage } from "./MainPage";
import { renderWithProviders } from "../../shared/testing/utils";

describe("MainPage", () => {
  it("should render Main Page", async () => {
    renderWithProviders(<MainPage />);
    waitFor(() => {
      expect(
        screen.getByText("Список вакансий по профессии Frontend-разработчик")
      ).toBeInTheDocument();
    });
  });
});

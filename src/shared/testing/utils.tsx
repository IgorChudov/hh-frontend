import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { store } from "../../app/store";
import { theme } from "../../theme";
import { BrowserRouter } from "react-router";

if (typeof global.ResizeObserver === "undefined") {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}
export function renderWithProviders(ui: React.ReactElement) {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <MantineProvider theme={theme}>{ui}</MantineProvider>
      </BrowserRouter>
    </Provider>
  );
}

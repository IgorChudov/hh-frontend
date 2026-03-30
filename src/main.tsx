import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router";
import { Provider } from "react-redux";
import { MantineProvider } from "@mantine/core";
import { App } from "./app/App";
import { store } from "./app/store";
import { theme } from "./theme";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <Provider store={store}>
        <MantineProvider theme={theme}>
          <HashRouter>
            <App />
          </HashRouter>
        </MantineProvider>
      </Provider>
  </React.StrictMode>
);

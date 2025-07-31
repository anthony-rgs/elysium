import React from "react";
import { store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "@/utils";
import { Layout } from "@/components";

export default function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <Routes>
              {routes.map(({ path, element }) => (
                <Route
                  key={path}
                  path={path}
                  element={element}
                />
              ))}
            </Routes>
          </Layout>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
}

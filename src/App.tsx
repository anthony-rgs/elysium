import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "@/utils/routes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={element}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

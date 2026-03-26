import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import App from "./App";
import Catalogue from "./pages/Catalogue";

import Contact from "./pages/Contact";

// 🔒 Protected Route
const PrivateRoute = ({ children }) => {
  const isAuth = localStorage.getItem("token") === "true";
  return isAuth ? children : <Navigate to="/login" />;
};

function App1() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/catalog" element={<Catalogue />} />
<Route path="/catalog" element={<Catalogue />} />
<Route path="/contact" element={<Contact />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <App />
            </PrivateRoute>
          }
        />

        {/* ❗ fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App1;
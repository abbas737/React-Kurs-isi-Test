import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Tanks from "../pages/Tanks";
import TankDetails from "../pages/TankDetails";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { useTokens } from "../stores/TokenStore";

const Navigator = () => {
  const accessToken = useTokens((state) => state.accessToken);

  return (
    <Routes>
      {/* Protected routes */}
      <Route
        path="/"
        element={accessToken ? <HomePage /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/tanks"
        element={accessToken ? <Tanks /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/tank/:id"
        element={accessToken ? <TankDetails /> : <Navigate to="/login" replace />}
      />

      {/* Auth routes */}
      <Route
        path="/login"
        element={accessToken ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/register"
        element={accessToken ? <Navigate to="/" replace /> : <Register />}
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Navigator;
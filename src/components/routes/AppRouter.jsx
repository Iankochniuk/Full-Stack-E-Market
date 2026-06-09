import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import ProductDetail from "../../pages/ProductDetail";
import Checkout from "../../pages/Checkout";
import Orders from "../../pages/Orders";
import Login from "../../pages/Login";
import ProtectedRoute from "./ProctectedRouter";
import Admin from "../../pages/Admin";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRouter;

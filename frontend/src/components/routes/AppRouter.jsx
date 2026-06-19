import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import ProductDetail from "../../pages/ProductDetail";
import Checkout from "../../pages/Checkout";
import Orders from "../../pages/Orders";
import Login from "../../pages/Login";
import ProtectedRoute from "./ProctectedRouter";
import Admin from "../../pages/Admin";
import MyOrders from "../../pages/MyOrders";
import Register from "../../pages/Register";

function Approuter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly={true}>
            <Admin />
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
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
      <Route
        path="/my-orders"
        element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default Approuter;

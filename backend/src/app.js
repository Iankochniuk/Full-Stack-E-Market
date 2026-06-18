require("dotenv").config();
require("./config/cloudinary");

const ordersRoutes = require("./Router/Orders.Router");
const express = require("express");
const cors = require("cors");
const authRoutes = require("./Router/Auth.Router");
const uploadRoutes = require("./Router/Upload.Router");
const dashboardRouter = require("./Router/Dashboard.Router");
const productsRoutes = require("./Router/Products.Router");

const app = express();

const checkoutRoutes = require("./Router/Checkout.Router");

app.use(cors());
app.use(express.json());

app.use("/products", productsRoutes);
app.use("/orders", ordersRoutes);
app.use("/checkout", checkoutRoutes);
app.use("/auth", authRoutes);
app.use("/upload", uploadRoutes);
app.use("/dashboard", dashboardRouter);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

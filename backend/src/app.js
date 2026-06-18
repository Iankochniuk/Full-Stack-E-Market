require("dotenv").config();
require("./config/ClouDinary");

const ordersRoutes = require("./router/Orders.Router");
const express = require("express");
const cors = require("cors");
const authRoutes = require("./router/Auth.router");
const uploadRoutes = require("./router/Upload.router");
const dashboardRouter = require("./router/Dashboard.router");

const productsRoutes = require("./router/Products.Router");

const app = express();

const checkoutRoutes = require("./router/Checkout.router");

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

require("dotenv").config();
require("./config/cloudinary");

const ordersRoutes = require("./router/Orders.Router");
const express = require("express");
const cors = require("cors");
const authRoutes = require("./router/Auth.Router");
const uploadRoutes = require("./router/Upload.Router");
const dashboardrouter = require("./router/Dashboard.Router");
const productsRoutes = require("./router/Products.Router");

const app = express();

const checkoutRoutes = require("./router/Checkout.Router");

app.use(cors());
app.use(express.json());

app.use("/products", productsRoutes);
app.use("/orders", ordersRoutes);
app.use("/checkout", checkoutRoutes);
app.use("/auth", authRoutes);
app.use("/upload", uploadRoutes);
app.use("/dashboard", dashboardrouter);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

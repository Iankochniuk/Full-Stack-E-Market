const express = require("express");
const pool = require("../config/db");

const Router = express.Router();

Router.get("/", async (req, res) => {
  try {
    const products = await pool.query(`
      SELECT COUNT(*) as total_products
      FROM products
    `);

    const orders = await pool.query(`
      SELECT COUNT(*) as total_orders
      FROM orders
    `);

    const sales = await pool.query(`
      SELECT COALESCE(SUM(total),0) as total_sales
      FROM orders
    `);

    const lowStock = await pool.query(`
      SELECT COUNT(*) as low_stock
      FROM products
      WHERE stock <= 5
    `);

    res.json({
      totalProducts: products.rows[0].total_products,
      totalOrders: orders.rows[0].total_orders,
      totalSales: sales.rows[0].total_sales,
      lowStock: lowStock.rows[0].low_stock,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error dashboard",
    });
  }
});

module.exports = Router;

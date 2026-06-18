const express = require("express");
const pool = require("../config/db");

const router = express.Router();

/* =========================
   POST - Crear orden
========================= */

router.post("/", async (req, res) => {
  const { user_id, cart } = req.body;

  try {
    const total = cart.reduce((acc, item) => {
      return acc + Number(item.precio) * item.cantidad;
    }, 0);

    const orderResult = await pool.query(
      `
      INSERT INTO orders
      (user_id, total)
      VALUES ($1, $2)
      RETURNING *
      `,
      [user_id, total],
    );

    const order = orderResult.rows[0];

    for (const item of cart) {
      await pool.query(
        `
        INSERT INTO order_items
        (order_id, product_id, quantity, price)
        VALUES ($1, $2, $3, $4)
        `,
        [order.id, item.id, item.cantidad, item.precio],
      );

      await pool.query(
        `
        UPDATE products
        SET stock = stock - $1
        WHERE id = $2
        `,
        [item.cantidad, item.id],
      );
    }

    res.status(201).json({
      message: "Orden creada",
      order,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al crear orden",
    });
  }
});

/* =========================
   GET - Todas las órdenes
========================= */

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM orders
      ORDER BY created_at DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al obtener órdenes",
    });
  }
});

/* =========================
   GET - Órdenes de un usuario
========================= */

router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT *
      FROM orders
      WHERE user_id = $1
      ORDER BY created_at DESC
      `,
      [userId],
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al obtener órdenes del usuario",
    });
  }
});

/* =========================
   GET - Detalle de orden
========================= */

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT
        oi.id,
        oi.quantity,
        oi.price,
        p.nombre,
        p.image_url
      FROM order_items oi
      JOIN products p
      ON p.id = oi.product_id
      WHERE oi.order_id = $1
      `,
      [id],
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al obtener detalle",
    });
  }
});

module.exports = router;

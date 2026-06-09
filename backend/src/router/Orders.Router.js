const express = require("express");
const pool = require("../config/db");

const router = express.Router();

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
      message: "Error al obtener pedidos",
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const orderResult = await pool.query("SELECT * FROM orders WHERE id = $1", [
      id,
    ]);

    if (orderResult.rows.length === 0) {
      return res.status(404).json({
        message: "Pedido no encontrado",
      });
    }

    const itemsResult = await pool.query(
      `
      SELECT
        oi.*,
        p.nombre
      FROM order_items oi
      JOIN products p
      ON p.id = oi.product_id
      WHERE oi.order_id = $1
      `,
      [id],
    );

    res.json({
      order: orderResult.rows[0],
      items: itemsResult.rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al obtener pedido",
    });
  }
});

module.exports = router;

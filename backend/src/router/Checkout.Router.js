const express = require("express");
const pool = require("../config/db");

const Router = express.Router();

Router.post("/", async (req, res) => {
  try {
    const { cliente, productos, total } = req.body;

    const { nombre, email, direccion } = cliente;

    // 1. Crear pedido
    const orderResult = await pool.query(
      `
      INSERT INTO orders (
        nombre,
        email,
        direccion,
        total
      )
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [nombre, email, direccion, total],
    );

    const order = orderResult.rows[0];

    // 2. Guardar productos del pedido
    for (const product of productos) {
      await pool.query(
        `
        INSERT INTO order_items (
          order_id,
          product_id,
          cantidad,
          precio
        )
        VALUES ($1, $2, $3, $4)
        `,
        [order.id, product.id, product.cantidad, product.precio],
      );
    }

    console.log("PEDIDO GUARDADO:");
    console.log(order);

    res.status(201).json({
      success: true,
      message: "Pedido guardado correctamente",
      order,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error al guardar pedido",
    });
  }
});

module.exports = Router;

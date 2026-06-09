const express = require("express");
const pool = require("../config/db");

const router = express.Router();

/* =========================
   GET - Todos los productos
========================= */
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products ORDER BY id ASC");

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al obtener productos",
    });
  }
});

/* =========================
   GET - Producto por ID
========================= */
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al obtener producto",
    });
  }
});

/* =========================
   POST - Crear producto
========================= */
router.post("/", async (req, res) => {
  const { nombre, precio, stock, image_url } = req.body;

  try {
    const result = await pool.query(
      `
      INSERT INTO products (
        nombre,
        precio,
        stock,
        image_url
      )
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [nombre, precio, stock, image_url],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al crear producto",
    });
  }
});

/* =========================
   DELETE - Eliminar producto
========================= */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `
      DELETE FROM products
      WHERE id = $1
      RETURNING *
      `,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    res.json({
      message: "Producto eliminado correctamente",
      product: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al eliminar producto",
    });
  }
});

/* =========================
   PUT - Actualizar producto
========================= */
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  const { nombre, precio, stock, image_url } = req.body;

  try {
    const result = await pool.query(
      `
      UPDATE products
      SET
        nombre = $1,
        precio = $2,
        stock = $3,
        image_url = $4
      WHERE id = $5
      RETURNING *
      `,
      [nombre, precio, stock, image_url, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al actualizar producto",
    });
  }
});

module.exports = router;

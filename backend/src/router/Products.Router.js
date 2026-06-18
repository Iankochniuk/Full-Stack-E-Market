const express = require("express");
const pool = require("../config/db");

const Router = express.Router();

/* =========================
   TEST CONEXIÓN DB
========================= */
Router.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        current_database(),
        current_user,
        version()
    `);

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

Router.get("/debug", async (req, res) => {
  try {
    const db = await pool.query("SELECT current_database()");
    const tables = await pool.query(`
            SELECT table_name
            FROM information_schema.tables
            WHERE table_schema='public'
            `);

    const count = await pool.query(`
              SELECT COUNT(*) as total
              FROM products
              `);

    res.json({
      database: db.rows[0],
      tables: tables.rows,
      products: count.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});
/* =========================
                 GET - Todos los productos
              ========================= */
Router.get("/", async (req, res) => {
  try {
    console.log("Intentando consultar tabla products...");

    const result = await pool.query(`
                    SELECT *
                    FROM products
                    ORDER BY id ASC
                  `);

    console.log("Productos encontrados:", result.rows.length);

    res.json(result.rows);
  } catch (error) {
    console.error("ERROR SQL:");
    console.error(error);

    res.status(500).json({
      message: error.message,
      code: error.code,
    });
  }
});

/* =========================
   POST - Crear producto
========================= */
Router.post("/", async (req, res) => {
  const { nombre, precio, stock, image_url } = req.body;

  try {
    const result = await pool.query(
      `
      INSERT INTO products
      (nombre, precio, stock, image_url)
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
   PUT - Actualizar producto
========================= */
Router.put("/:id", async (req, res) => {
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

/* =========================
   DELETE - Eliminar producto
========================= */
Router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    res.json({
      message: "Producto eliminado",
      producto: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al eliminar producto",
    });
  }
});

/* =========================
   GET - Producto por ID
========================= */
Router.get("/:id", async (req, res) => {
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

module.exports = Router;

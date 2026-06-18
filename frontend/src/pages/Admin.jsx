import { useEffect, useState } from "react";

function Admin() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const loadProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/products");
      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadDashboard = async () => {
    try {
      const response = await fetch("http://localhost:3000/dashboard");

      const data = await response.json();

      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    loadDashboard();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = editingProduct?.image_url || "";

      if (imageFile) {
        const formData = new FormData();

        formData.append("image", imageFile);

        const uploadResponse = await fetch("http://localhost:3000/upload", {
          method: "POST",
          body: formData,
        });

        const uploadResult = await uploadResponse.json();

        imageUrl = uploadResult.imageUrl;
      }

      const productData = {
        nombre,
        precio: Number(precio),
        stock: Number(stock),
        image_url: imageUrl,
      };

      const response = await fetch(
        editingProduct
          ? `http://localhost:3000/products/${editingProduct.id}`
          : "http://localhost:3000/products",
        {
          method: editingProduct ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        },
      );

      if (!response.ok) {
        throw new Error("Error al guardar producto");
      }

      alert(editingProduct ? "Producto actualizado" : "Producto creado");

      setNombre("");
      setPrecio("");
      setStock("");
      setImageFile(null);
      setEditingProduct(null);

      loadProducts();
    } catch (error) {
      console.error(error);
      alert("Error al guardar producto");
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("¿Eliminar producto?");

    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar");
      }

      loadProducts();
    } catch (error) {
      console.error(error);
      alert("Error al eliminar producto");
    }
  };

  const startEdit = (product) => {
    setEditingProduct(product);

    setNombre(product.nombre);
    setPrecio(product.precio);
    setStock(product.stock);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Panel Administrador</h1>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-500 text-white p-5 rounded-xl shadow">
            <h3 className="text-lg">Productos</h3>
            <p className="text-3xl font-bold">{stats.totalProducts}</p>
          </div>

          <div className="bg-green-500 text-white p-5 rounded-xl shadow">
            <h3 className="text-lg">Órdenes</h3>
            <p className="text-3xl font-bold">{stats.totalOrders}</p>
          </div>

          <div className="bg-purple-500 text-white p-5 rounded-xl shadow">
            <h3 className="text-lg">Ventas</h3>
            <p className="text-3xl font-bold">
              ${Number(stats.totalSales).toLocaleString()}
            </p>
          </div>

          <div className="bg-red-500 text-white p-5 rounded-xl shadow">
            <h3 className="text-lg">Stock Bajo</h3>
            <p className="text-3xl font-bold">{stats.lowStock}</p>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="border p-6 rounded-lg shadow mb-10"
      >
        <h2 className="text-2xl font-bold mb-4">
          {editingProduct ? "✏️ Editar Producto" : "➕ Crear Producto"}
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border p-3 rounded"
            required
          />

          <input
            type="number"
            placeholder="Precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className="border p-3 rounded"
            required
          />

          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="border p-3 rounded"
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="border p-3 rounded"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
          >
            {editingProduct ? "Actualizar Producto" : "Crear Producto"}
          </button>
        </div>
      </form>

      <h2 className="text-2xl font-bold mb-4">📦 Productos</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow">
            <img
              src={product.image_url}
              alt={product.nombre}
              className="w-full h-48 object-cover rounded-lg mb-3"
            />

            <h3 className="font-bold text-xl">{product.nombre}</h3>

            <p>💲 {product.precio}</p>

            <p>📦 Stock: {product.stock}</p>

            <button
              onClick={() => startEdit(product)}
              className="mt-3 w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
            >
              ✏️ Editar
            </button>

            <button
              onClick={() => deleteProduct(product.id)}
              className="mt-2 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
            >
              🗑 Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;

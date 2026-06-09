import { useState, useEffect } from "react";

function Admin() {
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    stock: "",
  });

  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const loadProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/products");

      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "";

      if (imageFile) {
        const uploadData = new FormData();

        uploadData.append("image", imageFile);

        const uploadResponse = await fetch("http://localhost:3000/upload", {
          method: "POST",
          body: uploadData,
        });

        const uploadResult = await uploadResponse.json();

        imageUrl = uploadResult.imageUrl;
      }

      const response = await fetch(
        editingProduct
          ? `http://localhost:3000/products/${editingProduct.id}`
          : "http://localhost:3000/products",
        {
          method: editingProduct ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            image_url: imageUrl || (editingProduct?.image_url ?? ""),
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Error al guardar producto");
      }

      alert(
        editingProduct
          ? "Producto actualizado correctamente"
          : "Producto creado correctamente",
      );

      setFormData({
        nombre: "",
        precio: "",
        stock: "",
      });

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

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">🛠️ Panel Admin</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 border p-6 rounded-lg shadow"
      >
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={formData.precio}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="w-full border p-3 rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          {editingProduct ? "Actualizar producto" : "Crear producto"}
        </button>
      </form>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">📦 Productos</h2>

        <div className="space-y-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                {product.image_url && (
                  <img
                    src={product.image_url}
                    alt={product.nombre}
                    className="w-24 h-24 object-cover rounded-lg mb-2"
                  />
                )}

                <h3 className="font-bold text-lg">{product.nombre}</h3>

                <p>💲 {product.precio}</p>

                <p>📦 Stock: {product.stock}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingProduct(product);

                    setFormData({
                      nombre: product.nombre,
                      precio: product.precio,
                      stock: product.stock,
                    });
                  }}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                >
                  ✏️ Editar
                </button>

                <button
                  onClick={() => deleteProduct(product.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  🗑 Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;

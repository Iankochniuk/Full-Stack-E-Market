import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

function Checkout() {
  const { cart } = useContext(CartContext);

  const handleSubmit = async (e) => {
    if (!formData.nombre.trim()) {
      alert("Ingresá tu nombre");
      return;
    }

    if (!formData.email.trim()) {
      alert("Ingresá tu email");
      return;
    }

    if (!formData.direccion.trim()) {
      alert("Ingresá tu dirección");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cliente: formData,
          productos: cart,
          total,
        }),
      });

      const data = await response.json();

      console.log(data);

      alert(data.message);
    } catch (error) {
      console.error(error);

      alert("Error al enviar pedido");
    }

    console.log("DATOS CLIENTE:", formData);
    console.log("PRODUCTOS:", cart);
    console.log("TOTAL:", total);

    alert("Datos validados correctamente");
  };

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    direccion: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const total = cart.reduce((acc, product) => {
    return acc + Number(product.precio) * product.cantidad;
  }, 0);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">🧾 Checkout</h1>

      <form className="space-y-4">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={formData.direccion}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />
      </form>

      <div className="mt-8 border-t pt-4">
        <h2 className="text-2xl font-bold mb-4">Resumen del pedido</h2>

        <div className="space-y-3">
          {cart.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-3 flex justify-between"
            >
              <div>
                <h3 className="font-bold">{product.nombre}</h3>

                <p>Cantidad: {product.cantidad}</p>
              </div>

              <p>${(Number(product.precio) * product.cantidad).toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t pt-4">
          <h3 className="text-xl font-bold">Total: ${total.toFixed(2)}</h3>
        </div>

        <pre className="mt-4 bg-gray-100 p-3 rounded">
          {JSON.stringify(formData, null, 2)}
        </pre>

        <button
          onClick={handleSubmit}
          className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          💳 Pagar
        </button>
      </div>
    </div>
  );
}

export default Checkout;

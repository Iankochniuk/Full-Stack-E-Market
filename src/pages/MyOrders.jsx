import { useEffect, useState } from "react";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await fetch(
        `http://localhost:3000/orders/user/${user.id}`,
      );

      const data = await response.json();

      setOrders(data);
    };

    loadOrders();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Mis Compras</h1>

      {orders.map((order) => (
        <div key={order.id} className="border rounded-lg p-4 mb-4">
          <h2 className="font-bold">Orden #{order.id}</h2>

          <p>Total: ${order.total}</p>

          <p>Estado: {order.status}</p>

          <p>Fecha: {new Date(order.created_at).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}

export default MyOrders;

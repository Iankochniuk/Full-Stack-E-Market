import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await fetch("${API_URL}/orders");

        const data = await response.json();

        setOrders(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadOrders();
  }, []);

  const loadOrderDetail = async (orderId) => {
    if (selectedOrder?.id === orderId) {
      setSelectedOrder(null);
      setOrderItems([]);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/orders/${orderId}`);

      const data = await response.json();

      setSelectedOrder(data.order);
      setOrderItems(data.items);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">📦 Historial de pedidos</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-4 shadow">
            <h2 className="font-bold text-xl">Pedido #{order.id}</h2>

            <p>Cliente: {order.nombre}</p>

            <p>Email: {order.email}</p>

            <p>Dirección: {order.direccion}</p>

            <p className="font-bold">Total: ${order.total}</p>

            {selectedOrder && (
              <div className="mt-10 border-t pt-6">
                <h2 className="text-3xl font-bold mb-4">
                  Pedido #{selectedOrder.id}
                </h2>

                <div className="space-y-3">
                  {orderItems.map((item) => (
                    <div key={item.id} className="border rounded-lg p-3">
                      <h3 className="font-bold">{item.nombre}</h3>

                      <p>Cantidad: {item.cantidad}</p>

                      <p>Precio: ${item.precio}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <button
              onClick={() => loadOrderDetail(order.id)}
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              {selectedOrder?.id === order.id
                ? "Ocultar productos"
                : "Ver productos"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;

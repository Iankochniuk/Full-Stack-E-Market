import { useNavigate } from "react-router-dom";

function Cart({
  closeCart,
  cart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  removeFromCart,
}) {
  const navigate = useNavigate();
  const total = cart.reduce((acc, product) => {
    return acc + Number(product.precio) * product.cantidad;
  }, 0);

  return (
    <div className="fixed top-0 right-0 h-screen w-80 bg-white shadow-2xl p-5 z-50 overflow-y-auto">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">🛒 Carrito</h2>

        <button
          onClick={closeCart}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          X
        </button>
      </div>

      <p className="mb-4 font-semibold">Productos: {cart.length}</p>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">El carrito está vacío</p>
      ) : (
        <>
          <div className="space-y-3">
            {cart.map((product) => (
              <div key={product.id} className="border rounded-lg p-3">
                <h3 className="font-bold">{product.nombre}</h3>

                <p className="text-gray-600">${product.precio}</p>

                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => decreaseQuantity(product.id)}
                    className="bg-red-500 text-white w-8 h-8 rounded hover:bg-red-600"
                  >
                    -
                  </button>

                  <span className="font-bold text-lg">{product.cantidad}</span>

                  <button
                    onClick={() => increaseQuantity(product.id)}
                    className="bg-green-500 text-white w-8 h-8 rounded hover:bg-green-600"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(product.id)}
                  className="mt-3 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                >
                  🗑 Eliminar producto
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4">
            <h3 className="text-xl font-bold">Total: ${total.toFixed(2)}</h3>
            <button
              onClick={() => navigate("/checkout")}
              className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
            >
              ✅ Finalizar compra
            </button>

            <button
              onClick={clearCart}
              className="mt-4 w-full bg-red-800 text-white py-2 rounded-lg hover:bg-red-900"
            >
              🗑 Vaciar carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;

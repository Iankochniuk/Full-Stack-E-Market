function ProductCard({ product, addToCart }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition">
      <h3 className="text-xl font-bold mb-3">{product.nombre}</h3>

      <p className="mb-2">Precio: ${product.precio}</p>

      <p className="mb-4">Stock: {product.stock}</p>

      <button
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        onClick={() => addToCart(product)}
      >
        Agregar al carrito
      </button>
    </div>
  );
}

export default ProductCard;

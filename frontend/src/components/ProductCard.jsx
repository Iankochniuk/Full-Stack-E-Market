import { Link } from "react-router-dom";

function ProductCard({ product, addToCart }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition">
      <img
        src={product.image_url}
        alt={product.nombre}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />

      <h3 className="text-xl font-bold mb-3">{product.nombre}</h3>

      <p className="mb-2">Precio: ${product.precio}</p>

      <p className="mb-4">Stock: {product.stock}</p>

      <button
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mb-2"
        onClick={() => addToCart(product)}
      >
        Agregar al carrito
      </button>

      <Link
        to={`/products/${product.id}`}
        className="block text-center w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900"
      >
        Ver detalle
      </Link>
    </div>
  );
}

export default ProductCard;

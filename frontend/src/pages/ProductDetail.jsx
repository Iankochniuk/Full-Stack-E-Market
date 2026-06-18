import { useEffect, useState } from "react";
import { getProductById } from "../../src/services/ProductsService";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { Cartcontext } from "../context/Cartcontext";

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useContext(Cartcontext);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl font-bold">Cargando producto...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <Link
        to="/"
        className="inline-block mb-6 bg-slate-700 text-white px-4 py-2 rounded hover:bg-slate-800"
      >
        ← Volver
      </Link>

      <div className="grid md:grid-cols-2 gap-10 bg-white rounded-xl shadow-lg p-8">
        <div>
          <img
            src={product.image_url}
            alt={product.nombre}
            className="w-full rounded-xl shadow-md"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4">{product.nombre}</h1>

          <p className="text-4xl font-bold text-green-600 mb-6">
            ${Number(product.precio).toLocaleString("es-AR")}
          </p>

          <div className="mb-6">
            {product.stock > 0 ? (
              <span className="bg-green-100 text-green-700 px-3 py-2 rounded-full">
                ✅ Stock disponible ({product.stock})
              </span>
            ) : (
              <span className="bg-red-100 text-red-700 px-3 py-2 rounded-full">
                ❌ Sin stock
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 text-lg font-bold"
          >
            🛒 Agregar al carrito
          </button>

          <div className="mt-8 border-t pt-6">
            <h2 className="text-2xl font-bold mb-4">Características</h2>

            <ul className="space-y-2">
              <li>✅ Garantía oficial</li>
              <li>🚚 Envíos a todo el país</li>
              <li>📦 Stock inmediato</li>
              <li>💳 Hasta 12 cuotas</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

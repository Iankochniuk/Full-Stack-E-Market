import { useEffect, useState } from "react";
import { getProductById } from "../../src/services/ProductsService";
import { Link, useParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();

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
    return <div className="text-center mt-10">Cargando producto...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <Link
        to="/"
        className="inline-block mb-6 bg-slate-700 text-white px-4 py-2 rounded hover:bg-slate-800"
      >
        ← Volver
      </Link>
      <h1 className="text-4xl font-bold mb-4">{product.nombre}</h1>;
      <p className="text-2xl mb-3">Precio: ${product.precio}</p>
      <p className="text-xl mb-3">Stock: {product.stock}</p>
      <button className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
        🛒 Agregar al carrito
      </button>
    </div>
  );
}

export default ProductDetail;

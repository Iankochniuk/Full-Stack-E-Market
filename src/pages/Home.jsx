import { useEffect, useState } from "react";
import { getProducts } from "../services/productsService";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/navbar/Navbar";

function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    loadProducts();
  }, []);

  return (
    <div>
      <Navbar cartCount={cart.length} />
      <h1>Productos</h1>
      <p className="text-center text-xl">Productos en carrito: {cart.length}</p>

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            cart={cart}
            setCart={setCart}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;

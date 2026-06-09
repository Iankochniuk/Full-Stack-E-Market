import { useEffect, useState } from "react";
import { getProducts } from "../services/productsService";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/navbar/Navbar";
import Cart from "../components/cart/Cart";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Home() {
  const { cart, setCart, addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    loadProducts();
  }, []);

  const increaseQuantity = (productId) => {
    setCart(
      cart.map((item) =>
        item.id === productId
          ? {
              ...item,
              cantidad: item.cantidad + 1,
            }
          : item,
      ),
    );
  };

  const decreaseQuantity = (productId) => {
    setCart(
      cart
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                cantidad: item.cantidad - 1,
              }
            : item,
        )
        .filter((item) => item.cantidad > 0),
    );
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((product) => product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const cartCount = cart.reduce((acc, product) => {
    return acc + product.cantidad;
  }, 0);

  return (
    <div>
      <Navbar cartCount={cartCount} toggleCart={toggleCart} />

      {isCartOpen && (
        <Cart
          closeCart={closeCart}
          cart={cart}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          clearCart={clearCart}
          removeFromCart={removeFromCart}
        />
      )}

      <h1 className="text-4xl font-bold text-center my-8">Productos</h1>

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;

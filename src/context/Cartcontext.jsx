import { createContext, useEffect, useState } from "react";

export const Cartcontext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    console.log("cart =", cart);
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                cantidad: item.cantidad + 1,
              }
            : item,
        ),
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          cantidad: 1,
        },
      ]);
    }
  };

  return (
    <Cartcontext.Provider
      value={{
        cart,
        setCart,
        addToCart,
      }}
    >
      {children}
    </Cartcontext.Provider>
  );
}

export default CartProvider;

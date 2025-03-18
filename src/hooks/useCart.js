import { useEffect, useMemo, useState } from "react";
import { db } from "../data/db";
export default function useCart() {
  const initialCart = () => {
    const localCart = localStorage.getItem("cart");
    return localCart ? JSON.parse(localCart) : [];
  };
  const [guitars] = useState(db);
  const [cart, setCart] = useState(initialCart);
  useEffect(() => {
    if (cart.length) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  function addToCart(item) {
    const itemExists = cart.findIndex((cartItem) => cartItem.id === item.id);
    if (itemExists >= 0) {
      const newCart = [...cart];
      newCart[itemExists].qty++;
      setCart(newCart);
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  }
  function removeFromCart(item) {
    setCart((prevCart) => prevCart.filter((i) => i.id !== item.id));
  }
  function increaseQuantity(item) {
    const updatedCart = cart.map((i) =>
      i.id === item.id && i.qty < 10 ? { ...i, qty: i.qty + 1 } : i
    );
    setCart(updatedCart);
  }
  function decreaseQuantity(item) {
    const updatedCart = cart.map((i) =>
      i.id === item.id && i.qty > 1 ? { ...i, qty: i.qty - 1 } : i
    );
    setCart(updatedCart);
  }
  function cleanCart() {
    setCart([]);
  }
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.qty * item.price, 0),
    [cart]
  );
  return {
    guitars,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cleanCart,
    isEmpty,
    cartTotal,
  };
}

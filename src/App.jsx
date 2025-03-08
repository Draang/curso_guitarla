import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { db } from "./data/db";
function App() {
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
  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        cleanCart={cleanCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {guitars.map((guitar) => (
            <Guitar guitar={guitar} key={guitar.id} addToCart={addToCart} />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;

import Footer from "./components/Footer";
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import useCart from "./hooks/useCart";
function App() {
  const {
    addToCart,
    cart,
    cleanCart,
    decreaseQuantity,
    guitars,
    increaseQuantity,
    removeFromCart,
    isEmpty,
    cartTotal,
  } = useCart();

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        cleanCart={cleanCart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
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

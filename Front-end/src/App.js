import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./shopin-cart/cart";
import CheckoutForm from "./shopin-cart/formauth";
import About from "./components/about/About";
import Garantia from "./components/garantia/Garantia";
import HomePage from "./home/Hom";
import MainLayout from "./components/Maypage/MayHom";
import FilteredProductsPage from "./components/Productpage/Productpage";
import ItemsPage from "./Header/DrowpMenu/itempage";
import Profile from "./components/Profail/Profail";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const isProductInCart = cart.some((item) => item.id === product.id);
    if (isProductInCart) {
      setCart(cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    setCart(cart.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              updateCartQuantity={updateCartQuantity}
            />
          }
        >
          <Route
            index
            element={
              <HomePage
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                updateCartQuantity={updateCartQuantity}
                cart={cart}
              />
            }
          />        
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/items" element={<ItemsPage addToCart={addToCart} />} />
          <Route path="/items/:itemId" element={<FilteredProductsPage addToCart={addToCart} />} />
          <Route path="/category/:categoryId" element={<FilteredProductsPage addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} updateCartQuantity={updateCartQuantity} />} />
          <Route path="/checkout" element={<CheckoutForm cart={cart} />} />
          <Route path="/garantia" element={<Garantia />} />
          <Route path="/about" element={<About />} />
  
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

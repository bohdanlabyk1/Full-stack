import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header/Header";
import ProductList from "./product/product";
import Cart from "./shopin-cart/cart";
import CheckoutForm from "./shopin-cart/formauth";
import CategoryList from "./categoris/categori";



function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const addToCart = (product) => {
    setCart((prevCart) => {
      const isProductInCart = prevCart.some((item) => item.id === product.id);
      if (isProductInCart) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  return (
    <Router>
      <div className="App">
        <Header
         setSearchQuery={setSearchQuery}
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          updateCartQuantity={updateCartQuantity}
        />
        <div style={{ display: "flex" }}>
          <div style={{ width: "250px", padding: "20px", borderRight: "1px solid #ddd" }}>
            <CategoryList onCategorySelect={setSelectedCategory} />
          </div>
          <div style={{ flex: 1, padding: "20px" }}>
            <Routes>
              <Route
                path="/"
                element={<ProductList
                   searchQuery={searchQuery}
                  selectedCategory={selectedCategory}
                   addToCart={addToCart}  />}
              />
              <Route
                path="/cart"
                element={
                  <Cart
                    cart={cart}
                    removeFromCart={removeFromCart}
                    updateCartQuantity={updateCartQuantity}
                  />
                }
              />
              <Route path="/checkout" element={<CheckoutForm cart={cart} />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

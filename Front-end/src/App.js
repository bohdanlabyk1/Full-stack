import { Routes, Route } from 'react-router-dom';
import Footer from './component/Footer copy/Footer';
import Header from './component/Header/Header';
import Hom from './component/hom/Hom';
import Filter from './component/filter/filter';
import { useState, useEffect } from 'react';
import Product from './Product/Product';
import Cart from './Shopinkart/Cart';
import FilteredProductsPage from './component/filter/FilterProduct';
import CreateProductPage from './Product/CreateProduct'
import MyProducts from './Product/Myproduct'

function App() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    if (!product?.id) {
      console.warn("Product has no ID:", product);
      return;
    }

    const isAdded = cart.some((item) => item.id === product.id);
    if (isAdded) {
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
    <>
     <Header
  addToCart={addToCart}
  cart={cart}
  updateCartQuantity={updateCartQuantity}
  removeFromCart={removeFromCart}
/>

      <main style={{ marginTop: '14vh', minHeight: '80vh', padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Hom addToCart={addToCart} />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/product" element={<Product addToCart={addToCart} />} />
          <Route path="/items/:itemId" element={<FilteredProductsPage addToCart={addToCart} />} />
          <Route path="/category/:categoryId" element={<FilteredProductsPage addToCart={addToCart} />} />
          <Route path="/create-product" element={<CreateProductPage />} />
          <Route path="/my-products" element={<MyProducts />} />

          <Route path="/cart" element={
            <Cart
              cart={cart}
              updateCartQuantity={updateCartQuantity}
              removeFromCart={removeFromCart}
            />
          } />
        </Routes>
      </main>
     <Footer/>
    </>
  );
}

export default App;

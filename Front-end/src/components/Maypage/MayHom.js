import Footer from "../Footer/Footer";
import React, { useState, useEffect } from "react";
import Header from "./../../Header/Header";
import { Outlet } from "react-router-dom";

const MainLayout = ({ cart, addToCart, removeFromCart, updateCartQuantity }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <>
      <Header
      isAuthenticated={isAuthenticated}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        updateCartQuantity={updateCartQuantity}
      />
      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
      <Footer/>
    </>
  );
};

export default MainLayout;

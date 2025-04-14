import Footer from "../Footer/Footer";
import Header from "./../../Header/Header";
import { Outlet } from "react-router-dom";

const MainLayout = ({ cart, addToCart, removeFromCart, updateCartQuantity }) => {
  return (
    <>
      <Header
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

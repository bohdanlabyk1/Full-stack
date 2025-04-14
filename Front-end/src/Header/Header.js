import React, { useState, useCallback } from "react";
import "./Header.scss";
import logo from './logo.jpg';
import { FaUser, FaShoppingCart } from "react-icons/fa";
import debounce from "lodash.debounce";
import AuthForm from "./../components/form/form";
import Modal from "./../components/form/modal";
import Cart from "../shopin-cart/cart";
import Search from "./Sreach/Sreach";
import Headernav from "./headernav/Header-nav";
import DropMenu from "./DrowpMenu/Dropmenu";

const Header = ({ cart, addToCart, removeFromCart, updateCartQuantity, setSearchQuery }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const toggleAuthModal = () => setIsAuthModalOpen(!isAuthModalOpen);
  const toggleCartModal = () => setIsCartModalOpen(!isCartModalOpen);

  const handleSearch = useCallback(
    debounce((query) => {
      setSearchQuery(query);
    }, 500),
    [setSearchQuery]
  );

  return (
    <header className="header">
      <div className="header__top">
        <div className="header__logo">
          <img src={logo} alt="Site Logo" />
        </div>
        <Headernav/>
        <div className="header__search">
          <Search onSearch={handleSearch} />
        </div>

        <div className="header__icons">
          <FaUser onClick={toggleAuthModal} />
          {isAuthModalOpen && (
            <Modal onClose={toggleAuthModal}>
              <AuthForm />
            </Modal>
          )}
          <FaShoppingCart onClick={toggleCartModal} />
          {isCartModalOpen && (
            <Modal onClose={toggleCartModal} className="wide">
              <Cart cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} updateCartQuantity={updateCartQuantity} />
            </Modal>
          )}

        </div>
        
      </div>
      <DropMenu/>
    </header>
  );
};

export default Header;

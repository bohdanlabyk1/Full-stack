import React, { useState, useCallback} from 'react';
import './Header.scss';
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import debounce from 'lodash.debounce';
import AuthForm from '../form/form';
import Modal from '../form/modal';
import Cart from '../shopin-cart/cart';
import Sreach from "./Sreach/Sreach"

const Header = ({ cart, addToCart, removeFromCart, updateCartQuantity, setSearchQuery }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
 

  const toggleAuthModal = () => setIsAuthModalOpen(!isAuthModalOpen);
  const toggleCartModal = () => setIsCartModalOpen(!isCartModalOpen);

  const handleSearch = useCallback(
    debounce((query) => {
      setSearchQuery(query);
    }, 500), // Затримка 500 мс
    [],
  );

  return (
    <header className="header">
      <div className="header__logo">
        <img src="path_to_logo" alt="Site Logo" />
      </div>
      <div className="header__search">
        <Sreach onSearch={handleSearch} /> {/* Передаємо handleSearch */}
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
            <Cart
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              updateCartQuantity={updateCartQuantity}
            />
          </Modal>
        )}
      </div>
    </header>
  );
};

export default Header;
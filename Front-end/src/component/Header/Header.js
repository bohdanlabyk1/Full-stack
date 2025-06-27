import React, { useState, useEffect } from 'react';
import './header.css';
import Shopinmodal from '../../Shopinkart/Shopinmodal';
import Modal from '../Authuser/modal/Modal';
import { FaRegCircleUser } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import Authform from '../Authuser/Authform';
import Sidebar from '../Profail/Profail'; // 
import Cart from '../../Shopinkart/Cart'
import DropMenu from '../filter/Dropmenu';

const Header = ({ addToCart, cart, updateCartQuantity, removeFromCart }) => {

  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'));
  const [openmodal, setOpenmodal] = useState(false);
  const [opencart, setOpencart] = useState(false)

  const togglemodal = () => setOpenmodal(!openmodal);
 const togglecart = () => setOpencart(!opencart);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuth(true);
    }
  }, []);

  return (
   <header>
  <div className="header">
    <div className="header-top">
      <Sidebar togglemodal={togglemodal} isAuth={isAuth} setIsAuth={setIsAuth} />

      <nav className="nav">
        <li><NavLink to="/">Головна</NavLink></li>
        <li>Про нас</li>
        <li>Гарантія</li>
        <li>Контакти</li>
      </nav>

      <div className="header-icons">
        <FaRegCircleUser className="icon" onClick={togglemodal} />
        {openmodal && (
          <Modal onClose={togglemodal}>
            <Authform setIsAuth={setIsAuth} onSuccess={() => setOpenmodal(false)} />
          </Modal>
        )}

        <FaShoppingCart className="icon" onClick={togglecart} />
        {opencart && (
          <Shopinmodal onClose={togglecart}> <Cart
      cart={cart}
      updateCartQuantity={updateCartQuantity}
      removeFromCart={removeFromCart}
    />
            <Cart onSuccess={() => setOpencart(false)} addToCart={addToCart}/>
          </Shopinmodal>
        )}
      </div>
    </div>

    {/* Нижнє меню або фільтрація */}
    <div className="menu-bottom">
    <DropMenu/>
    </div>
  </div>
</header>

  );
};

export default Header;



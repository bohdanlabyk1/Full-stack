import React, { useState } from 'react';
import './portfail.css';
import { CiMenuBurger } from 'react-icons/ci';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ togglemodal, isAuth, setIsAuth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuth(false);
    setIsOpen(false);
    navigate('/'); // Повернути на головну
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false); // закрити сайдбар
  };

  return (
    <>
      <button className="menu-btn" onClick={toggleSidebar}>
        {isOpen ? <IoClose size={30} /> : <CiMenuBurger size={30} />}
      </button>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        {!isAuth ? (
          <ul>
            <li onClick={() => handleNavigate('/')}>Головна</li>
            <li onClick={() => handleNavigate('/about')}>Про нас</li>
            <li onClick={() => handleNavigate('/warranty')}>Гарантія</li>
            <li onClick={() => handleNavigate('/contacts')}>Контакти</li>
            <li onClick={togglemodal}>Увійти в особистий кабінет</li>
          </ul>
        ) : (
          <ul>
            <li onClick={() => handleNavigate('/')}>Головна</li>
            <li onClick={() => handleNavigate('/create-product')}>Додати продукт</li>
            <li onClick={() => handleNavigate('/my-products')}>Мої продукти</li>
            <li onClick={() => handleNavigate('/contacts')}>Контакти</li>
            <li onClick={handleLogout}>Вийти</li>
          </ul>
        )}
      </div>
    </>
  );
};

export default Sidebar;

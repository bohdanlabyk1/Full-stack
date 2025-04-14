import React from "react";
import { NavLink } from "react-router-dom";
import "./header-nav.scss"; // Підключаємо SCSS файл

const Headernav = () => {
  return (
    <nav className="header-nav">
      <ul className="nav-list">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Головна
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
            Про нас
          </NavLink>
        </li>
        <li>
          <NavLink to="/garantia" className={({ isActive }) => (isActive ? "active" : "")}>
            Гарантія
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Headernav;

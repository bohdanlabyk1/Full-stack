import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import './saidbar.css';

export default function Sidebar({ toggleAuthModal, isAuthenticated, setIsAuthenticated }) {
  const [open, setOpen] = useState(false);

  // Функція для виходу з особистого кабінету
  const handleLogout = () => {
    localStorage.removeItem("token"); // Видалення токену з локального сховища
    setIsAuthenticated(false); // Оновлюємо стан авторизації в батьківському компоненті
    window.location.href = "/"; // Наприклад, після виходу редірект на головну сторінку
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="menu-btn">
        <Menu />
      </button>

      <div className={`overlay ${open ? "show" : ""}`} onClick={() => setOpen(false)}></div>

      <div className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-header">
          <span className="font-bold text-lg">СТО Львів</span>
          <button className="close-btn" onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        <div className="sidebar-content">
          {/* Стандартні посилання для неавторизованого користувача */}
          {!isAuthenticated ? (
            <>
              <button className="green-btn">Каталог товарів</button>
              <Link to="/help">❓ Довідковий центр</Link>
              <Link to="/cart">🛒 Кошик</Link>
              <Link to="/compare">📋 Списки порівнянь</Link>
              <Link to="/tracking">📦 Відстежити посилку</Link>
              <Link to="/location">📍 Київ</Link>
              <Link to="/chat" className="green-text">💬 Чат з ROZETKA</Link>
              <Link to="/stores">🏬 Магазини Rozetka</Link>

              {/* Кнопка для відкриття модалки авторизації */}
              <button
                className="green-btn"
                onClick={() => {
                  toggleAuthModal();
                  setOpen(false); // Закрити меню після відкриття модалки
                }}
              >
                🔐 Увійдіть в особистий кабінет
              </button>
            </>
          ) : (
            // Посилання для авторизованого користувача
            <>
              <Link to="/profile" onClick={() => setOpen(false)}> Мій профіль</Link>
              <Link to="/orders" onClick={() => setOpen(false)}>Мої замовлення</Link>
              <Link to="/settings" onClick={() => setOpen(false)}>Персональні пропозиції</Link>
               <Link to="/settings" onClick={() => setOpen(false)}>Вибрані товари</Link>
                <Link to="/settings" onClick={() => setOpen(false)}>Переглянаті товари</Link>
                 <Link to="/settings" onClick={() => setOpen(false)}>Кошик</Link>
                 <Link to="/settings" onClick={() => setOpen(false)}>Налаштування</Link> 
              <button
                className="green-btn"
                onClick={() => {
                  handleLogout(); // Викликаємо функцію для виходу
                  setOpen(false); // Закриваємо меню після виходу
                }}
              >
                🚪 Вийти
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

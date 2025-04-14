import React from 'react';
import './Footer.css'; // Підключаємо CSS

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section address">
          <p><strong>Київ, вул. Сирецька, 31 (Куренівка)</strong></p>
          <div className="phones">
            <p><span className="blue">📱 098</span> <strong>900-94-94</strong></p>
            <p><span className="red">📱 066</span> <strong>900-94-94</strong></p>
            <p><span className="orange">📱 073</span> <strong>900-94-94</strong></p>
          </div>
          <p className="call-request">Замовити дзвінок</p>
          <div className="messengers">
            <button className="viber-btn">Viber</button>
            <button className="telegram-btn">Telegram</button>
          </div>
        </div>

        <div className="footer-section working-hours">
          <p><strong>Графік роботи</strong></p>
          <p>Пн-Пт: 09:00 - 18:30</p>
          <p>Сб: 10:00 - 15:00</p>
          <p>Нд: Вихідний</p>
          <p className="email">info@partsplus.com.ua</p>
          <div className="socials">
            <a href="#"><img src="/facebook-icon.svg" alt="fb" /></a>
            <a href="#"><img src="/instagram-icon.svg" alt="insta" /></a>
            <a href="#"><img src="/youtube-icon.svg" alt="yt" /></a>
            <a href="#"><img src="/tiktok-icon.svg" alt="tiktok" /></a>
          </div>
        </div>

        <div className="footer-section links">
          <div>
            <p><strong>Інформація</strong></p>
            <ul>
              <li>СТО</li>
              <li>Новини</li>
              <li>Про нас</li>
              <li>Статті</li>
              <li>Бренди</li>
              <li>Контакти</li>
              <li>Оплата</li>
              <li>Доставка</li>
              <li>Гарантія</li>
              <li>Договір публічної оферти</li>
            </ul>
          </div>
          <div>
            <p><strong>Профіль</strong></p>
            <ul>
              <li>Вхід</li>
              <li>Реєстрація</li>
            </ul>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;

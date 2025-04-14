import React, { useState } from "react";
import "./cart.css";

const OrderForm = () => {
  const [quantity, setQuantity] = useState(1);

  return (
    <form className="order-form">
      <h2>Оформлення замовлення</h2>

      <section className="section">
        <h3>Контактні дані</h3>
        <input type="text" placeholder="Ім’я та Прізвище*" required />
        <input type="tel" placeholder="Телефон*" required />
        <input type="email" placeholder="E-mail" />
      </section>
      
      <section className="section">
        <h3>Спосіб доставки</h3>
        <label><input type="radio" name="delivery" defaultChecked /> Самовивіз — <span className="green">Безкоштовно</span></label>
        <p className="note">Пункт видачі: вул. Сирецька, 31 (Пн-Пт: 09:00 - 18:30)</p>

        <label><input type="radio" name="delivery" /> Нова Пошта — <span className="green">За тарифами</span></label>
        <label><input type="radio" name="delivery" /> Доставка таксі — <span className="green">За тарифами</span></label>
      </section>

      {/* Спосіб оплати */}
      <section className="section">
        <h3>Спосіб оплати</h3>
        <label><input type="radio" name="payment" defaultChecked /> Оплата готівкою при отриманні</label>
      </section>

      {/* Товар */}
      <section className="section product">
        <table>
          <thead>
            <tr>
              <th>Фото</th>
              <th>Найменування</th>
              <th>Ціна</th>
              <th>Кількість</th>
              <th>Сума</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><img src="/wd40.jpg" alt="WD-40" width="50" /></td>
              <td>
                WD-40 126470/02921 <br />
                Масло універсальне, 200 мл
              </td>
              <td>260 грн</td>
              <td>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="1"
                />
              </td>
              <td>{260 * quantity} грн</td>
            </tr>
          </tbody>
        </table>
        <textarea placeholder="Коментар"></textarea>
        <label><input type="checkbox" /> Необхідна передача замовлених позицій</label>
      </section>

      {/* Підсумок */}
      <section className="section total">
        <p><strong>Сума замовлення:</strong> {260 * quantity} грн</p>
        <p><strong>Сума доставки:</strong> Безкоштовно</p>
        <p><strong>До оплати:</strong> {260 * quantity} грн</p>
        <button type="submit" className="confirm-btn">Підтвердити замовлення</button>
        <p className="terms">Підтверджуючи замовлення, я приймаю умови користувацької угоди</p>
      </section>
    </form>
  );
};

export default OrderForm;

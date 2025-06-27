
import React from "react";
import { useNavigate } from "react-router-dom";
import "./cart.css";

const Cart = ({ cart, updateCartQuantity, removeFromCart }) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (!cart || !Array.isArray(cart)) {
    return;
  }

  return (
    <div className="cart">
      <h2>Cart</h2>
      {cart.length > 0 ? (
        <>
          <ul>
            {cart.map((item) => (
            <li key={item.id} className="cart-item">
            <div className="cart-details">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <span>{item.name}</span>
              <span>${item.price}</span>
              <span>Total: ${item.price * item.quantity}</span>
            </div>
            <div className="cart-actions">
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) =>
                  updateCartQuantity(item.id, parseInt(e.target.value, 10))
                }
                className="cart-quantity-input"
              />
              <button
                className="remove-from-cart"
                onClick={() => removeFromCart(item.id)}
              >
                Видалити
              </button>
            </div>
          </li>
          
            ))}
          </ul>
          <button className="checkout-button" onClick={handleCheckout}>
            Оформити заказ
          </button>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
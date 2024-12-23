import React, { useState } from "react";

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    payment: "card",
    delivery: "standard", // Added default delivery method
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would handle the form submission logic
    console.log(formData);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="checkout-form">
      <h2>Оформити заказ</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Payment Method:
          <select
            name="payment"
            value={formData.payment}
            onChange={handleChange}
            required
          >
            <option value="card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="cash">Cash on Delivery</option>
            <option value="crypto">Cryptocurrency</option> {/* Added payment option */}
          </select>
        </label>

        <label>
          Delivery Method:
          <select
            name="delivery"
            value={formData.delivery}
            onChange={handleChange}
            required
          >
            <option value="standard">Standard Shipping</option>
            <option value="express">Express Shipping</option>
            <option value="pickup">Pick Up</option>
          </select>
        </label>

        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
};

export default CheckoutForm;

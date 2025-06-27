// ✅ React Frontend: CreateProductPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateProductPage = () => {
  const [form, setForm] = useState({ name: '', price: '', description: '', image: null, categoryId: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert("Увійдіть спочатку");
      return;
    }

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('price', form.price);
    formData.append('description', form.description);
    formData.append('categoryId', form.categoryId);
    if (form.image) formData.append('image', form.image);

    try {
      const res = await fetch('http://localhost:3001/products', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("Товар створено!");
      navigate('/my-products');
    } catch (err) {
      console.error(err);
      alert("Помилка при створенні товару");
    }
  };

  return (
    <div className="order-form">
      <h2>Створити продукт</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Назва" onChange={handleChange} required />
        <input type="number" name="price" placeholder="Ціна" onChange={handleChange} required />
        <textarea name="description" placeholder="Опис" onChange={handleChange} required />
        <input type="number" name="categoryId" placeholder="Категорія ID" onChange={handleChange} required />
        <input type="file" name="image" accept="image/*" onChange={handleChange} />
        <button type="submit" className="confirm-btn">Створити</button>
      </form>
    </div>
  );
};

export default CreateProductPage;

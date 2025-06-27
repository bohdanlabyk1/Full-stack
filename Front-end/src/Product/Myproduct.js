import React, { useEffect, useState } from 'react';
import { getMyProducts } from '../component/api/api'; // ✅

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const data = await getMyProducts(token); // ✅
        setProducts(data);
      } catch (err) {
        console.error("Error fetching my products", err);
      }
    };
    fetchMyProducts();
  }, [token]);

  return (
    <div className="product-container">
      <h2>Мої продукти</h2>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-card">
            {product.image && <img src={product.image} alt={product.name} />}
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProducts;

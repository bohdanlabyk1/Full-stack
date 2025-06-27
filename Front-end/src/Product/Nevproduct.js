import React, { useEffect, useState } from 'react';
import { getNewProducts } from '../component/api/api';
import "./product.css";

const Nevproduct = ({ addToCart }) => {
  const [newProduct, setNewProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewProduct = async () => {
      try {
        const data = await getNewProducts();
        setNewProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNewProduct();
  }, []);

  if (error) return <h5>Помилка: {error}</h5>;
  if (loading) return <h5>Завантаження...</h5>;

  return (
    <>
      <h1>Нові товари</h1>
      <div className='newproduct'>
        {newProduct.map((product) => (
          <div key={product.id} className='new-item'>
            <img src={product.image} alt={product.name} />
            <p>{product.name}</p>
            <p>{product.price}</p>
            <button className='btn' onClick={() => addToCart(product)}>Add to cart</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Nevproduct;

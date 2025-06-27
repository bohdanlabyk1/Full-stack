import React, { useEffect, useState } from 'react';
import { getPopularProducts } from '../component/api/api';
import './product.css';

const Popularproduct = ({ addToCart }) => {
  const [popular, setPopular] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const data = await getPopularProducts();
        setPopular(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPopular();
  }, []);

  if (loading) return <h4>Loading...</h4>;
  if (error) return <h4>Error: {error}</h4>;

  return (
    <>
      <h1>Популярні товари</h1>
      <div className='popular'>
        {popular.map((item) => (
          <div key={item.id} className='pop-item'>
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.price}</p>
            <button className='btn' onClick={() => addToCart(item)}>Add to cart</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Popularproduct;

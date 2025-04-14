import React, { useEffect, useState } from "react";
import './popular.css'
import { getPopularProducts } from "./../../api/api";

const PopularProducts = ({ addToCart }) => {
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const data = await getPopularProducts();
        setPopularProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularProducts();
  }, []);

  if (loading) return <p>Loading popular products...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!popularProducts.length) return <p>No popular products found.</p>;

  return (
    <div className="popular-products">
      <div className="product-list">
        {popularProducts.map((product) => (
          <div key={product.id} className="product-card">
              {product.image ? (
                <img
                  src={product.image} 
                  alt={product.name}
                  className="product-image"
                />
              ) : (
                <p>No image available</p>
              )}
            <h2 className="product-name">{product.name}</h2>
            <p className="product-price">Ціна: {product.price} грн</p>
            <button className="add-to-cart" onClick={(e) => { e.stopPropagation(); addToCart(product); }}>
                Add to Cart
              </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularProducts;

import React, { useState, useEffect } from "react";
import "./product.css";
import { getProducts, getProductsByCategory, getProductByItem, searchProducts } from "../api/api";

const ProductList = ({ selectedCategory, selectedFilter, searchQuery, addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let data = [];

        if (selectedFilter) {
          data = await getProductByItem(selectedFilter);
        } else if (selectedCategory) {
          data = await getProductsByCategory(selectedCategory);
        } else if (searchQuery) {
          data = await searchProducts(searchQuery);
        } else {
          data = await getProducts();
        }

        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, selectedFilter, searchQuery]);

  const handleProductClick = (product) => {
    setSelectedProduct(product); 
  };

  const handleCloseProductDetails = () => {
    setSelectedProduct(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!products.length) return <p>No products found.</p>;

  return (
    <div>
      <div className="product-container">
        <div className="product-list">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => handleProductClick(product)} 
            >
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
              <p className="product-description">{product.description}</p>
              <p className="product-price">Price: ${product.price}</p>
              <button className="add-to-cart" onClick={(e) => { e.stopPropagation(); addToCart(product); }}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

  
      {selectedProduct && (
        <div className="product-details">
          <h2>{selectedProduct.name}</h2>
          <p>{selectedProduct.description}</p>
          <p>Price: ${selectedProduct.price}</p>
          {selectedProduct.image && <img src={selectedProduct.image} alt={selectedProduct.name} className="product-image" />}
          <button onClick={handleCloseProductDetails}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ProductList;

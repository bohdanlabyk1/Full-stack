import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPopularCategories } from "../api/api"; 
import './categorys.css';

const CategoryHom = ({handleMoreCategories}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopularCategories = async () => {
      try {
        const data = await getPopularCategories();
        setCategories(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularCategories();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!categories.length) return <p>No popular categories found.</p>;

  return (
    <div className="popular-category-container">
      <h1>Популярні категорії</h1>
      <ul className="categorihom">
        {categories.map((category) => (
          <li className="cat" key={category.id} onClick={() => navigate(`/category/${category.id}`)}>
            {category.image && (
              <img
                src={category.image}
                alt={category.name}
                className="category-image"
              />
            )}
            <span className="cat-name">{category.name}</span>
          </li>
        ))}
      </ul>
   
    <div  className="view-all" 
    onClick={handleMoreCategories}>Дивитися всі</div>
  </div>
   
  );
};

export default CategoryHom;

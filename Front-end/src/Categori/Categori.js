import React, { useEffect, useState } from "react";
import "./categori.css";
import { useNavigate } from "react-router-dom";
import { getCategories } from "./../component/api/api";

const CategoryList = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!categories.length) return <p>No categories found.</p>;

  return (
    <div>
      <ul>
        <h1>Каталог</h1>
        {categories.map((category) => (
         <li className= "kat" key={category.id}>
            <button onClick={() => navigate(`/category/${category.id}`)}>
              {category.name}
             </button>
        </li>
        ))}
      </ul>
    </div>
  );
};


export default CategoryList;
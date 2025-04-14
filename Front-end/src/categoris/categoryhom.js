import React, { useEffect, useState } from "react";
import "./categorys.css";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../api/api";

const CategoryHom = () => {
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
      <h1>Категорії</h1>
      <ul className="categorihom">
        {categories.map((category) => (
          <li key={category.id}>
            <button onClick={() => navigate(`/category/${category.id}`)}>
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryHom;

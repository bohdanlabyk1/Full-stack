import React, { useEffect, useState } from "react";
import "./categorys.css";

const CategoryList = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3001/categories");
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const data = await response.json();
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
        {categories.map((category) => (
          <li key={category.id}>
            <button onClick={() => onCategorySelect(category.id)}>{category.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default CategoryList;

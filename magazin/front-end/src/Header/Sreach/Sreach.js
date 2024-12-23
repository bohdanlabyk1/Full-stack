import React from 'react';

const Sreach = ({ onSearch }) => {
  const handleChange = (event) => {
    onSearch(event.target.value); // Передаємо введене значення
  };

  return (
    <input
      type="text"
      placeholder="Search for products..."
      className="search-input"
      onChange={handleChange}
    />
  );
};

export default Sreach;

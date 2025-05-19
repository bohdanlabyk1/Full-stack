import { useState } from "react";
import PopularProducts from "./Popular/popularpage";
import ProductList from "../product/product";
import { useNavigate } from "react-router-dom";
import NewProducts from "./new/new";
import CategoryHom from "../categoris/categoryhom";

const Home = ({ addToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  const handleMoreCategories = () => {
    navigate("/items");
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-arund", alignItems: "center" }}>
      </div>
    <div style={{ display: "flex", flexDirection: "row", gap: "10px", flexWrap: "wrap" }}>
  <CategoryHom onCategorySelect={setSelectedCategory} handleMoreCategories={handleMoreCategories} />
</div>

      <h2>Популярні товари</h2>
      <PopularProducts addToCart={addToCart}/>

      <h2>новинки</h2>
     <NewProducts addToCart={addToCart}/>

      {selectedCategory && <ProductList selectedCategory={selectedCategory} addToCart={addToCart} />}

    </div>
  );
};

export default Home;

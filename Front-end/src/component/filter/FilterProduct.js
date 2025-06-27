import { useParams } from "react-router-dom";
import ProductList from "./../../Product/Product";
import CategoryList from "./../../Categori/Categori";

const FilteredProductsPage = ({ addToCart }) => {
  const { categoryId, itemId } = useParams();

  return (
    <div>
      <div style={{ display: "flex", gap: "20px" }}>
        <div>
          <CategoryList onCategorySelect={(id) => window.location.href = `/category/${id}`} />
        </div>
        <div style={{ flex: 1 }}>
          <ProductList
            selectedCategory={categoryId}
            selectedFilter={itemId}
            addToCart={addToCart}
          />
        </div>
      </div>
    </div>
  );
};

export default FilteredProductsPage;
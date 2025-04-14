import { useParams } from "react-router-dom";
import ProductList from "./../../product/product";
import CategoryList from "./../../categoris/categori";

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

import { useState, useEffect } from "react";
import './filter.css'
import { getFilters} from "./../api/api";
import { useNavigate } from "react-router-dom";

const ItemsPage = () => {
  const [filters, setFilters] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const data = await getFilters();
        setFilters(data);
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };

    fetchFilters();
  }, []);

  return (
    <div className="items-page">
      <div className="items-list">
        {filters.map((filter) => (
          <div key={filter.id} className="filter-block">
            <h3>{filter.name}</h3>
            {filter.subcategories.map((subcategory) => (
              <div key={subcategory.id}>
                <h4>{subcategory.name}</h4>
                <ul>
                  {subcategory.items.map((item) => (
                     <li
                     key={item.id}
                     onClick={() => navigate(`/items/${item.id}`)}
                     style={{ cursor: "pointer" }}
                   >
                     {item.name}
                   </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemsPage;

import { useState, useEffect } from "react";
import { getFilters } from "../api/api"; 
import "./filter.css";
import { useNavigate } from "react-router-dom";
const DropMenu = () => {
  const [filters, setFilters] = useState([]);
  const [openFilter, setOpenFilter] = useState(null);
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
    <div>
      <nav className="menu-container">
        <ul className="menu-list">
          {filters.map((filter) => (
            <li
              key={filter.id}
              className="menu-item"
              onMouseEnter={() => setOpenFilter(filter.id)}
              onMouseLeave={() => setOpenFilter(null)}
            >
              <button className="menu-button">{filter.name}</button>

              {openFilter === filter.id && (
                <div className="submenu">
                  <div className="submenu-content">
                    {filter.subcategories.map((subcategory) => (
                      <div key={subcategory.id} className="submenu-column">
                        <h4 className="subcategory-title">{subcategory.name}</h4>
                        <ul className="sub-submenu">
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
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default DropMenu;

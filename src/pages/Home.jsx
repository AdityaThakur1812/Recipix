import { useState, useEffect } from "react";
import useSearchMeals from "../hooks/useSearchMeals";
import RecipeCard from "../components/RecipeCard";
import Filters from "../components/Filters";
import { Link } from "react-router-dom";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [suggestedMeals, setSuggestedMeals] = useState([]);

  const { data: meals, loading, error } = useSearchMeals(searchTerm, filterType, filterValue);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const res = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken");
        const data = await res.json();
        setSuggestedMeals(data.meals || []);
      } catch (err) {
        console.error("Failed to fetch suggestions", err);
      }
    };
    fetchSuggestions();
  }, []);

  const handleFilter = (type, value) => {
    setFilterType(type);
    setFilterValue(value);
    setSearchTerm(""); // Clear search input if using filters
  };

  const displayMeals = searchTerm || filterValue ? meals : suggestedMeals;

  return (
    <div style={{ padding: "1rem" }}>
      {/* Search Input with Suggestions */}
      <div style={{ position: "relative", maxWidth: "400px", marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setFilterType("");
            setFilterValue("");
          }}
          style={{ padding: "0.5rem", width: "100%", boxSizing: "border-box" }}
        />

        {/* Autocomplete suggestions */}
        {searchTerm && meals.length > 0 && (
          <ul
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "#fff",
              border: "1px solid #ccc",
              borderTop: "none",
              maxHeight: "200px",
              overflowY: "auto",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              margin: 0,
              padding: 0,
              listStyle: "none",
              borderRadius: "0 0 8px 8px",
              zIndex: 1000,
            }}
          >
            {meals.slice(0, 5).map((meal) => (
              <li
                key={meal.idMeal}
                style={{
                  padding: "10px 15px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                }}
              >
                <Link
                  to={`/recipe/${meal.idMeal}`}
                  style={{ textDecoration: "none", color: "#333", display: "block" }}
                >
                  {meal.strMeal}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Filters */}
      <Filters onFilter={handleFilter} />

      {loading && <p>Loading...</p>}
      {error && <p>Error occurred: {error.message}</p>}

      {/* Recipes Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "1rem",
        }}
      >
        {displayMeals.map((meal) => (
          <RecipeCard key={meal.idMeal} meal={meal} />
        ))}
      </div>
    </div>
  );
}

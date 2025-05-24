import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = debounce(async (searchTerm) => {
    if (!searchTerm) return setSuggestions([]);
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
      const data = await res.json();
      setSuggestions(data.meals || []);
    } catch (error) {
      console.error("Failed to fetch suggestions");
    }
  }, 500); // Debounce for 500ms

  useEffect(() => {
    fetchSuggestions(query);
    return fetchSuggestions.cancel;
  }, [query]);

  return (
    <div style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder="Search recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "0.5rem", width: "100%" }}
      />
      {suggestions.length > 0 && (
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {suggestions.slice(0, 5).map((meal) => (
            <li key={meal.idMeal}>
              <Link to={`/recipe/${meal.idMeal}`}>{meal.strMeal}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

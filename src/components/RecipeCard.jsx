import { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";
import { ThemeContext } from "../context/ThemeContext"; // import your theme context

export default function RecipeCard({ meal }) {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const { theme } = useContext(ThemeContext); // get current theme
  const isFavorite = favorites.some((fav) => fav.idMeal === meal.idMeal);

  return (
    <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "8px" }}>
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        style={{ width: "100%", borderRadius: "8px" }}
      />
      <h3>{meal.strMeal}</h3>
      <button
        onClick={() => toggleFavorite(meal)}
        style={{ color: isFavorite ? "red" : "gray" }}
      >
        {isFavorite ? "♥" : "♡"}
      </button>
      <Link
        to={`/recipe/${meal.idMeal}`}
        style={{
          color: theme === "dark" ? "white" : "black", // white in dark mode
          textDecoration: "none",
          fontWeight: "bold",
          marginLeft: "8px",
        }}
      >
        Details
      </Link>
    </div>
  );
}

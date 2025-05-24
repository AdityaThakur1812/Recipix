import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import RecipeCard from "../components/RecipeCard";

export default function Favorites() {
  const { favorites } = useContext(FavoritesContext);

  if (favorites.length === 0) return <p>No favorite recipes saved.</p>;

  return (
    <div>
      <h1>Favorite Recipes</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem" }}>
        {favorites.map((meal) => (
          <RecipeCard key={meal.idMeal} meal={meal} />
        ))}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function RecipeDetails() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMeal() {
      setLoading(true);
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await res.json();
        setMeal(data.meals[0]);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchMeal();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading recipe.</p>;
  if (!meal) return <p>No recipe found.</p>;

  // Extract ingredients and measurements
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure} ${ingredient}`.trim());
    }
  }

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "1rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>{meal.strMeal}</h1>
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        style={{
        width: "100%",
        maxWidth: "400px",   // limit max width
        height: "auto",
        display: "block",
        margin: "0 auto 1rem", // center horizontally and add bottom margin
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      />

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <p><strong>Category:</strong> {meal.strCategory}</p>
        <p><strong>Area:</strong> {meal.strArea}</p>
      </div>
      <h2>Ingredients</h2>
      <ul style={{ listStyle: "disc inside", marginBottom: "1.5rem" }}>
        {ingredients.map((item, idx) => (
          <li key={idx} style={{ marginBottom: "0.25rem" }}>
            {item}
          </li>
        ))}
      </ul>
      <h2>Instructions</h2>
      <div>
        {meal.strInstructions.split('\n').map((line, index) => 
        line.trim() ? <p key={index} style={{ marginBottom: "0.8rem", lineHeight: 1.6 }}>{line}</p> : null
        )}
      </div>

    </div>
  );
}

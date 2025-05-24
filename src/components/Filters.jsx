import { useEffect, useState } from "react";

export default function Filters({ onFilter }) {
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const fetchFilters = async () => {
      const catRes = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list");
      const areaRes = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
      const catData = await catRes.json();
      const areaData = await areaRes.json();
      const filteredCategories = (catData.meals || []).filter(
        (c) => c.strCategory.toLowerCase() !== "beef"
      );

      setCategories(filteredCategories);
      setAreas(areaData.meals || []);
    };
    fetchFilters();
  }, []);

  return (
    <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
      <select onChange={(e) => onFilter("category", e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c.strCategory} value={c.strCategory}>
            {c.strCategory}
          </option>
        ))}
      </select>

      <select onChange={(e) => onFilter("area", e.target.value)}>
        <option value="">All Areas</option>
        {areas.map((a) => (
          <option key={a.strArea} value={a.strArea}>
            {a.strArea}
          </option>
        ))}
      </select>
    </div>
  );
}

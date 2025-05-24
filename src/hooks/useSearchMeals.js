import { useState, useEffect } from "react";
import axios from "../utils/axios";

export default function useSearchMeals(searchTerm, filterType, filterValue) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If no search or filter, clear data
    if (!searchTerm && !filterType) {
      setData([]);
      return;
    }

    const controller = new AbortController();

    const timeoutId = setTimeout(async () => {
      setLoading(true);
      try {
        let url = "";

        if (searchTerm) {
          // Search by name or ingredient
          url = `search.php?s=${searchTerm}`;
        } else if (filterType === "category") {
          // Filter by category
          url = `filter.php?c=${filterValue}`;
        } else if (filterType === "area") {
          // Filter by area/cuisine
          url = `filter.php?a=${filterValue}`;
        } else {
          // fallback: show all meals or empty
          url = "search.php?s=";
        }

        const response = await axios.get(url, { signal: controller.signal });

        // TheMealDB returns different structures for search.php vs filter.php
        // search.php returns detailed meals,
        // filter.php returns limited info (idMeal, strMeal, strMealThumb)
        // Just use response.data.meals or empty array.
        setData(response.data.meals || []);
        setError(null);
      } catch (err) {
        if (err.name !== "CanceledError") setError(err);
      } finally {
        setLoading(false);
      }
    }, 500); // debounce delay 500ms

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [searchTerm, filterType, filterValue]);

  return { data, loading, error };
}

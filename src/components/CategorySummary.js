import React, { useState, useEffect } from "react";
import { getCategorySummary } from "../api/expense";
import "../styles/CategorySummary.css";

const CategorySummary = () => {
  const [summary, setSummary] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      const startDate = new Date();
      startDate.setDate(1); // first day of the current month
      const endDate = new Date(); // current date

      try {
        const data = await getCategorySummary(
          startDate.toISOString(),
          endDate.toISOString()
        );
        console.log("Fetched Category Summary Data:", data);
        setSummary(data);
      } catch (err) {
        setError("Failed to fetch category summary.");
        console.error("Error fetching category summary:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return <p>Loading category summary...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="category-summary">
      <h2>Category Summary</h2>
      {summary && summary.length > 0 ? (
        <ul>
          {summary.map((item, index) => {
            // Support both camelCase and PascalCase in case of naming differences
            const category = item.category || item.Category;
            const totalAmount = item.totalAmount || item.TotalAmount;
            return (
              <li key={index}>
                {category}:{" "}
                {typeof totalAmount === "number"
                  ? totalAmount.toFixed(2)
                  : totalAmount || "No data"}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No category summary data available.</p>
      )}
    </div>
  );
};

export default CategorySummary;

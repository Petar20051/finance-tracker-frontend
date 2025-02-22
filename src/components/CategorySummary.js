import React, { useState, useEffect } from "react";
import { getCategorySummary } from "../api/expense";
import "../styles/CategorySummary.css";

const CategorySummary = () => {
  const [summary, setSummary] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSummary = async () => {
      // Set the start date to the first day of the current month
      const startDate = new Date();
      startDate.setDate(1);
      // End date is now
      const endDate = new Date();

      try {
        // Call API using ISO strings for dates
        const data = await getCategorySummary(
          startDate.toISOString(),
          endDate.toISOString()
        );
        setSummary(data);
      } catch (err) {
        setError("Failed to fetch category summary.");
        console.error("Error fetching category summary:", err);
      }
    };

    fetchSummary();
  }, []);

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="category-summary">
      <h2>Category Summary</h2>
      {summary.length > 0 ? (
        <ul>
          {summary.map((item, index) => (
            <li key={index}>
              {item.category}:{" "}
              {typeof item.totalAmount === "number"
                ? item.totalAmount.toFixed(2)
                : "No data"}
            </li>
          ))}
        </ul>
      ) : (
        <p>No category summary data available.</p>
      )}
    </div>
  );
};

export default CategorySummary;

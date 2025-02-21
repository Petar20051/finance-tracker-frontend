import React, { useEffect, useState } from "react";
import { getCategorySummary } from "../api/expense";

const CategorySummary = () => {
  const [summary, setSummary] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSummary = async () => {
      const startDate = new Date();
      startDate.setDate(1);
      const endDate = new Date();

      try {
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
    <div>
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

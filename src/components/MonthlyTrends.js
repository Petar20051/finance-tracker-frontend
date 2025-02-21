import React, { useEffect, useState } from "react";
import { getMonthlyTrends } from "../api/expense";
import "../styles/MonthlyTrends.css";

const MonthlyTrends = () => {
  const [trends, setTrends] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const data = await getMonthlyTrends();
        setTrends(data);
      } catch (err) {
        setError("Failed to load monthly trends.");
        console.error("Error fetching trends:", err);
      }
    };

    fetchTrends();
  }, []); 

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div>
      <h2>Monthly Trends</h2>
      {trends.length > 0 ? (
        <ul>
          {trends.map((trend, index) => (
            <li key={index}>
              {trend.month}:{" "}
              {typeof trend.amount === "number"
                ? trend.amount.toFixed(2)
                : "No data"}
            </li>
          ))}
        </ul>
      ) : (
        <p>No monthly trends data available.</p>
      )}
    </div>
  );
};

export default MonthlyTrends;

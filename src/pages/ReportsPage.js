import React, { useEffect, useState } from "react";
import CategorySummary from "../components/CategorySummary";
import MonthlyTrends from "../components/MonthlyTrends";
import ExpenseTrendsChart from "../components/ExpenseTrendsChart";
import { getMonthlyTrends } from "../api/expense";


const ReportsPage = () => {
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMonthlyTrends = async () => {
      try {
        const data = await getMonthlyTrends();
        console.log("Fetched Monthly Trends Data:", data); 
        setChartData(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching monthly trends:", err);
      }
    };

    fetchMonthlyTrends();
  }, []);

  return (
    <div className="container">
      <h1>Reports</h1>

      
      {error && <p className="error">{error}</p>}

      
      <div className="category-summary">
        <CategorySummary />
      </div>

     
      <div className="monthly-trends">
        <MonthlyTrends />
      </div>

      
      <div className="expense-trends-chart">
        <h2>Monthly Expense Trends</h2>
        {chartData.length > 0 ? (
          <ExpenseTrendsChart data={chartData} />
        ) : (
          <p>No data available for the chart.</p>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;

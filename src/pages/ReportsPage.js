import React, { useEffect, useState } from "react";
import CategorySummary from "../components/CategorySummary";
import MonthlyTrends from "../components/MonthlyTrends";
import ExpenseTrendsChart from "../components/ExpenseTrendsChart";
import { getMonthlyTrends } from "../api/expense";
import "../styles/ReportPage.css";


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
    <div className="reports-page">
      <h1 className="reports-title">Reports</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="category-summary-section">
        <CategorySummary />
      </div>
      <div className="monthly-trends-section">
        <MonthlyTrends />
      </div>
      <div className="expense-trends-chart-section">
        {chartData.length > 0 ? (
          <ExpenseTrendsChart data={chartData} />
        ) : (
          <p className="no-data">No data available for the chart.</p>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;

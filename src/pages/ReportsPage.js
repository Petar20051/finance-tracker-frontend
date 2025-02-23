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
        setError(err.message || "Failed to fetch monthly trends.");
        console.error("Error fetching monthly trends:", err);
      }
    };

    fetchMonthlyTrends();
  }, []);

  return (
    <div className="reports-page">
      <h1 className="reports-title">Your Financial Reports</h1>
      <p className="page-description">
        View a comprehensive overview of your spending habits through category summaries, monthly trends, and interactive charts.
      </p>
      {error && <p className="error-message">{error}</p>}
      
      <section className="category-summary-section">
        <h2>Category Summary</h2>
        <p className="section-description">
          A quick look at your spending across different categories.
        </p>
        <CategorySummary />
      </section>
      
      <section className="monthly-trends-section">
        <h2>Monthly Trends</h2>
        <p className="section-description">
          Review your spending patterns month-by-month.
        </p>
        <MonthlyTrends />
      </section>
      
      <section className="expense-trends-chart-section">
        <h2>Expense Trends Chart</h2>
        <p className="section-description">
          This chart shows how your expenses have evolved over time.
        </p>
        {chartData.length > 0 ? (
          <ExpenseTrendsChart data={chartData} />
        ) : (
          <p className="no-data">No data available for the chart.</p>
        )}
      </section>
    </div>
  );
};

export default ReportsPage;

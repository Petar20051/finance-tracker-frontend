import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../styles/Chart.css";

const ExpenseTrendsChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-center text-muted">No data available for the chart.</p>;
  }

  return (
    <div className="chart-container">
      <h3 className="chart-title">Expense Trends Over Time</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#d0d0d0" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12 }}
            label={{ value: "Month", position: "insideBottom", offset: -5 }}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            label={{ value: "Amount", angle: -90, position: "insideLeft", offset: -5 }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#f8f9fa", border: "1px solid #d0d0d0" }}
            itemStyle={{ fontSize: 14 }}
          />
          <Legend
            verticalAlign="top"
            wrapperStyle={{
              fontSize: 14,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#007bff"
            strokeWidth={2}
            dot={{ r: 5, strokeWidth: 1 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseTrendsChart;

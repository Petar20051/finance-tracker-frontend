import React from "react";
import SyncTransactions from "../components/SyncTransaction"; 
import "../styles/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Welcome to Your Dashboard</h1>
      <p>
        This is your central hub for managing budgets, tracking expenses, and setting goals. Stay on top of your financial health by syncing your transactions and reviewing your performance.
      </p>
      <SyncTransactions />
    </div>
  );
};

export default Dashboard;

import React from "react";
import SyncTransactions from "../components/SyncTransaction"; 
import "../styles/Dashboard.css"


const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Welcome to Your Dashboard</h1>
      <p>Manage your budgets, expenses, and goals here!</p>

      
      <SyncTransactions />
    </div>
  );
};

export default Dashboard;

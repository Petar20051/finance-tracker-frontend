import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Import Navbar
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import BudgetPage from "./pages/BudgetPage";
import GoalsPage from "./pages/GoalsPage";
import ManageExpensesPage from "./pages/ManageExpensesPage"; // Manage expenses
import ReportsPage from "./pages/ReportsPage"; // Reports (Category Summary & Monthly Trends)
import AIPredictionsPage from "./pages/AIPredictionsPage"; // AI Predictions
import CurrencyConverterPage from "./pages/CurrencyConverterPage"; // Currency Converter
import UpdateProfile from "./pages/UpdateProfilePage";
import { initializeSignalRConnection, stopSignalRConnection } from "./components/signalr";


const App = () => {
  useEffect(() => {
    // Initialize SignalR connection when the app starts
    initializeSignalRConnection();

    return () => {
      // Cleanup SignalR connection when the app unmounts
      stopSignalRConnection();
    };
  }, []);

  return (
    <Router>
      {/* Navbar is added here */}
      <Navbar />

      {/* Application Routes */}
      <Routes>
        {/* Authentication Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/update" element={<UpdateProfile />} />

        {/* Main Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Budget and Goals Management */}
        <Route path="/budgets" element={<BudgetPage />} />
        <Route path="/goals" element={<GoalsPage />} />

        {/* Expense Management Routes */}
        <Route path="/manage-expenses" element={<ManageExpensesPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/ai-predictions" element={<AIPredictionsPage />} />
        <Route path="/currency-converter" element={<CurrencyConverterPage />} />
      </Routes>
    </Router>
  );
};

export default App;

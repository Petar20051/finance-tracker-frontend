import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import BudgetPage from "./pages/BudgetPage";
import GoalsPage from "./pages/GoalsPage";
import ManageExpensesPage from "./pages/ManageExpensesPage";
import ReportsPage from "./pages/ReportsPage";
import AIPredictionsPage from "./pages/AIPredictionsPage";
import CurrencyConverterPage from "./pages/CurrencyConverterPage";
import UpdateProfile from "./pages/UpdateProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import { initializeSignalRConnection, stopSignalRConnection } from "./components/signalr";
import "./styles/global.css";

const App = () => {
  useEffect(() => {
    initializeSignalRConnection();
    return () => {
      stopSignalRConnection();
    };
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/update" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/budgets" element={<ProtectedRoute><BudgetPage /></ProtectedRoute>} />
        <Route path="/goals" element={<ProtectedRoute><GoalsPage /></ProtectedRoute>} />
        <Route path="/manage-expenses" element={<ProtectedRoute><ManageExpensesPage /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
        <Route path="/ai-predictions" element={<ProtectedRoute><AIPredictionsPage /></ProtectedRoute>} />
        <Route path="/currency-converter" element={<ProtectedRoute><CurrencyConverterPage /></ProtectedRoute>} />
      </Routes>
    </>
  );
};

export default App;

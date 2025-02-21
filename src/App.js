import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
    <Router>
     
      <Navbar />

    
      <Routes>
     
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/update" element={<UpdateProfile />} />

       
        <Route path="/dashboard" element={<Dashboard />} />

        
        <Route path="/budgets" element={<BudgetPage />} />
        <Route path="/goals" element={<GoalsPage />} />

        
        <Route path="/manage-expenses" element={<ManageExpensesPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/ai-predictions" element={<AIPredictionsPage />} />
        <Route path="/currency-converter" element={<CurrencyConverterPage />} />
      </Routes>
    </Router>
  );
};

export default App;

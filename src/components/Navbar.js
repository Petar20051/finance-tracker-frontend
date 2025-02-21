import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  const getActiveClass = (path) => (location.pathname === path ? 'active' : '');

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h2 className="navbar-logo">Finance Tracker</h2>
        <ul className="navbar-links">
          {user ? (
            <>
              <li className="navbar-item">
                <Link to="/dashboard" className={getActiveClass('/dashboard')}>
                  Dashboard
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/budgets" className={getActiveClass('/budgets')}>
                  Budgets
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/goals" className={getActiveClass('/goals')}>
                  Goals
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/manage-expenses" className={getActiveClass('/manage-expenses')}>
                  Manage Expenses
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/reports" className={getActiveClass('/reports')}>
                  Reports
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/ai-predictions" className={getActiveClass('/ai-predictions')}>
                  AI Predictions
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/currency-converter" className={getActiveClass('/currency-converter')}>
                  Currency Converter
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/update" className={getActiveClass('/update')}>
                  Update Profile
                </Link>
              </li>
              <li className="navbar-item">
                <button onClick={logout} className="logout-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item">
                <Link to="/login" className={getActiveClass('/login')}>
                  Login
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/register" className={getActiveClass('/register')}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
